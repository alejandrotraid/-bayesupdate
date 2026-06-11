"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { applyEvidence, betaToProbability } from "@/lib/bayes";
import type { EvidenceDirection, EvidenceStrength } from "@/types";

export interface LogEvidenceState {
  error: string | null;
}

export async function logEvidence(
  _prevState: LogEvidenceState,
  formData: FormData
): Promise<LogEvidenceState> {
  const supabase = await createClient();

  const predictionId = formData.get("predictionId") as string;
  const description = (formData.get("description") as string)?.trim();
  const direction = formData.get("direction") as EvidenceDirection;
  const strength = formData.get("strength") as EvidenceStrength;

  if (!description) {
    return { error: "Please describe the evidence." };
  }

  const { data: prediction, error: fetchError } = await supabase
    .from("predictions")
    .select("alpha, beta")
    .eq("id", predictionId)
    .single();

  if (fetchError || !prediction) {
    return { error: fetchError?.message ?? "Prediction not found." };
  }

  const before = { alpha: prediction.alpha, beta: prediction.beta };
  const after = applyEvidence(before, direction, strength);

  const probabilityBefore = betaToProbability(before);
  const probabilityAfter = betaToProbability(after);

  const { error: updateError } = await supabase
    .from("predictions")
    .update({ alpha: after.alpha, beta: after.beta })
    .eq("id", predictionId);

  if (updateError) {
    return { error: updateError.message };
  }

  const { error: insertError } = await supabase.from("evidence_entries").insert({
    prediction_id: predictionId,
    description,
    direction,
    strength,
    probability_before: probabilityBefore,
    probability_after: probabilityAfter,
  });

  if (insertError) {
    return { error: insertError.message };
  }

  revalidatePath(`/predictions/${predictionId}`);
  revalidatePath("/");
  return { error: null };
}
