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

class LogDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Log Detail Screen',
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