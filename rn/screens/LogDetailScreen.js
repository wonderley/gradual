import React, {Fragment} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  SectionList,
  Dimensions,
} from 'react-native';
import mainScreenNavOptions from './MainScreenNavOptions';
import styles from './Styles';
import EntryListItem from '../components/EntryListItem';
import { BarChart } from 'react-native-chart-kit';

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
    const entryItems = log.entries.map(entry => {
      return { log, entry }
    });
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
              { title: 'Recent Activity', data: [entryItems] },
              { title: 'Goal', data: log.goals.slice(0, 1) },
              { title: 'Entries', data: entryItems },
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
      const [{ log, entries }] = item;
      const chartConfig = {
        backgroundGradientFrom: log.color,
        backgroundGradientTo: log.color,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      };
      const graphStyle = {
        marginVertical: 8,
        borderRadius: 16,
        textStyle: styles.smallBoldText,
      };
      const screenWidth = Dimensions.get('window').width;
      const data = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [{
          data: [ 20, 45, 28, 80 ]
        }],
      }
      return (
        <View style={{ height: 250, width: screenWidth - 20 }}>
          <BarChart
            width={screenWidth - 20}
            height={220}
            data={data}
            fromZero={true}
            yAxisLabel={'$'}
            chartConfig={chartConfig}
            style={graphStyle} />
        </View>
      );
    }
    else if (title === 'Goal') {
      return (
        <View>
          <Text key={`goal${index}`}>{item.name}</Text>
          <Text>{'(Progress bar)'}</Text>
        </View>
      );
    } else if (title === 'Entries') {
      return <EntryListItem navigation={this.props.navigation}
                            entry={item.entry} log={item.log} index={index} />;
    }
  }
}

export default LogDetailScreen;