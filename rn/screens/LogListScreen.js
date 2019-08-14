import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  SectionList,
} from 'react-native';
import { Icon } from 'react-native-elements'

class LogListScreen extends React.Component {
  static navigationOptions = {
    title: '',
    headerStyle: {
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24,
    },
    headerLeft: <Icon name='account-circle' size={40} containerStyle={{ paddingLeft: 8 }} />,
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
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <SectionList
              sections={[
                {title: 'Logs', data: data.logs},
              ]}
              renderItem={({item}) => {
                return (
                  <View style={styles.itemView}>
                    <Text style={styles.itemText}>{item.name}</Text>
                  </View>
                );
              }}
              renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
              keyExtractor={(item, index) => index}
          />
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}


export default LogListScreen;