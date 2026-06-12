"use client";

import { useActionState, useState } from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import {
  updateEvidence,
  deleteEvidence,
  type EditEvidenceState,
  type DeleteEvidenceState,
} from "@/app/predictions/[id]/edit-actions";
import { formatDate, formatSignedPercent } from "@/lib/format";
import type { EvidenceEntry, EvidenceDirection, EvidenceStrength } from "@/types";

const STRENGTH_LABELS: Record<EvidenceStrength, string> = {
  weak: "Weak",
  moderate: "Moderate",
  strong: "Strong",
};

const DIRECTION_LABELS: Record<EvidenceDirection, string> = {
  favorable: "favorable",
  unfavorable: "unfavorable",
  neutral: "neutral",
};

const DIRECTIONS: { value: EvidenceDirection; label: string }[] = [
  { value: "favorable", label: "Favorable" },
  { value: "neutral", label: "Neutral" },
  { value: "unfavorable", label: "Unfavorable" },
];

const STRENGTHS: { value: EvidenceStrength; label: string }[] = [
  { value: "weak", label: "Weak" },
  { value: "moderate", label: "Moderate" },
  { value: "strong", label: "Strong" },
];

const EDIT_INITIAL_STATE: EditEvidenceState = { error: null };
const DELETE_INITIAL_STATE: DeleteEvidenceState = { error: null };

export function EvidenceEntryItem({
  entry,
  predictionId,
  isLatest,
  canEdit,
}: {
  entry: EvidenceEntry;
  predictionId: string;
  isLatest: boolean;
  canEdit: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [editState, editAction, editPending] = useActionState(
    updateEvidence,
    EDIT_INITIAL_STATE
  );
  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteEvidence,
    DELETE_INITIAL_STATE
  );

  const delta = entry.probabilityAfter - entry.probabilityBefore;
  const isUp = delta > 0;

  if (!open) {
    return (
      <div className="mb-3 flex gap-[10px]">
        <div
          className={`mt-[5px] h-2 w-2 flex-shrink-0 rounded-full ${
            delta === 0
              ? "bg-[#ccc]"
              : isUp
                ? "bg-[#1D9E75]"
                : "bg-[#D85A30]"
          }`}
        />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="text-sm leading-snug text-[#1a1a1a]">
              {entry.description}
            </div>
            {canEdit && (
              <button
                onClick={() => setOpen(true)}
                className="mt-[2px] flex-shrink-0 text-[#888] hover:text-[#185FA5]"
                aria-label="Edit evidence"
              >
                <IconPencil size={13} />
              </button>
            )}
          </div>
          <div className="mt-[2px] text-[11px] text-[#888]">
            {formatDate(entry.createdAt)} · {STRENGTH_LABELS[entry.strength]}{" "}
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
  }

  return (
    <form
      action={async (formData) => {
        await editAction(formData);
        setOpen(false);
      }}
      className="mb-3 flex flex-col gap-3 rounded-xl border border-[#eee] p-3"
    >
      <input type="hidden" name="evidenceId" value={entry.id} />
      <input type="hidden" name="predictionId" value={predictionId} />
      <input type="hidden" name="isLatest" value={isLatest ? "true" : "false"} />

      <div>
        <label className="mb-1 block text-xs text-[#888]">
          What happened?
        </label>
        <textarea
          name="description"
          required
          rows={2}
          defaultValue={entry.description}
          className="w-full resize-none rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm text-[#1a1a1a]"
        />
      </div>

      {isLatest && (
        <>
          <div>
            <label className="mb-1 block text-xs text-[#888]">Direction</label>
            <div className="flex gap-2">
              {DIRECTIONS.map(({ value, label }) => (
                <label
                  key={value}
                  className="flex flex-1 items-center justify-center gap-1 rounded-md border border-[#ddd] p-[6px] text-[12px] text-[#555] has-[:checked]:border-[#b3cfe8] has-[:checked]:bg-[#E6F1FB] has-[:checked]:text-[#185FA5]"
                >
                  <input
                    type="radio"
                    name="direction"
                    value={value}
                    defaultChecked={value === entry.direction}
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs text-[#888]">Strength</label>
            <div className="flex gap-2">
              {STRENGTHS.map(({ value, label }) => (
                <label
                  key={value}
                  className="flex flex-1 items-center justify-center gap-1 rounded-md border border-[#ddd] p-[6px] text-[12px] text-[#555] has-[:checked]:border-[#b3cfe8] has-[:checked]:bg-[#E6F1FB] has-[:checked]:text-[#185FA5]"
                >
                  <input
                    type="radio"
                    name="strength"
                    value={value}
                    defaultChecked={value === entry.strength}
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {(editState.error || deleteState.error) && (
        <div className="text-xs text-[#993C1D]">
          {editState.error ?? deleteState.error}
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex-1 rounded-lg border border-[#ddd] p-[10px] text-sm text-[#666]"
        >
          Cancel
        </button>
        {isLatest && (
          <button
            type="button"
            disabled={deletePending}
            onClick={async () => {
              const formData = new FormData();
              formData.set("evidenceId", entry.id);
              formData.set("predictionId", predictionId);
              await deleteAction(formData);
              setOpen(false);
            }}
            className="flex items-center justify-center gap-1 rounded-lg border border-[#ddd] p-[10px] text-sm text-[#993C1D] disabled:opacity-60"
          >
            <IconTrash size={14} />
            {deletePending ? "Deleting..." : "Delete"}
          </button>
        )}
        <button
          type="submit"
          disabled={editPending}
          className="flex-1 rounded-lg bg-[#185FA5] p-[10px] text-sm font-medium text-white disabled:opacity-60"
        >
          {editPending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
