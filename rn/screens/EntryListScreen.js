import React, {Fragment} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import mainScreenNavOptions from './MainScreenNavOptions';
import Utils from '../utils/Utils';
import Styles from './Styles';

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
        const entryData = log.entries.map(entry => {
          return {
            logName: log.name,
            logColor: log.color,
            ...entry,
          };
        });
        return entriesArr.concat(entryData);
      } else {
        return entriesArr;
      }
    }, []);
    // array of { title: String, data: entry[]) }
    const entriesByDate = entries.reduce((entriesByDate, entry) => {
      const dateString = Utils.timestampToDateString(entry.timestamp);
      const currentDateAndEntry = entriesByDate[entriesByDate.length - 1];
      if (currentDateAndEntry &&
          dateString === currentDateAndEntry.title) {
        currentDateAndEntry.data.push(entry);
      } else {
        // Create a new dateAndEntry
        entriesByDate.push({ title: dateString, data: [entry] });
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
              return (
                <TouchableOpacity activeOpacity={.75} onPress={this.itemSelected.bind(this, item)}>
                  <View
                    style={{
                      backgroundColor: item.logColor,
                      borderTopWidth: (index === 0 ? styles.itemView.borderBottomWidth : null),
                      ...styles.itemView
                    }}>
                    <Text style={styles.itemText}>
                      {item.logName}
                    </Text>
                    <Text style={styles.itemText}>
                      {Utils.timestampToDateString(item.timestamp)}
                    </Text>
                    <Text style={styles.itemText}>
                      {this.entryValueSummary(item.values)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
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

  itemSelected(item) {
    this.props.navigation.navigate('EntryDetailScreen', {
      entry: item,
    });
  }

  entryValueSummary(values) {
    return Object.entries(values).map(([key, value]) => {
      return `${value} ${key}`;
    }).join(', ');
  }
}


export default EntryListScreen;