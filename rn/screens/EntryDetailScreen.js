import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
} from 'react-native';
import mainScreenNavOptions from './MainScreenNavOptions';
import Utils from '../utils/Utils';
import Styles from './Styles';
import { Icon } from 'react-native-elements';

export default class EntryDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { entry } = navigation.state.params;
    // todo: center the title text
    return {
      title: entry.logName,
      headerStyle: {
        backgroundColor: entry.logColor,
        ...mainScreenNavOptions.headerStyle,
      },
      headerTitleStyle: mainScreenNavOptions.headerTitleStyle,
    };
  };

  render() {
    const { entry } = this.props.navigation.state.params;
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={{ padding: 10 }}>
            <Text style={Styles.sectionTitleStyle}>
              {Utils.timestampToDateAndTimeString(entry.timestamp)}
            </Text>
            {this.entryValues(entry.values)}
            <Text style={Styles.sectionTitleStyle}>
              Notes:
            </Text>
            <Text style={Styles.smallBoldText}>
              {entry.notes}
            </Text>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }

  entryValues(values) {
    return Object.entries(values).map(([name, value]) => {
      return <Text key={name} style={Styles.sectionTitleStyle}>
               {`${value} ${name}`}
             </Text>;
    });
  }
}