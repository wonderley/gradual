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
  onSave: () => void;
}

export const InlineEdit = (props: Props) => {
  const {isTop, item} = props;
  const inputRefs: {
    repeat: null | RNPickerSelect;
  } = {
    repeat: null,
  };
  return (
    // TODO: Maybe the View should be outside this component
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
          // togglePicker isn't in the index.d.ts file
          inputRefs.repeat && (inputRefs.repeat as any).togglePicker();
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
        onClose={() => {
          // This is the last widget, so editing is done
          props.onSave();
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
        ref={(input) => {
          inputRefs.repeat = input;
        }}
      />
    </View>
  );
};
