import { createClient } from "@/lib/supabase/server";
import { betaToProbability } from "@/lib/bayes";
import { formatDate } from "@/lib/format";
import type { EvidenceEntry, Prediction } from "@/types";

export interface PredictionWithEvidence {
  prediction: Prediction;
  evidence: EvidenceEntry[];
  probabilityHistory: { label: string; probability: number }[];
}

interface PredictionRow {
  id: string;
  user_id: string;
  question: string;
  category: Prediction["category"];
  target_date: string | null;
  alpha: number;
  beta: number;
  status: Prediction["status"];
  created_at: string;
  resolved_at: string | null;
}

interface EvidenceRow {
  id: string;
  prediction_id: string;
  description: string;
  direction: EvidenceEntry["direction"];
  strength: EvidenceEntry["strength"];
  probability_before: number;
  probability_after: number;
  created_at: string;
}

function mapPrediction(row: PredictionRow): Prediction {
  return {
    id: row.id,
    userId: row.user_id,
    question: row.question,
    category: row.category,
    targetDate: row.target_date,
    alpha: row.alpha,
    beta: row.beta,
    status: row.status,
    createdAt: row.created_at,
    resolvedAt: row.resolved_at,
  };
}

function mapEvidence(row: EvidenceRow): EvidenceEntry {
  return {
    id: row.id,
    predictionId: row.prediction_id,
    description: row.description,
    direction: row.direction,
    strength: row.strength,
    probabilityBefore: row.probability_before,
    probabilityAfter: row.probability_after,
    createdAt: row.created_at,
  };
}

function buildHistory(
  prediction: Prediction,
  evidenceOldestFirst: EvidenceEntry[]
): { label: string; probability: number }[] {
  const start = evidenceOldestFirst[0]
    ? evidenceOldestFirst[0].probabilityBefore
    : betaToProbability(prediction);

  const history = [
    { label: formatDate(prediction.createdAt), probability: start },
  ];
  for (const entry of evidenceOldestFirst) {
    history.push({
      label: formatDate(entry.createdAt),
      probability: entry.probabilityAfter,
    });
  }
  return history;
}

async function getPredictionsByStatus(
  statuses: Prediction["status"][],
  orderBy: "created_at" | "resolved_at"
): Promise<PredictionWithEvidence[]> {
  const supabase = await createClient();

  const { data: predictionRows, error } = await supabase
    .from("predictions")
    .select("*")
    .in("status", statuses)
    .order(orderBy, { ascending: false });

  if (error) throw error;
  if (!predictionRows || predictionRows.length === 0) return [];

  const predictionIds = predictionRows.map((row) => row.id);
  const { data: evidenceRows, error: evidenceError } = await supabase
    .from("evidence_entries")
    .select("*")
    .in("prediction_id", predictionIds)
    .order("created_at", { ascending: true });

  if (evidenceError) throw evidenceError;

  return predictionRows.map((row) => {
    const prediction = mapPrediction(row);
    const evidenceOldestFirst = (evidenceRows ?? [])
      .filter((e) => e.prediction_id === prediction.id)
      .map(mapEvidence);

    return {
      prediction,
      evidence: [...evidenceOldestFirst].reverse(),
      probabilityHistory: buildHistory(prediction, evidenceOldestFirst),
    };
  });
}

export async function getAllPredictions(): Promise<PredictionWithEvidence[]> {
  return getPredictionsByStatus(["active"], "created_at");
}

export async function getResolvedPredictions(): Promise<
  PredictionWithEvidence[]
> {
  return getPredictionsByStatus(["resolved_true", "resolved_false"], "resolved_at");
}

export async function getPredictionById(
  id: string
): Promise<PredictionWithEvidence | null> {
  const supabase = await createClient();

  const { data: predictionRow, error } = await supabase
    .from("predictions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!predictionRow) return null;

  const { data: evidenceRows, error: evidenceError } = await supabase
    .from("evidence_entries")
    .select("*")
    .eq("prediction_id", id)
    .order("created_at", { ascending: true });

  if (evidenceError) throw evidenceError;

  const prediction = mapPrediction(predictionRow);
  const evidenceOldestFirst = (evidenceRows ?? []).map(mapEvidence);

  return {
    prediction,
    evidence: [...evidenceOldestFirst].reverse(),
    probabilityHistory: buildHistory(prediction, evidenceOldestFirst),
  };
}

/** Probability change since the most recent evidence entry, for trend display. */
export function getRecentTrend(item: PredictionWithEvidence): number {
  const [latest] = item.evidence;
  if (!latest) return 0;
  return latest.probabilityAfter - latest.probabilityBefore;
}
