export interface Task {
  name: string;
  key: string;
  repeat: TaskRepeat;
  editing: boolean;
}

export enum TaskRepeat {
  None = 'none',
  Daily = 'daily',
}

export const TaskRepeatLabels = {
  [TaskRepeat.None]: "Don't repeat",
  [TaskRepeat.Daily]: 'Daily',
};
