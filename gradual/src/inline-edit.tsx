import React from 'react';
import {View, TextInput} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Styles, listItemStyle} from './styles';
import {Task, TaskRepeat, TaskRepeatLabels} from './task';

interface Props {
  isTop: boolean;
  item: Task;
  updateTaskName: (key: string, value: string) => void;
  updateTaskRepeat: (key: string, value: TaskRepeat) => void;
}

export const InlineEdit = (props: Props) => {
  const {isTop, item} = props;
  return (
    <View style={listItemStyle(isTop)}>
      <TextInput
        returnKeyType={'next'}
        style={Styles.listText}
        value={item.name}
        autoFocus={true}
        placeholder={'Task Name'}
        onChangeText={(text: string) => {
          props.updateTaskName(item.key, text);
        }}
        onSubmitEditing={() => {
          focusNext(1);
        }}
      />
      <RNPickerSelect
        style={{
          inputIOS: Styles.listText,
          chevronUp: Styles.hideChevron,
          chevronDown: Styles.hideChevron,
        }}
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
  );

  function focusNext(index: number) {
    console.log('Focus ' + index);
  }
};
