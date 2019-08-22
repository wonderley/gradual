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

class LogDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.log.name,
      headerStyle: {
        backgroundColor: navigation.state.params.color,
        ...mainScreenNavOptions.headerStyle,
      },
      headerTitleStyle: mainScreenNavOptions.headerTitleStyle,
    };
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default LogDetailScreen;