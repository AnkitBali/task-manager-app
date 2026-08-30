export type Task = {
  id: number;
  text: string;
  done: boolean;
}

export type ActionObj = | {
  type: 'added';
  text: string;
  id: number
} | {
  type: 'changed';
  task: Task;
} | {
  type: 'deleted';
  id: number;
}