export type BadgeTier = "default" | "high" | "mid";

/** Visual tier for the probability badge, mirroring the mockup's color thresholds. */
export function getBadgeTier(probability: number): BadgeTier {
  if (probability >= 60) return "high";
  if (probability >= 40) return "mid";
  return "default";
}

export const BADGE_STYLES: Record<BadgeTier, string> = {
  default: "text-[#185FA5] bg-[#E6F1FB]",
  high: "text-[#085041] bg-[#E1F5EE]",
  mid: "text-[#993C1D] bg-[#FAECE7]",
};

export const BAR_COLORS: Record<BadgeTier, string> = {
  default: "#378ADD",
  high: "#1D9E75",
  mid: "#D85A30",
};

export const CATEGORY_LABELS: Record<string, string> = {
  career: "Career",
  finance: "Finance",
  health: "Health",
  goals: "Goals",
  other: "Other",
};

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatSignedPercent(value: number): string {
  const rounded = Math.round(value);
  return `${rounded >= 0 ? "+" : ""}${rounded}%`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
