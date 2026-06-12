import Link from "next/link";
import { IconCheck, IconX } from "@tabler/icons-react";
import type { PredictionWithEvidence } from "@/lib/data/predictions";
import { CATEGORY_LABELS, formatDate, formatPercent } from "@/lib/format";
import { betaToProbability } from "@/lib/bayes";

export function ResolvedPredictionCard({
  item,
}: {
  item: PredictionWithEvidence;
}) {
  const { prediction } = item;
  const probability = betaToProbability(prediction);
  const happened = prediction.status === "resolved_true";
  const wellCalibrated = happened ? probability >= 50 : probability < 50;

  return (
    <Link
      href={`/predictions/${prediction.id}`}
      className="block rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4 transition-colors hover:border-[var(--border-muted)]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 text-sm font-medium leading-snug text-[var(--text-primary)]">
          {prediction.question}
        </div>
        <div className="whitespace-nowrap rounded-lg bg-[var(--bg-page)] px-[10px] py-1 text-lg font-medium text-[var(--text-muted)]">
          {formatPercent(probability)}
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <div
          className={`flex items-center gap-1 rounded-full px-2 py-[2px] text-[11px] ${
            wellCalibrated
              ? "bg-[var(--positive-soft)] text-[var(--positive-text)]"
              : "bg-[var(--negative-soft)] text-[var(--negative-text)]"
          }`}
        >
          {happened ? <IconCheck size={12} /> : <IconX size={12} />}
          {happened ? "Happened" : "Didn't happen"}
        </div>
        <div className="rounded-full bg-[var(--bg-page)] px-2 py-[2px] text-[11px] text-[var(--text-muted)]">
          {CATEGORY_LABELS[prediction.category]}
        </div>
        {prediction.resolvedAt && (
          <div className="text-[11px] text-[var(--text-muted)]">
            {formatDate(prediction.resolvedAt)}
          </div>
        )}
      </div>
    </Link>
  );
}
