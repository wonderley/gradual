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

class GoalListScreen extends React.Component {
  static navigationOptions = {
    title: 'Gradual',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
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
    const goals = data.logs.reduce((goalsArr, log) => {
      if (log.goals) {
        return goalsArr.concat(log.goals);
      } else {
        return goalsArr;
      }
    }, []); 
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <SectionList
              sections={[
                {title: 'Goals', data: goals},
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


export default GoalListScreen;