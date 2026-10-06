"use client";

import { useState, useTransition } from "react";
import { useTasks, 
  // useTasksDispatch 
} from "../TasksContext";
import { type Task } from "../types";
import { setTaskCompleted, deleteTask, updateTaskTitle } from "../actions/tasks";

type TaskProps = {
  task: Task;
  // onChange: (task: Task) => void;
  // onDelete: (taskId: number) => void;
};

export default function TaskList() {
// { onChangeTask, onDeleteTask}: TaskListProps
  const tasks = useTasks();

  const totalTasks = tasks?.length ?? 0;
  const completedTasks = tasks?.filter((task) => task.done).length ?? 0;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <section>
      <div className="mb-4 rounded-2xl bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-slate-800">Your tasks</h2>
            <p className="mt-1 text-sm text-slate-500">
              {completedTasks} of {totalTasks} completed
            </p>
          </div>

          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700">
            {Math.round(progress)}%
          </span>
        </div>

        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <ul className="space-y-3">
        {totalTasks === 0 ? (
          <li className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
            <p className="text-base font-semibold text-slate-700">All clear!</p>
            <p className="mt-1 text-sm text-slate-500">
              Add a task above to plan your next move.
            </p>
          </li>
        ) : (
          tasks?.map((task) => (
            <li key={task.id}>
              <Task task={task} />
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

function Task({ task }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [draftTitle, setDraftTitle] = useState(task.text);
  // const dispatch = useTasksDispatch();
  let taskContent;

  if (isEditing) {
    taskContent = (
      <>
        <input
          type="text"
          value={draftTitle}
          // onChange={(e) => {
          //   if (!dispatch) throw new Error("TasksDispatchContext Missing");

          //   dispatch({
          //     type: "changed",
          //     task: { ...task, text: e.target.value },
          //   });
          // }}
          onChange={(e) => setDraftTitle(e.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />

        <button
          type="button"
          disabled={isPending || !draftTitle.trim() || draftTitle.length > 280}
          // onClick={() => setIsEditing(false)}
          onClick={()=>{
            startTransition(async () => { 
            await updateTaskTitle(task.id, draftTitle); 
            setIsEditing(false); 
          })
          }}
          className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
        >
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        <span
          className={`flex-1 text-sm font-medium sm:text-base ${
            task.done ? "text-slate-400 line-through" : "text-slate-700"
          }`}
        >
          {task.text}
        </span>

        <button
          type="button"
          onClick={() => {
            setDraftTitle(task.text)
            setIsEditing(true)}}
          className="rounded-lg px-3 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-700"
        >
          Edit
        </button>
      </>
    );
  }

  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
      <input
        type="checkbox"
        checked={task.done}
        disabled={isPending}
        // onChange={(e) => {
        //   if (!dispatch) throw new Error("TasksDispatchContext Missing");

        //   dispatch({
        //     type: "changed",
        //     task: { ...task, done: e.target.checked },
        //   });

        // }}
        onChange={(e) => {
          const checked = e.currentTarget.checked;

          startTransition(async () => {
            await setTaskCompleted(task.id, checked);
          });
        }}
        className="h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 text-indigo-600 accent-indigo-600"
      />

      {taskContent}

      <button
        type="button"
        disabled={isPending}
        // onClick={() => {
        //   if (!dispatch) throw new Error("TasksDispatchContext Missing");
        //   dispatch({ type: "deleted", id: task.id });
        // }}
        onClick={() => {
          startTransition(async () => {
            await deleteTask(task.id);
          });
        }}
        className="rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 hover:text-rose-700"
      >
        Delete
      </button>
    </div>
  );
}
