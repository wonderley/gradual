import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  listItem: {
    marginHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  topListItem: {
    borderTopWidth: 1,
    // listItem
    marginHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  listText: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 5,
  },
  hideChevron: {
    display: 'none',
  },
});

export function listItemStyle(isTop: boolean): any {
  return isTop ? Styles.topListItem : Styles.listItem;
}
