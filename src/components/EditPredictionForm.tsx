"use client";

import { useActionState, useState } from "react";
import { IconPencil } from "@tabler/icons-react";
import {
  updatePrediction,
  type EditPredictionState,
} from "@/app/predictions/[id]/edit-actions";
import { CATEGORY_LABELS } from "@/lib/format";
import type { Prediction } from "@/types";

const INITIAL_STATE: EditPredictionState = { error: null };

const CATEGORIES = Object.keys(CATEGORY_LABELS) as (keyof typeof CATEGORY_LABELS)[];

export function EditPredictionForm({ prediction }: { prediction: Prediction }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(updatePrediction, INITIAL_STATE);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-[12px] text-[var(--text-muted)] hover:text-[var(--accent)]"
      >
        <IconPencil size={13} />
        Edit
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
      <input type="hidden" name="predictionId" value={prediction.id} />

      <div>
        <label className="mb-1 block text-xs text-[var(--text-muted)]">Question</label>
        <textarea
          name="question"
          required
          rows={2}
          defaultValue={prediction.question}
          className="w-full resize-none rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)]"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-[var(--text-muted)]">Category</label>
        <select
          name="category"
          defaultValue={prediction.category}
          className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)]"
        >
          {CATEGORIES.map((key) => (
            <option key={key} value={key}>
              {CATEGORY_LABELS[key]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs text-[var(--text-muted)]">
          Target date (optional)
        </label>
        <input
          type="date"
          name="targetDate"
          defaultValue={prediction.targetDate ?? ""}
          className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)]"
        />
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
          {pending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
