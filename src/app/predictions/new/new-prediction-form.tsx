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
        <label className="mb-1 block text-xs text-[#888]">Question</label>
        <textarea
          name="question"
          required
          rows={2}
          placeholder="Will I land a PM job in the next 6 months?"
          className="w-full resize-none rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm text-[#1a1a1a]"
        />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="text-xs text-[#888]">Initial probability</label>
          <span className="text-sm font-medium text-[#185FA5]">{prior}%</span>
        </div>
        <input
          type="range"
          name="prior"
          min={0}
          max={100}
          value={prior}
          onChange={(e) => setPrior(Number(e.target.value))}
          className="w-full accent-[#185FA5]"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-[#888]">Category</label>
        <select
          name="category"
          defaultValue="other"
          className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm text-[#1a1a1a]"
        >
          {CATEGORIES.map((key) => (
            <option key={key} value={key}>
              {CATEGORY_LABELS[key]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs text-[#888]">
          Target date (optional)
        </label>
        <input
          type="date"
          name="targetDate"
          className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm text-[#1a1a1a]"
        />
      </div>

      {state.error && (
        <div className="text-xs text-[#993C1D]">{state.error}</div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-[#185FA5] px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {pending ? "Creating..." : "Create prediction"}
      </button>
    </form>
  );
}
