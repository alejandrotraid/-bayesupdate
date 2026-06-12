import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { NewPredictionForm } from "./new-prediction-form";

export default function NewPredictionPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-[var(--border)] p-4">
        <Link
          href="/"
          className="mb-[10px] flex items-center gap-1 text-[13px] text-[var(--text-muted)]"
        >
          <IconArrowLeft size={14} />
          Back
        </Link>
        <div className="text-[15px] font-medium text-[var(--text-primary)]">
          New prediction
        </div>
      </div>

      <NewPredictionForm />
    </div>
  );
}
