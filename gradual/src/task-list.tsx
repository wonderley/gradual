import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Task, TaskRepeat, TaskRepeatLabels} from './task';

interface Props {
  tasks: Task[];
  updateTaskName: (key: string, value: string) => void;
  updateTaskRepeat: (key: string, value: TaskRepeat) => void;
}

import RNPickerSelect from 'react-native-picker-select';
export const TaskList = (props: Props) => {
  if (!props.tasks.length) {
    return null;
  }
  return (
    <FlatList
      style={styles.list}
      data={props.tasks}
      renderItem={({item, separators}) => (
        <TouchableHighlight
          key={item.key}
          onPress={() => {}}
          onShowUnderlay={separators.highlight}
          onHideUnderlay={separators.unhighlight}>
          {item.editing ? (
            <View style={listItemStyle(item)}>
              <TextInput
                autoCorrect={false}
                style={styles.listText}
                value={item.name}
                autoFocus={true}
                placeholder={'Task Name'}
                onChangeText={(text: string) => {
                  props.updateTaskName(item.key, text);
                }}
              />
              <RNPickerSelect
                InputAccessoryView={() => null}
                style={{inputIOS: styles.listText}}
                onValueChange={(value) => {
                  props.updateTaskRepeat(item.key, value);
                }}
                placeholder={{
                  label: TaskRepeatLabels[TaskRepeat.None],
                  value: TaskRepeat.None,
                  key: item.key + TaskRepeat.None,
                }}
                value={item.repeat}
                items={[
                  {
                    label: TaskRepeatLabels[TaskRepeat.Daily],
                    value: TaskRepeat.Daily,
                    key: item.key + TaskRepeat.Daily,
                  },
                ]}
              />
            </View>
          ) : (
            <View style={listItemStyle(item)}>
              <Text style={styles.listText}>{item.name}</Text>
              <Text style={styles.listText}>
                {TaskRepeatLabels[item.repeat]}
              </Text>
            </View>
          )}
        </TouchableHighlight>
      )}
    />
  );

  function listItemStyle(item: Task): any {
    return item === props.tasks[0] ? styles.topListItem : styles.listItem;
  }
};

const styles = StyleSheet.create({
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
})