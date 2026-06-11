export type Category = "career" | "finance" | "health" | "goals" | "other";

export type EvidenceDirection = "favorable" | "unfavorable" | "neutral";

export type EvidenceStrength = "weak" | "moderate" | "strong";

export type PredictionStatus = "active" | "resolved_true" | "resolved_false";

export interface Prediction {
  id: string;
  userId: string;
  question: string;
  category: Category;
  targetDate: string | null;
  /** Beta distribution shape parameters representing the current belief */
  alpha: number;
  beta: number;
  status: PredictionStatus;
  createdAt: string;
  resolvedAt: string | null;
}

export interface EvidenceEntry {
  id: string;
  predictionId: string;
  description: string;
  direction: EvidenceDirection;
  strength: EvidenceStrength;
  probabilityBefore: number;
  probabilityAfter: number;
  createdAt: string;
}
