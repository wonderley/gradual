import React, {Fragment} from 'react';
import Styles from '../screens/Styles';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class EntryListItem extends React.Component {
  render() {
    const styles = Styles.entriesList;
    const { entry, log, index } = this.props;
    return <TouchableOpacity activeOpacity={.75} onPress={this.itemSelected.bind(this)}>
      <View
        style={{
          backgroundColor: log.color,
          borderTopWidth: (index === 0 ? styles.itemView.borderBottomWidth : null),
          ...styles.itemView
        }}>
        <Text style={styles.itemText}>
          {log.name}
        </Text>
        <Text style={styles.itemText}>
          {Utils.timestampToDateString(entry.timestamp)}
        </Text>
        <Text style={styles.itemText}>
          {this.entryValueSummary()}
        </Text>
      </View>
    </TouchableOpacity>;
  }


  itemSelected() {
    this.props.navigation.navigate('EntryDetailScreen', {
      entry: this.props.entry,
      log: this.props.log,
    });
  }

  entryValueSummary() {
    const { values } = this.props.entry;
    return Object.entries(values).map(([key, value]) => {
      return `${value} ${key}`;
    }).join(', ');
  }
}