export type Task = {
  id: string;
  text: string;
  done: boolean;
};

export type ActionObj =
  | {
      type: "added";
      text: string;
      id: string;
    }
  | {
      type: "changed";
      task: Task;
    }
  | {
      type: "deleted";
      id: string;
    }
  | { type: "loaded"; tasks: Task[] };
