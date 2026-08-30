import {createContext, type Dispatch, type ReactNode, useContext, useReducer} from 'react';
import {Task, ActionObj} from './types'

// Here, we are passing null as the default value to both contexts. The actual values will be provided by the TaskApp component.
export const TasksContext = createContext<Task[] | null>(null);
export const TasksDispatchContext = createContext<Dispatch<ActionObj> | null>(null);

const initialTasks: Task[] = [{ id: 1, text: "first task", done: false }];

function tasksReducer(tasks: Task[], action: ActionObj): Task[] {
  switch (action.type) {
    case "added": {
      return [...tasks, { text: action.text, id: action.id, done: false }];
    }
    case "changed": {
      return tasks.map((task) => {
        if (task.id === action.task?.id) {
          return action.task;
        } else {
          return task;
        }
      });
    }
    case "deleted": {
      return tasks.filter((task) => task.id !== action.id);
    }
    default: {
      throw new Error("Unknown Error");
    }
  }
}

export const TasksProvider = ({children}: {children: ReactNode}) => {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
    return(
        <TasksContext value={tasks}>
            <TasksDispatchContext value={dispatch}>
                {children}
            </TasksDispatchContext>
        </TasksContext>
    )
}

export const useTasks = () => {
    return useContext(TasksContext);
}

export const useTasksDispatch = () => {
    return useContext(TasksDispatchContext);
}

