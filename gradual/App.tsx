import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableHighlight,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

declare var global: {HermesInternal: null | {}};

import AddButton from './src/assets/add-button.svg';

const App = () => {
  const [tasks, setTasks] = useState(
    [] as Array<{
      name: string;
      key: string;
    }>,
  );
  const showInitialTip = !tasks.length;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.sectionTitle}>Thursday, April 9th</Text>
          </View>
          {showInitialTip && (
            <View style={styles.initialTip}>
              <Text style={styles.sectionTitle}>Welcome to Gradual!</Text>
              <Text style={styles.sectionTitle}>
                Add a task to get started.
              </Text>
            </View>
          )}
          {!!tasks.length && (
            <FlatList
              data={tasks}
              renderItem={({item, index, separators}) => (
                <TouchableHighlight
                  key={index}
                  onPress={() => {}}
                  onShowUnderlay={separators.highlight}
                  onHideUnderlay={separators.unhighlight}>
                  <View>
                    <Text>{item.name}</Text>
                  </View>
                </TouchableHighlight>
              )}
            />
          )}
          <View style={styles.addButton} onTouchEnd={onButtonPress}>
            <AddButton />
          </View>
        </View>
      </SafeAreaView>
    </>
  );

  function onButtonPress() {
    setTasks([
      {
        name: 'Go for a run',
        key: 'asdf',
      },
    ]);
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
