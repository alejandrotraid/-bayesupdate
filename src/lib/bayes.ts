import type { EvidenceDirection, EvidenceStrength } from "@/types";

/**
 * Pseudo-count weight added to alpha (favorable) or beta (unfavorable)
 * for each evidence strength level.
 */
const STRENGTH_WEIGHT: Record<EvidenceStrength, number> = {
  weak: 1,
  moderate: 3,
  strong: 6,
};

/**
 * Total pseudo-count assigned to a freshly created prediction's prior.
 * Higher values make the initial probability "stickier" against early evidence.
 */
const INITIAL_CONFIDENCE = 10;

export interface BetaParams {
  alpha: number;
  beta: number;
}

/** Convert a user-set prior probability (0-100) into Beta distribution parameters. */
export function priorToBeta(priorPercent: number): BetaParams {
  const p = clampProbability(priorPercent) / 100;
  return {
    alpha: p * INITIAL_CONFIDENCE,
    beta: (1 - p) * INITIAL_CONFIDENCE,
  };
}

/** Current probability (0-100) implied by a Beta(alpha, beta) distribution. */
export function betaToProbability({ alpha, beta }: BetaParams): number {
  return (alpha / (alpha + beta)) * 100;
}

/** Apply a piece of evidence, returning the updated Beta parameters. */
export function applyEvidence(
  current: BetaParams,
  direction: EvidenceDirection,
  strength: EvidenceStrength
): BetaParams {
  const weight = STRENGTH_WEIGHT[strength];

  switch (direction) {
    case "favorable":
      return { alpha: current.alpha + weight, beta: current.beta };
    case "unfavorable":
      return { alpha: current.alpha, beta: current.beta + weight };
    case "neutral":
      return current;
  }
}

/** Undo a previously applied piece of evidence, returning the prior Beta parameters. */
export function reverseEvidence(
  current: BetaParams,
  direction: EvidenceDirection,
  strength: EvidenceStrength
): BetaParams {
  const weight = STRENGTH_WEIGHT[strength];

  switch (direction) {
    case "favorable":
      return { alpha: current.alpha - weight, beta: current.beta };
    case "unfavorable":
      return { alpha: current.alpha, beta: current.beta - weight };
    case "neutral":
      return current;
  }
}

function clampProbability(value: number): number {
  return Math.min(100, Math.max(0, value));
}
