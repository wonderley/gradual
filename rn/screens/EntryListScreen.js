import React, {Fragment} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  SectionList,
} from 'react-native';
import mainScreenNavOptions from './MainScreenNavOptions';
import Utils from '../utils/Utils';
import Styles from './Styles';
import EntryListItem from '../components/EntryListItem';

class EntryListScreen extends React.Component {
  static navigationOptions = {
    title: 'Entries',
    ...mainScreenNavOptions,
  };

  render() {
    const styles = Styles.entriesList;
    const data = require('../sampleData.json');
    const entries = data.logs.reduce((entriesArr, log) => {
      if (log.entries) {
        const entryAndLog = log.entries.map(entry => {
          return { entry, log };
        });
        return entriesArr.concat(entryAndLog);
      } else {
        return entriesArr;
      }
    }, []);
    // array of { title: String, data: entryAndLog[]) }
    const entriesByDate = entries.reduce((entriesByDate, entryAndLog) => {
      const { entry } = entryAndLog;
      const dateString = Utils.timestampToDateString(entry.timestamp);
      const currentDateAndEntry = entriesByDate[entriesByDate.length - 1];
      if (currentDateAndEntry &&
          dateString === currentDateAndEntry.title) {
        currentDateAndEntry.data.push(entryAndLog);
      } else {
        // Create a new dateAndEntry
        entriesByDate.push({ title: dateString, data: [entryAndLog] });
      }
      return entriesByDate;
    }, []);
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <SectionList
            data={entries}
            renderItem={({item, index, section}) => {
              return <EntryListItem navigation={this.props.navigation}
                                    entry={item.entry} log={item.log} index={index} />
            }}
            renderSectionHeader={({ section: {title} }) => {
              return (
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>{title}</Text>
                </View>
              );
            }}
            sections={entriesByDate}
            keyExtractor={(item, index) => '' + index}
        />
        </SafeAreaView>
      </Fragment>
    );
  }
}


export default EntryListScreen;