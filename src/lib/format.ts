export type BadgeTier = "default" | "high" | "mid";

/** Visual tier for the probability badge, mirroring the mockup's color thresholds. */
export function getBadgeTier(probability: number): BadgeTier {
  if (probability >= 60) return "high";
  if (probability >= 40) return "mid";
  return "default";
}

export const BADGE_STYLES: Record<BadgeTier, string> = {
  default: "text-[var(--accent)] bg-[var(--accent-soft)]",
  high: "text-[var(--positive-text)] bg-[var(--positive-soft)]",
  mid: "text-[var(--negative-text)] bg-[var(--negative-soft)]",
};

export const BAR_COLORS: Record<BadgeTier, string> = {
  default: "var(--accent-bar)",
  high: "var(--positive)",
  mid: "var(--negative)",
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
