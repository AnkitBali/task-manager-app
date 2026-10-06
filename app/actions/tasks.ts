"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const taskSchema = z.object({
  title: z.string().trim().min(1).max(280)
});

const completionSchema = z.object({
  id: z.uuid(),
  completed: z.boolean(),
});

const deletionSchema = z.object({
  id: z.uuid()
});

const updateTaskSchema = z.object({
  id: z.uuid(),
  title: z.string().trim().min(1).max(280)
});

export async function createTask(formData: FormData) {
  const result = taskSchema.safeParse({
    title: formData.get("title")
  });

  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }

  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser();

  if(!user) throw new Error('You must be logged in to create a task');
  const {error} = await supabase.from("tasks").insert({
    title: result.data.title,
    user_id: user.id
  });

  if(error) {
    throw new Error(error.message);
  }
  revalidatePath("/");
}

export async function setTaskCompleted(id: string, completed: boolean){
    const result = completionSchema.safeParse({ id, completed });

  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }

  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser();

  if(!user) throw new Error('You must be logged in to update a task');
  const { error } = await supabase
  .from("tasks")
  .update({
    completed_at: result.data.completed
      ? new Date().toISOString()
      : null,
  })
  .eq("id", result.data.id)
  .eq("user_id", user.id);

  if(error) {
    throw new Error(error.message);
  }
  revalidatePath("/");

}

export async function deleteTask(id: string){
  const result = deletionSchema.safeParse({id});

  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }

  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser();

  if(!user) throw new Error('You must be logged in to delete a task');
  const { error } = await supabase
  .from("tasks")
  .delete()
  .eq("id", result.data.id)
  .eq("user_id", user.id);

  if(error) {
    throw new Error(error.message);
  }
  revalidatePath("/");
}

export async function updateTaskTitle(id: string, title: string){
    const result = updateTaskSchema.safeParse({ id, title });

  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }

  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser();

  if(!user) throw new Error('You must be logged in to update a task');
  const { error } = await supabase
  .from("tasks")
  .update({
    title: result.data.title
  })
  .eq("id", result.data.id)
  .eq("user_id", user.id);

  if(error) {
    throw new Error(error.message);
  }
  revalidatePath("/");

}