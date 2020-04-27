import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

declare var global: {HermesInternal: null | {}};

import AddButton from './src/assets/add-button.svg';
import {Task, TaskRepeat} from './src/task';
import {TaskList} from './src/task-list';

const App = () => {
  const [tasks, setTasks] = useState([] as Array<Task>);
  const [nextItemKey, setNextItemKey] = useState(0);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.sectionTitle}>Thursday, April 9th</Text>
          </View>
          {renderInitialTip()}
          <TaskList
            tasks={tasks}
            updateTaskName={updateTaskName}
            updateTaskRepeat={updateTaskRepeat}
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
