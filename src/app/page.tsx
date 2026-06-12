import Link from "next/link";
import { IconBell, IconPlus } from "@tabler/icons-react";
import { PredictionCard } from "@/components/PredictionCard";
import { NavBar } from "@/components/NavBar";
import { getAllPredictions } from "@/lib/data/predictions";

export default async function Home() {
  const predictions = await getAllPredictions();

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 pb-[10px] pt-[14px]">
        <div>
          <div className="text-lg font-medium text-[var(--text-primary)]">BayesUpdate</div>
          <div className="mt-[1px] text-xs text-[var(--text-muted)]">
            {predictions.length} active predictions
          </div>
        </div>
        <IconBell size={20} className="text-[var(--text-muted)]" />
      </div>

      <div className="flex flex-col gap-2 p-3">
        {predictions.map((item) => (
          <PredictionCard key={item.prediction.id} item={item} />
        ))}
      </div>

      <Link
        href="/predictions/new"
        className="mx-3 mb-[14px] flex items-center justify-center gap-[6px] rounded-lg border border-dashed border-[var(--border-muted)] p-[10px] text-sm text-[var(--text-muted)] hover:bg-[var(--bg-subtle)]"
      >
        <IconPlus size={16} />
        New prediction
      </Link>

      <div className="mt-auto">
        <NavBar />
      </div>
    </div>
  );
}
