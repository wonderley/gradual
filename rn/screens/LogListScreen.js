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
import { black } from 'ansi-colors';

class LogListScreen extends React.Component {
  static navigationOptions = {
    title: 'Logs',
    ...mainScreenNavOptions,
  };

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
      itemText: {
        padding: 10,
        fontSize: 18,
        height: 44,
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
      },
      addItemView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        borderColor: '#00331f',
        borderWidth: StyleSheet.hairlineWidth,
        margin: 5,
        borderRadius: 3,
        backgroundColor: '#ccffeb'
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
            renderItem={({item}) => {
              if (item.name) {
                return (
                  <View style={styles.itemView}>
                    <Text style={styles.itemText}>{item.name}</Text>
                  </View>
                );
              } else if (item.isAddButton) {
                return (
                  <View style={styles.addItemView}>
                    <Text style={styles.itemText}>Start a new log!</Text>
                    <Text style={styles.plusSignText}>+</Text>
                  </View>
                ); 
              }
            }}
            keyExtractor={(_, index) => '' + index}
          />
        </SafeAreaView>
      </Fragment>
    );
  }
}


export default LogListScreen;