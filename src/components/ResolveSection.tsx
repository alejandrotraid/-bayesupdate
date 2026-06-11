import { IconCheck, IconX, IconRotateClockwise } from "@tabler/icons-react";
import {
  resolvePrediction,
  reopenPrediction,
} from "@/app/predictions/[id]/resolve-actions";
import { formatDate } from "@/lib/format";
import type { Prediction } from "@/types";

export function ResolveSection({ prediction }: { prediction: Prediction }) {
  if (prediction.status === "active") {
    return (
      <div className="border-b border-[#eee] p-4">
        <div className="mb-[10px] text-[11px] font-medium uppercase tracking-wide text-[#888]">
          Resolve this prediction
        </div>
        <div className="flex gap-2">
          <form action={resolvePrediction} className="flex-1">
            <input type="hidden" name="predictionId" value={prediction.id} />
            <input type="hidden" name="outcome" value="resolved_true" />
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-1 rounded-lg border border-[#ddd] py-2 text-sm text-[#0F6E56] hover:bg-[#E1F5EE]"
            >
              <IconCheck size={16} />
              Happened
            </button>
          </form>
          <form action={resolvePrediction} className="flex-1">
            <input type="hidden" name="predictionId" value={prediction.id} />
            <input type="hidden" name="outcome" value="resolved_false" />
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-1 rounded-lg border border-[#ddd] py-2 text-sm text-[#993C1D] hover:bg-[#FAECE7]"
            >
              <IconX size={16} />
              Didn&apos;t happen
            </button>
          </form>
        </div>
      </div>
    );
  }

  const outcomeLabel =
    prediction.status === "resolved_true" ? "Happened" : "Didn't happen";

  return (
    <div className="border-b border-[#eee] p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-[#1a1a1a]">
          Resolved: <span className="font-medium">{outcomeLabel}</span>
          {prediction.resolvedAt && (
            <span className="text-[#888]">
              {" "}
              on {formatDate(prediction.resolvedAt)}
            </span>
          )}
        </div>
        <form action={reopenPrediction}>
          <input type="hidden" name="predictionId" value={prediction.id} />
          <button
            type="submit"
            className="flex items-center gap-1 text-[13px] text-[#888] hover:text-[#1a1a1a]"
          >
            <IconRotateClockwise size={14} />
            Reopen
          </button>
        </form>
      </div>
    </div>
  );
}
