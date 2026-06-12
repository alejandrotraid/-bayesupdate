import { NavBar } from "@/components/NavBar";
import { ResolvedPredictionCard } from "@/components/ResolvedPredictionCard";
import { getResolvedPredictions } from "@/lib/data/predictions";

export default async function ResolvedPage() {
  const predictions = await getResolvedPredictions();

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-[var(--border)] px-4 pb-[10px] pt-[14px]">
        <div className="text-lg font-medium text-[var(--text-primary)]">Resolved</div>
        <div className="mt-[1px] text-xs text-[var(--text-muted)]">
          {predictions.length} resolved predictions
        </div>
      </div>

      <div className="flex flex-col gap-2 p-3">
        {predictions.length === 0 ? (
          <div className="p-4 text-center text-sm text-[var(--text-muted)]">
            No resolved predictions yet.
          </div>
        ) : (
          predictions.map((item) => (
            <ResolvedPredictionCard key={item.prediction.id} item={item} />
          ))
        )}
      </div>

      <div className="mt-auto">
        <NavBar />
      </div>
    </div>
  );
}
