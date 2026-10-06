
import TaskApp from './components/TaskApp'
import {createClient} from '../lib/supabase/server'
import { redirect } from "next/navigation";

export default async function App() {
  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser()
  if (!user){
    redirect('/login');
  };
  const { data: tasks, error } = await supabase
  .from("tasks")
  .select("id, title, completed_at")
  .eq("user_id", user.id)
  .order("created_at", { ascending: false });

  if(error) throw new Error(error.message);

  const initialTasks = (tasks ?? []).map((task) => ({
  id: task.id,
  text: task.title,
  done: task.completed_at !== null,
}));
  return (
    <TaskApp initialTasks={initialTasks} />
  );
}
