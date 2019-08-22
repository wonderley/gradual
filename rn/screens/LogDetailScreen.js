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
import mainScreenNavOptions from './MainScreenNavOptions';
import styles from './Styles';

class LogDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.log.name,
      headerStyle: {
        backgroundColor: navigation.state.params.log.color,
        ...mainScreenNavOptions.headerStyle,
      },
      headerTitleStyle: mainScreenNavOptions.headerTitleStyle,
    };
  };

  render() {
    const log = this.props.navigation.state.params.log;
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <SectionList style={styles.sectionListStyle}
            renderItem={this.renderItem.bind(this)}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.sectionTitleStyle}>{title}</Text>
            )}
            sections={[
              { title: 'Recent Activity', data: [log.entries] },
              { title: 'Goal', data: log.goals.slice(0, 1) },
              { title: 'Entries', data: log.entries },
              /*{ title: 'Milestones', data: [] },*/
            ]}
            keyExtractor={this.keyExtractor.bind(this)}
          />
        </SafeAreaView>
      </Fragment>
    );
  }

  keyExtractor(item, index) {
    let section;
    if (item.length) section = 'recent'
    else if (item.frequency) section = 'goal'
    else if (item.notes) section = 'entry'
    else section = 'other'
    return section + index;
  }

  renderItem({item, index, section}) {
    const { title } = section;
    if (title === 'Recent Activity') {
      return <View style={{
        height: 250, width: '100%',
      }}></View>;
    }
    else if (title === 'Goal') {
      return (
        <View>
          <Text key={`goal${index}`}>{item.name}</Text>
          <Text>{'(Progress bar)'}</Text>
        </View>
      );
    } else if (title === 'Entries') {
      return <Text key={`entry${index}`}>{JSON.stringify(item)}</Text>;
    }
  }
}

export default LogDetailScreen;