"use client";

import { useActionState, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import {
  logEvidence,
  type LogEvidenceState,
} from "@/app/predictions/[id]/evidence-actions";
import type { EvidenceDirection, EvidenceStrength } from "@/types";

const INITIAL_STATE: LogEvidenceState = { error: null };

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

export function AddEvidenceForm({ predictionId }: { predictionId: string }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(logEvidence, INITIAL_STATE);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-[6px] rounded-lg border border-dashed border-[#ccc] p-[10px] text-sm text-[#888] hover:bg-[#f8f7f2]"
      >
        <IconPlus size={16} />
        Log new evidence
      </button>
    );
  }

  return (
    <form
      action={async (formData) => {
        await action(formData);
        setOpen(false);
      }}
      className="flex flex-col gap-3 rounded-xl border border-[#eee] p-3"
    >
      <input type="hidden" name="predictionId" value={predictionId} />

      <div>
        <label className="mb-1 block text-xs text-[#888]">
          What happened?
        </label>
        <textarea
          name="description"
          required
          rows={2}
          placeholder="Got a second interview at a tech company"
          className="w-full resize-none rounded-lg border border-[#ddd] px-3 py-2 text-sm"
        />
      </div>

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
                defaultChecked={value === "favorable"}
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
                defaultChecked={value === "moderate"}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {state.error && (
        <div className="text-xs text-[#993C1D]">{state.error}</div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex-1 rounded-lg border border-[#ddd] p-[10px] text-sm text-[#666]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={pending}
          className="flex-1 rounded-lg bg-[#185FA5] p-[10px] text-sm font-medium text-white disabled:opacity-60"
        >
          {pending ? "Saving..." : "Log evidence"}
        </button>
      </div>
    </form>
  );
}
