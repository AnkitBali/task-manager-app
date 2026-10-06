"use client";

// Code with Best Practices
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import { TasksProvider } from "../TasksContext";
import {type Task} from "../types";

export default function TaskApp({initialTasks}: {initialTasks: Task[]}) {
  return (
    <TasksProvider initialTasks={initialTasks}>
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
        <section className="mx-auto w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Personal productivity
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Task Manager
          </h1>

          <p className="mt-2 text-base text-slate-500">
            Organize your day and focus on what matters.
          </p>

          <div className="mt-8">
            <AddTask />
          </div>

          <div className="mt-6">
            <TaskList />
          </div>
        </section>
      </main>
    </TasksProvider>
  );
}

// Code without Best Practices
// import AddTask from "./components/AddTask";
// import TaskList from "./components/TaskList";
// import { TasksContext, TasksDispatchContext } from "./TasksContext";
// import { useReducer } from "react";
// import { Task, ActionObj } from "./types";

// const initialTasks: Task[] = [{ id: 1, text: "first task", done: false }];
// let nextId = 2;

// function tasksReducer(tasks: Task[], action: ActionObj): Task[] {
//   switch (action.type) {
//     case "added": {
//       return [...tasks, { text: action.text, id: action.id, done: false }];
//     }
//     case "changed": {
//       return tasks.map((task) => {
//         if (task.id === action.task?.id) {
//           return action.task;
//         } else {
//           return task;
//         }
//       });
//     }
//     case "deleted": {
//       return tasks.filter((task) => task.id !== action.id);
//     }
//     default: {
//       throw new Error("Unknown Error");
//     }
//   }
// }
// export default function TaskApp() {
//   const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

//   function handleAddTask(text: string): void {
//     dispatch({
//       type: "added",
//       text: text,
//       id: nextId++,
//     });
//   }
//   function handleChangeTask(task: Task): void {
//     dispatch({
//       type: "changed",
//       task: task,
//     });
//   }
//   function handleDeleteTask(taskId: number): void {
//     dispatch({
//       type: "deleted",
//       id: taskId,
//     });
//   }
//   return (
//     <TasksContext value={tasks}>
//       <TasksDispatchContext value={dispatch}>
//         <div className="max-w-2xl mx-auto rounded-3xl bg-white shadow-xl">
//           <h1 className="text-slate-900"> Task Manager App</h1>
//           <h2>Organize Your Day</h2>
//           <AddTask
//           // onAddTask={handleAddTask}
//           />
//           <TaskList
//             // tasks={tasks}
//             // onChangeTask={handleChangeTask}
//             // onDeleteTask={handleDeleteTask}
//           />
//         </div>
//       </TasksDispatchContext>
//     </TasksContext>
//   );
// }
