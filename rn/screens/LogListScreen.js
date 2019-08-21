import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import mainScreenNavOptions from './MainScreenNavOptions';
import { Icon } from 'react-native-elements';

class LogListScreen extends React.Component {
  static navigationOptions = {
    title: 'Logs',
    ...mainScreenNavOptions,
  };

  static logColors = [ '#FBA575', '#A8B9FA' ];

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 22,
      },
      sectionHeader: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        fontSize: 24,
        fontWeight: 'bold',
      },
      itemTitleText: {
        fontSize: 24,
        height: 36,
        fontWeight: 'bold',
      },
      itemSubText: {
        height: 24,
        fontSize: 14,
        fontWeight: 'bold',
      },
      plusSignText: {
        fontSize: 36,
      },
      itemView: {
        height: 120,
        borderColor: 'black',
        borderWidth: StyleSheet.hairlineWidth,
        margin: 5,
        borderRadius: 3,
        padding: 10,
      },
      addItemView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        borderWidth: StyleSheet.hairlineWidth,
        margin: 5,
        borderRadius: 3,
        backgroundColor: '#73FFC8'
      }
    });
    const data = require('../sampleData.json');
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <FlatList
            alwaysBounceVertical={false}
            data={[...data.logs, { isAddButton: true }]}
            renderItem={({ item, index }) => {
              if (item.name) {
                return (
                  <TouchableOpacity activeOpacity={.75} onPress={this.onPressButton.bind(this)}>
                    <View style={{
                      ...styles.itemView,
                      backgroundColor: LogListScreen.logColors[index]
                    }}>
                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                        <View>
                          <Text style={styles.itemTitleText}>{item.name}</Text>
                          <Text style={styles.itemSubText}>{this.textSummaryForGoals(item.goals)}</Text>
                          <Text style={styles.itemSubText}>{this.latestUpdateText(item.entries)}</Text>
                        </View>
                          <Icon name={item.icon}
                                size={40}
                                containerStyle={{
                                  width: 50,
                                }} />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              } else if (item.isAddButton) {
                return (
                  <TouchableOpacity activeOpacity={.75} onPress={this.onPressButton.bind(this)}>
                    <View style={styles.addItemView}>
                      <Text style={styles.itemTitleText}>Start a new log!</Text>
                      <Icon name='add' size={40} containerStyle={{ paddingRight: 8 }} />
                    </View>
                  </TouchableOpacity>
                ); 
              }
            }}
            keyExtractor={(_, index) => '' + index}
          />
        </SafeAreaView>
      </Fragment>
    );
  }

  onPressButton() {
    this.props.navigation.navigate('LogDetailScreen', { name: 'Jordan' });
  }

  textSummaryForGoals(goals) {
    // e.g. Once a day, Three times a week
    if (!goals.length) {
      return '';
    }
    const goal = goals[0];
    return `${LogListScreen.frequencyMap[goal.frequency.count - 1]} `
           + (goal.frequency.count > 2 ? 'times a ' : '')
           + goal.frequency.unit;
  }

  latestUpdateText(entries) {
    if (!entries.length) return '';
    const timestamp = entries[entries.length-1].timestamp;
    const date = new Date(timestamp);
    // e.g. Mon Jul 29 2019
    let dateString = date.toDateString();
    if (date.getFullYear() === (new Date).getFullYear()) {
      // Don't show the year if it's the current year
      dateString = dateString.split(' ').slice(0, -1).join(' ');
    }
    return `Updated ${dateString}`;
  }

  static frequencyMap = [
    'Every', 'Twice a', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'
  ];
}

export default LogListScreen;