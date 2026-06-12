"use client";

import { useActionState, useState } from "react";
import { createPrediction, type CreatePredictionState } from "./actions";
import { CATEGORY_LABELS } from "@/lib/format";

const INITIAL_STATE: CreatePredictionState = { error: null };

const CATEGORIES = Object.keys(CATEGORY_LABELS) as (keyof typeof CATEGORY_LABELS)[];

export function NewPredictionForm() {
  const [state, action, pending] = useActionState(
    createPrediction,
    INITIAL_STATE
  );
  const [prior, setPrior] = useState(50);

  return (
    <form action={action} className="flex flex-col gap-4 p-4">
      <div>
        <label className="mb-1 block text-xs text-[var(--text-muted)]">Question</label>
        <textarea
          name="question"
          required
          rows={2}
          placeholder="Will I land a PM job in the next 6 months?"
          className="w-full resize-none rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)]"
        />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="text-xs text-[var(--text-muted)]">Initial probability</label>
          <span className="text-sm font-medium text-[var(--accent)]">{prior}%</span>
        </div>
        <input
          type="range"
          name="prior"
          min={0}
          max={100}
          value={prior}
          onChange={(e) => setPrior(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-[var(--text-muted)]">Category</label>
        <select
          name="category"
          defaultValue="other"
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
          className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)]"
        />
      </div>

      {state.error && (
        <div className="text-xs text-[var(--negative-text)]">{state.error}</div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-medium text-[var(--accent-contrast)] disabled:opacity-60"
      >
        {pending ? "Creating..." : "Create prediction"}
      </button>
    </form>
  );
}
