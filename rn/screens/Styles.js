import React from 'react';
import {
  StyleSheet,
} from 'react-native';

const bigBoldText = {
  fontWeight: 'bold',
  fontSize: 24,
};
const smallText = {
  fontSize: 16,
  height: 24,
};
const smallBoldText = {
  ...smallText,
  fontWeight: 'bold',
};
export default styles = {
  sectionListStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  sectionTitleStyle: {
    ...bigBoldText,
    paddingTop: 10,
    paddingBottom: 10,
  },
  entriesList: {
    itemText: smallBoldText,
    itemView: {
      padding: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    sectionHeader: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      paddingRight: 5,
      backgroundColor: 'white',
    },
    sectionHeaderText: {
      color: 'black',
      ...smallBoldText,
    }
  },
  smallBoldText,
}