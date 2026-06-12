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
        className="flex w-full items-center justify-center gap-[6px] rounded-lg border border-dashed border-[var(--border-muted)] p-[10px] text-sm text-[var(--text-muted)] hover:bg-[var(--bg-subtle)]"
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
      className="flex flex-col gap-3 rounded-xl border border-[var(--border)] p-3"
    >
      <input type="hidden" name="predictionId" value={predictionId} />

      <div>
        <label className="mb-1 block text-xs text-[var(--text-muted)]">
          What happened?
        </label>
        <textarea
          name="description"
          required
          rows={2}
          placeholder="Got a second interview at a tech company"
          className="w-full resize-none rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)]"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-[var(--text-muted)]">Direction</label>
        <div className="flex gap-2">
          {DIRECTIONS.map(({ value, label }) => (
            <label
              key={value}
              className="flex flex-1 items-center justify-center gap-1 rounded-md border border-[var(--border-strong)] p-[6px] text-[12px] text-[var(--text-secondary)] has-[:checked]:border-[var(--accent-border)] has-[:checked]:bg-[var(--accent-soft)] has-[:checked]:text-[var(--accent)]"
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
        <label className="mb-1 block text-xs text-[var(--text-muted)]">Strength</label>
        <div className="flex gap-2">
          {STRENGTHS.map(({ value, label }) => (
            <label
              key={value}
              className="flex flex-1 items-center justify-center gap-1 rounded-md border border-[var(--border-strong)] p-[6px] text-[12px] text-[var(--text-secondary)] has-[:checked]:border-[var(--accent-border)] has-[:checked]:bg-[var(--accent-soft)] has-[:checked]:text-[var(--accent)]"
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
        <div className="text-xs text-[var(--negative-text)]">{state.error}</div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex-1 rounded-lg border border-[var(--border-strong)] p-[10px] text-sm text-[var(--text-secondary)]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={pending}
          className="flex-1 rounded-lg bg-[var(--accent)] p-[10px] text-sm font-medium text-[var(--accent-contrast)] disabled:opacity-60"
        >
          {pending ? "Saving..." : "Log evidence"}
        </button>
      </div>
    </form>
  );
}
