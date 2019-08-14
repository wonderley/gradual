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
            logValues: log.values,
            ...entry,
          };
        });
        return entriesArr.concat(entryData);
      } else {
        return entriesArr;
      }
    }, []); 
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <FlatList
              data={entries}
              renderItem={({item}) => {
                return (
                  <View style={styles.itemView}>
                    <Text style={styles.itemText}>{item.logName}</Text>
                    <Text style={styles.itemText}>{item.timestamp}</Text>
                  </View>
                );
              }}
              keyExtractor={(item, index) => '' + index}
          />
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}


export default EntryListScreen;