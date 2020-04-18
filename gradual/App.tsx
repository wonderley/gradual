import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableHighlight,
  TextInput,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

declare var global: {HermesInternal: null | {}};

import AddButton from './src/assets/add-button.svg';

// Used for unique list item keys
let ITEM_COUNT = 0;

const App = () => {
  const [tasks, setTasks] = useState(
    [] as Array<{
      name: string;
      key: string;
      repeat: string;
      editing: boolean;
    }>,
  );
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.sectionTitle}>Thursday, April 9th</Text>
          </View>
          {renderInitialTip()}
          {renderTaskList()}
          <View style={styles.addButton} onTouchEnd={onButtonPress}>
            <AddButton />
          </View>
        </View>
      </SafeAreaView>
    </>
  );

  function onButtonPress() {
    setTasks([
      ...tasks,
      {
        name: '',
        key: String(ITEM_COUNT++),
        repeat: '',
        editing: true,
      },
    ]);
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

  function renderTaskList() {
    if (!tasks.length) {
      return undefined;
    }
    return (
      <FlatList
        style={styles.list}
        data={tasks}
        renderItem={({item, separators}) => (
          <TouchableHighlight
            key={item.key}
            onPress={() => {}}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}>
            {item.editing ? (
              <View style={styles.listItem}>
                <TextInput
                  style={styles.listText}
                  value={item.name}
                  placeholder={'Task Name'}
                  onChangeText={(text: string) => {
                    updateTaskName(item.key, text);
                  }}
                />
                <TextInput
                  style={styles.listText}
                  value={item.repeat}
                  placeholder={'Repeat?'}
                />
              </View>
            ) : (
              <View style={styles.listItem}>
                <Text style={styles.listText}>{item.name}</Text>
                <Text style={styles.listText}>{item.repeat}</Text>
              </View>
            )}
          </TouchableHighlight>
        )}
      />
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
  list: {
    width: '100%',
  },
  listItem: {
    paddingHorizontal: 10,
  },
  listText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default App;
