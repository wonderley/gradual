import React from 'react';
import {View, Text, FlatList, TouchableHighlight} from 'react-native';
import {InlineEdit} from './inline-edit';
import {Styles, listItemStyle} from './styles';
import {Task, TaskRepeat, TaskRepeatLabels} from './task';

interface Props {
  tasks: Task[];
  updateTaskName: (key: string, value: string) => void;
  updateTaskRepeat: (key: string, value: TaskRepeat) => void;
  saveEdits: (key: string) => void;
}

export const TaskList = (props: Props) => {
  if (!props.tasks.length) {
    return null;
  }
  return (
    <FlatList
      style={Styles.list}
      data={props.tasks}
      renderItem={({item, separators}) => (
        <TouchableHighlight
          underlayColor="#DDDDDD"
          key={item.key}
          onPress={() => {}}
          onShowUnderlay={separators.highlight}
          onHideUnderlay={separators.unhighlight}>
          {item.editing ? (
            <InlineEdit
              item={item}
              isTop={item === props.tasks[0]}
              onSave={() => props.saveEdits(item.key)}
              {...props}
            />
          ) : (
            <View style={listItemStyle(item === props.tasks[0])}>
              <Text style={Styles.listText}>{item.name}</Text>
              <Text style={Styles.listText}>
                {item.repeat === TaskRepeat.None
                  ? ''
                  : TaskRepeatLabels[item.repeat]}
              </Text>
            </View>
          )}
        </TouchableHighlight>
      )}
    />
  );
};
