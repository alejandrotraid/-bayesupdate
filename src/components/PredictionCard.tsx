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
      className="block rounded-xl border border-[#eee] bg-white p-4 transition-colors hover:border-[#ccc]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 text-sm font-medium leading-snug text-[#1a1a1a]">
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
              trend > 0 ? "text-[#0F6E56]" : "text-[#993C1D]"
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
        <div className="rounded-full bg-[#f3f2ed] px-2 py-[2px] text-[11px] text-[#888]">
          {CATEGORY_LABELS[prediction.category]}
        </div>
      </div>

      <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#f0efea]">
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
