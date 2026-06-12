import Link from "next/link";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import type { PredictionWithEvidence } from "@/lib/data/predictions";
import { getRecentTrend } from "@/lib/data/predictions";
import {
  BADGE_STYLES,
  BAR_COLORS,
  CATEGORY_LABELS,
  formatPercent,
  formatSignedPercent,
  getBadgeTier,
} from "@/lib/format";
import { betaToProbability } from "@/lib/bayes";

export function PredictionCard({ item }: { item: PredictionWithEvidence }) {
  const { prediction } = item;
  const probability = betaToProbability(prediction);
  const tier = getBadgeTier(probability);
  const trend = getRecentTrend(item);

  return (
    <Link
      href={`/predictions/${prediction.id}`}
      className="block rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4 transition-colors hover:border-[var(--border-muted)]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 text-sm font-medium leading-snug text-[var(--text-primary)]">
          {prediction.question}
        </div>
        <div
          className={`whitespace-nowrap rounded-lg px-[10px] py-1 text-lg font-medium ${BADGE_STYLES[tier]}`}
        >
          {formatPercent(probability)}
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2">
        {trend !== 0 && (
          <div
            className={`flex items-center gap-[3px] text-xs ${
              trend > 0 ? "text-[var(--positive-text)]" : "text-[var(--negative-text)]"
            }`}
          >
            {trend > 0 ? (
              <IconArrowUpRight size={13} />
            ) : (
              <IconArrowDownRight size={13} />
            )}
            {formatSignedPercent(trend)} this week
          </div>
        )}
        <div className="rounded-full bg-[var(--bg-page)] px-2 py-[2px] text-[11px] text-[var(--text-muted)]">
          {CATEGORY_LABELS[prediction.category]}
        </div>
      </div>

      <div className="mt-2 h-1 overflow-hidden rounded-full bg-[var(--bg-track)]">
        <div
          className="h-full rounded-full"
          style={{
            width: `${probability}%`,
            backgroundColor: BAR_COLORS[tier],
          }}
        />
      </div>
    </Link>
  );
}
