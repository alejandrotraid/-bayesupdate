import type { EvidenceEntry } from "@/types";
import { formatDate, formatSignedPercent } from "@/lib/format";
import { AddEvidenceForm } from "@/components/AddEvidenceForm";

const STRENGTH_LABELS: Record<EvidenceEntry["strength"], string> = {
  weak: "Weak",
  moderate: "Moderate",
  strong: "Strong",
};

const DIRECTION_LABELS: Record<EvidenceEntry["direction"], string> = {
  favorable: "favorable",
  unfavorable: "unfavorable",
  neutral: "neutral",
};

export function EvidenceLog({
  entries,
  predictionId,
  canAddEvidence = true,
}: {
  entries: EvidenceEntry[];
  predictionId: string;
  canAddEvidence?: boolean;
}) {
  return (
    <div className="p-4">
      <div className="mb-[10px] text-[11px] font-medium uppercase tracking-wide text-[#888]">
        Evidence log
      </div>

      {entries.map((entry) => {
        const delta = entry.probabilityAfter - entry.probabilityBefore;
        const isUp = delta > 0;
        return (
          <div key={entry.id} className="mb-3 flex gap-[10px]">
            <div
              className={`mt-[5px] h-2 w-2 flex-shrink-0 rounded-full ${
                delta === 0
                  ? "bg-[#ccc]"
                  : isUp
                    ? "bg-[#1D9E75]"
                    : "bg-[#D85A30]"
              }`}
            />
            <div>
              <div className="text-sm leading-snug text-[#1a1a1a]">
                {entry.description}
              </div>
              <div className="mt-[2px] text-[11px] text-[#888]">
                {formatDate(entry.createdAt)} ·{" "}
                {STRENGTH_LABELS[entry.strength]}{" "}
                {DIRECTION_LABELS[entry.direction]}
              </div>
              {delta !== 0 && (
                <div
                  className={`mt-[2px] text-xs font-medium ${
                    isUp ? "text-[#0F6E56]" : "text-[#993C1D]"
                  }`}
                >
                  {formatSignedPercent(delta)}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {canAddEvidence && <AddEvidenceForm predictionId={predictionId} />}
    </div>
  );
}
