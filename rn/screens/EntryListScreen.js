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
    const sections = Utils.entriesByDate(entries)
      .map(({entries, date}) => {
      return {
        data: entries,
        title: date,
      };
    });
    return (
      <Fragment>
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
                  <Text style={styles.itemText}>{title}</Text>
                </View>
              );
            }}
            sections={sections}
            keyExtractor={(item, index) => '' + index}
        />
        </SafeAreaView>
      </Fragment>
    );
  }
}


export default EntryListScreen;