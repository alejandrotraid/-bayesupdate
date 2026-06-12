"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { applyEvidence, betaToProbability, reverseEvidence } from "@/lib/bayes";
import type { Category, EvidenceDirection, EvidenceStrength } from "@/types";

export interface EditPredictionState {
  error: string | null;
}

export async function updatePrediction(
  _prevState: EditPredictionState,
  formData: FormData
): Promise<EditPredictionState> {
  const supabase = await createClient();

  const predictionId = formData.get("predictionId") as string;
  const question = (formData.get("question") as string)?.trim();
  const category = formData.get("category") as Category;
  const targetDate = formData.get("targetDate") as string;

  if (!question) {
    return { error: "Please enter a question." };
  }

  const { error } = await supabase
    .from("predictions")
    .update({
      question,
      category,
      target_date: targetDate || null,
    })
    .eq("id", predictionId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/predictions/${predictionId}`);
  revalidatePath("/");
  return { error: null };
}

export interface EditEvidenceState {
  error: string | null;
}

export async function updateEvidence(
  _prevState: EditEvidenceState,
  formData: FormData
): Promise<EditEvidenceState> {
  const supabase = await createClient();

  const evidenceId = formData.get("evidenceId") as string;
  const predictionId = formData.get("predictionId") as string;
  const description = (formData.get("description") as string)?.trim();
  const isLatest = formData.get("isLatest") === "true";

  if (!description) {
    return { error: "Please describe the evidence." };
  }

  if (!isLatest) {
    const { error } = await supabase
      .from("evidence_entries")
      .update({ description })
      .eq("id", evidenceId);

    if (error) {
      return { error: error.message };
    }

    revalidatePath(`/predictions/${predictionId}`);
    return { error: null };
  }

  const direction = formData.get("direction") as EvidenceDirection;
  const strength = formData.get("strength") as EvidenceStrength;

  const [
    { data: prediction, error: predictionError },
    { data: entry, error: entryError },
  ] = await Promise.all([
    supabase.from("predictions").select("alpha, beta").eq("id", predictionId).single(),
    supabase
      .from("evidence_entries")
      .select("direction, strength")
      .eq("id", evidenceId)
      .single(),
  ]);

  if (predictionError || !prediction) {
    return { error: predictionError?.message ?? "Prediction not found." };
  }
  if (entryError || !entry) {
    return { error: entryError?.message ?? "Evidence entry not found." };
  }

  const base = reverseEvidence(
    { alpha: prediction.alpha, beta: prediction.beta },
    entry.direction,
    entry.strength
  );
  const updated = applyEvidence(base, direction, strength);

  const probabilityBefore = betaToProbability(base);
  const probabilityAfter = betaToProbability(updated);

  const { error: predictionUpdateError } = await supabase
    .from("predictions")
    .update({ alpha: updated.alpha, beta: updated.beta })
    .eq("id", predictionId);

  if (predictionUpdateError) {
    return { error: predictionUpdateError.message };
  }

  const { error: evidenceUpdateError } = await supabase
    .from("evidence_entries")
    .update({
      description,
      direction,
      strength,
      probability_before: probabilityBefore,
      probability_after: probabilityAfter,
    })
    .eq("id", evidenceId);

  if (evidenceUpdateError) {
    return { error: evidenceUpdateError.message };
  }

  revalidatePath(`/predictions/${predictionId}`);
  revalidatePath("/");
  return { error: null };
}

export interface DeleteEvidenceState {
  error: string | null;
}

export async function deleteEvidence(
  _prevState: DeleteEvidenceState,
  formData: FormData
): Promise<DeleteEvidenceState> {
  const supabase = await createClient();

  const evidenceId = formData.get("evidenceId") as string;
  const predictionId = formData.get("predictionId") as string;

  const [
    { data: prediction, error: predictionError },
    { data: entry, error: entryError },
  ] = await Promise.all([
    supabase.from("predictions").select("alpha, beta").eq("id", predictionId).single(),
    supabase
      .from("evidence_entries")
      .select("direction, strength")
      .eq("id", evidenceId)
      .single(),
  ]);

  if (predictionError || !prediction) {
    return { error: predictionError?.message ?? "Prediction not found." };
  }
  if (entryError || !entry) {
    return { error: entryError?.message ?? "Evidence entry not found." };
  }

  const reverted = reverseEvidence(
    { alpha: prediction.alpha, beta: prediction.beta },
    entry.direction,
    entry.strength
  );

  const { error: predictionUpdateError } = await supabase
    .from("predictions")
    .update({ alpha: reverted.alpha, beta: reverted.beta })
    .eq("id", predictionId);

  if (predictionUpdateError) {
    return { error: predictionUpdateError.message };
  }

  const { error: deleteError } = await supabase
    .from("evidence_entries")
    .delete()
    .eq("id", evidenceId);

  if (deleteError) {
    return { error: deleteError.message };
  }

  revalidatePath(`/predictions/${predictionId}`);
  revalidatePath("/");
  return { error: null };
}
