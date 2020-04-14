import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

declare var global: {HermesInternal: null | {}};

import AddButton from './src/assets/add-button.svg';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.sectionTitle}>Thursday, April 9th</Text>
          </View>
          <View style={styles.initialTip}>
            <Text style={styles.sectionTitle}>Welcome to Gradual!</Text>
            <Text style={styles.sectionTitle}>Add a task to get started.</Text>
          </View>
          <View style={styles.addButton}>
            <AddButton />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
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
