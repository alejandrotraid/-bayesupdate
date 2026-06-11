"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { priorToBeta } from "@/lib/bayes";
import type { Category } from "@/types";

export interface CreatePredictionState {
  error: string | null;
}

export async function createPrediction(
  _prevState: CreatePredictionState,
  formData: FormData
): Promise<CreatePredictionState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to create a prediction." };
  }

  const question = (formData.get("question") as string)?.trim();
  const category = formData.get("category") as Category;
  const targetDate = formData.get("targetDate") as string;
  const priorPercent = Number(formData.get("prior"));

  if (!question) {
    return { error: "Please enter a question." };
  }

  if (Number.isNaN(priorPercent) || priorPercent < 0 || priorPercent > 100) {
    return { error: "Prior probability must be between 0 and 100." };
  }

  const { alpha, beta } = priorToBeta(priorPercent);

  const { error } = await supabase.from("predictions").insert({
    user_id: user.id,
    question,
    category,
    target_date: targetDate || null,
    alpha,
    beta,
    status: "active",
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  redirect("/");
}
