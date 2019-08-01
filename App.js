/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  SectionList,
} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 22
      },
      sectionHeader: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
      },
      itemText: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
      itemView: {
        // todo - add border to the top on the first item
        borderBottomWidth: StyleSheet.hairlineWidth,
      }
    });
    const data = require('./sampleData.json');
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <SectionList
              sections={[
                {title: 'Logs', data: data.logs},
                {title: 'Goals', data: data.goals},
              ]}
              renderItem={({item}) => {
                return (
                  <View style={styles.itemView}>
                    <Text style={styles.itemText}>{item.name}</Text>
                  </View>
                );
              }}
              renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
              keyExtractor={(item, index) => index}
          />
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const MainNavigator = createStackNavigator({
  Main: {screen: MainScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
