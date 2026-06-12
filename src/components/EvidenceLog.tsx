import type { EvidenceEntry } from "@/types";
import { AddEvidenceForm } from "@/components/AddEvidenceForm";
import { EvidenceEntryItem } from "@/components/EvidenceEntryItem";

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

      {entries.map((entry, index) => (
        <EvidenceEntryItem
          key={entry.id}
          entry={entry}
          predictionId={predictionId}
          isLatest={index === 0}
          canEdit={canAddEvidence}
        />
      ))}

      {canAddEvidence && <AddEvidenceForm predictionId={predictionId} />}
    </div>
  );
}
