import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';
import mainScreenNavOptions from './MainScreenNavOptions';
import Utils from '../utils/Utils';

class EntryListScreen extends React.Component {
  static navigationOptions = {
    title: 'Entries',
    ...mainScreenNavOptions,
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
        paddingBottom: 10,
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
    const data = require('../sampleData.json');
    const entries = data.logs.reduce((entriesArr, log) => {
      if (log.entries) {
        const entryData = log.entries.map(entry => {
          return {
            logName: log.name,
            logColor: log.color,
            logValues: log.values,
            ...entry,
          };
        });
        return entriesArr.concat(entryData);
      } else {
        return entriesArr;
      }
    }, []);
    // array of { dateString: String, entries: entry[]) }
    const entriesByDate = entries.reduce((entriesByDate, entry) => {
      const dateString = Utils.timestampToDateString(entry.timestamp);
      const currentDateAndEntry = entriesByDate[entriesByDate.length - 1];
      let dateAndEntry;
      if (currentDateAndEntry &&
          dateString !== currentDateAndEntry.dateString) {
        currentDateAndEntry.entries.push(entry);
      } else {
        // Create a new dateAndEntry
        entriesByDate.push({ dateString, entries: [entry] });
      }
      return entriesByDate;
    }, []);
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <FlatList
            data={entries}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    backgroundColor: item.logColor,
                    ...styles.itemView
                  }}>
                  <Text style={styles.itemText}>{item.logName}</Text>
                  <Text style={styles.itemText}>{Utils.timestampToDateString(item.timestamp)}</Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => '' + index}
        />
        </SafeAreaView>
      </Fragment>
    );
  }
}


export default EntryListScreen;