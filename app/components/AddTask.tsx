'use client';

// import {useState} from 'react';
// import {useTasksDispatch} from '../TasksContext';
import {createTask} from '../actions/tasks';

// let nextId = 2

export default function AddTask(
    // {onAddTask}: {onAddTask: (text:string)=>void}
){
    // const [text, setText] = useState('');
    // const dispatch = useTasksDispatch();
    

    return(
    <form action={createTask} className="flex flex-col gap-3 sm:flex-row">
    <input
      type="text"
      name='title'
      required
      placeholder="What needs to be done?"
      // value={text}
      // onChange={(e) => setText(e.target.value)}
      className="min-h-12 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
    />
    <button
      type="submit"
      // onClick={() => {
      //   setText("");
      //   if (!dispatch) throw new Error("TasksDispatchContext is missing");

      //   dispatch({
      //     type: "added",
      //     id: nextId++,
      //     text: text,
      //   });
      // }}
      className="min-h-12 rounded-xl bg-indigo-600 px-6 font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-200 active:scale-[0.98]"
    >
      Add task
    </button>
    </form>
    )
}