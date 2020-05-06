import React, {useState, useEffect} from 'react';
import moment, {Moment} from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import AddButton from './src/assets/add-button.svg';
import {Task, TaskRepeat} from './src/task';
import {TaskList} from './src/task-list';

const App = () => {
  const [tasks, setTasks] = useState([] as Array<Task>);
  const [nextItemKey, setNextItemKey] = useState(0);
  const [shownDay] = useState(moment());
  useEffect(() => {
    retrieveData().then((retrievedTasks) => {
      setNextItemKey(retrievedTasks.length);
      setTasks(retrievedTasks);
    });
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.sectionTitle}>
              {momentToDateString(shownDay)}
            </Text>
          </View>
          {renderInitialTip()}
          <TaskList
            tasks={tasks}
            updateTaskName={updateTaskName}
            updateTaskRepeat={updateTaskRepeat}
            saveEdits={saveEdits}
          />
          <View style={styles.addButton} onTouchEnd={onButtonPress}>
            <AddButton />
          </View>
        </View>
      </SafeAreaView>
    </>
  );

  function onButtonPress() {
    tasks.forEach((task) => {
      task.editing = false;
    });
    setTasks([
      ...tasks,
      {
        name: '',
        key: String(nextItemKey),
        repeat: TaskRepeat.None,
        editing: true,
      },
    ]);
    setNextItemKey(nextItemKey + 1);
  }

  function updateTaskName(key: string, value: string) {
    const updatedTasks = [...tasks];
    const task = updatedTasks.find((t) => t.key === key);
    if (!task) {
      throw new Error(`Failed to find task with key ${key}`);
    }
    task.name = value;
    setTasks(updatedTasks);
  }

  function updateTaskRepeat(key: string, value: TaskRepeat) {
    const updatedTasks = [...tasks];
    const task = updatedTasks.find((t) => t.key === key);
    if (!task) {
      throw new Error(`Failed to find task with key ${key}`);
    }
    task.repeat = value;
    setTasks(updatedTasks);
  }

  function saveEdits(key: string) {
    const updatedTasks = [...tasks];
    const task = updatedTasks.find((t) => t.key === key);
    if (!task) {
      throw new Error(`Failed to find task with key ${key}`);
    }
    task.editing = false;
    setTasks(updatedTasks);
    storeData();
  }

  function renderInitialTip() {
    if (tasks.length) {
      return undefined;
    }
    return (
      <View style={styles.initialTip}>
        <Text style={styles.sectionTitle}>Welcome to Gradual!</Text>
        <Text style={styles.sectionTitle}>Add a task to get started.</Text>
      </View>
    );
  }

  async function storeData() {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      throw new Error(`Error storing app data: ${error}`);
    }
  }

  async function retrieveData(): Promise<Task[]> {
    let value: string | null;
    try {
      value = await AsyncStorage.getItem('tasks');
    } catch (error) {
      throw new Error(`Error retrieving app data: ${error}`);
    }
    if (!value) {
      return [];
    }
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new Error(`Error parsing task list: ${error}`);
    }
  }

  function nowInSeconds(): number {
    return Math.floor(new Date().getTime() / 1000);
  }

  function nowInDays(): number {
    return Math.floor(nowInSeconds() / 60 / 60 / 24);
  }

  function momentToDateString(m: Moment): string {
    return m.calendar(null, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY',
    });
  }
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
  },
  initialTip: {
    alignItems: 'center',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  addButton: {
    width: '100%',
    alignItems: 'center',
  },
});

export default App;
