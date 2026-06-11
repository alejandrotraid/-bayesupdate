"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function resolvePrediction(formData: FormData) {
  const id = formData.get("predictionId") as string;
  const outcome = formData.get("outcome") as "resolved_true" | "resolved_false";
  const supabase = await createClient();

  const { error } = await supabase
    .from("predictions")
    .update({ status: outcome, resolved_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/");
  revalidatePath("/resolved");
  revalidatePath(`/predictions/${id}`);
}

export async function reopenPrediction(formData: FormData) {
  const id = formData.get("predictionId") as string;
  const supabase = await createClient();

  const { error } = await supabase
    .from("predictions")
    .update({ status: "active", resolved_at: null })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/");
  revalidatePath("/resolved");
  revalidatePath(`/predictions/${id}`);
}
