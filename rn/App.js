import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import EntryListScreen from './screens/EntryListScreen';
import LogListScreen from './screens/LogListScreen';

const EntriesNavigator = createStackNavigator({
  Main: { screen: EntryListScreen },
});

const LogsNavigator = createStackNavigator({
  Main: { screen: LogListScreen },
});

const BottomTabNavigator = createBottomTabNavigator(
  {
    Logs: {
      screen: LogsNavigator,
    },
    Entries: {
      screen: EntriesNavigator,
    },
  },
  {
    initialRouteName: 'Logs',
    animationEnabled: false,
    swipeEnabled: true,
    // Android's default option displays tabBars on top, but iOS is bottom
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#e91e63',
      // Android's default showing of icons is false whereas iOS is true
      showIcon: true,
    },
  }
);

const App = createAppContainer(BottomTabNavigator)

export default App;
