import React, {Fragment} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import mainScreenNavOptions from './MainScreenNavOptions';

class AddEntryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { log } = navigation.state.params;
    return {
      title: 'New Entry',
      headerStyle: {
        backgroundColor: log.color,
        ...mainScreenNavOptions.headerStyle,
      },
      headerTitleStyle: mainScreenNavOptions.headerTitleStyle,
    };
  };

  render() {
    const { log } = this.props.navigation.state.params;
    return (
      <Fragment>
        <SafeAreaView style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <FlatList
            alwaysBounceVertical={false}
            data={[`Log: ${log.name}`,2,3]}
            renderItem={({ item, index }) => {
              return <Text>{item}</Text>;
            }}
            keyExtractor={(_, index) => '' + index}
          />
        </SafeAreaView>
      </Fragment>

    );
  }
}

export default AddEntryScreen;