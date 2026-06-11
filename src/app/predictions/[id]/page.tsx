import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { NavBar } from "@/components/NavBar";
import { Timeline } from "@/components/Timeline";
import { EvidenceLog } from "@/components/EvidenceLog";
import { SharePanel } from "@/components/SharePanel";
import { ResolveSection } from "@/components/ResolveSection";
import { getPredictionById } from "@/lib/data/predictions";
import { betaToProbability } from "@/lib/bayes";
import { formatPercent } from "@/lib/format";

export default async function PredictionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getPredictionById(id);

  if (!item) {
    notFound();
  }

  const { prediction, evidence, probabilityHistory } = item;
  const probability = betaToProbability(prediction);

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-[#eee] p-4">
        <Link
          href="/"
          className="mb-[10px] flex items-center gap-1 text-[13px] text-[#888]"
        >
          <IconArrowLeft size={14} />
          Back
        </Link>
        <div className="mb-[10px] text-[15px] font-medium leading-snug text-[#1a1a1a]">
          {prediction.question}
        </div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <div className="text-4xl font-medium text-[#185FA5]">
              {formatPercent(probability)}
            </div>
            <div className="text-[13px] text-[#888]">current probability</div>
          </div>
          <div className="flex-shrink-0">
            <SharePanel shareUrl={`bayesupdate.app/p/${prediction.id}`} />
          </div>
        </div>
      </div>

      <div className="border-b border-[#eee] p-4">
        <div className="mb-[10px] text-[11px] font-medium uppercase tracking-wide text-[#888]">
          Probability over time
        </div>
        <Timeline points={probabilityHistory} />
      </div>

      <ResolveSection prediction={prediction} />

      <EvidenceLog
        entries={evidence}
        predictionId={prediction.id}
        canAddEvidence={prediction.status === "active"}
      />

      <div className="mt-auto">
        <NavBar />
      </div>
    </div>
  );
}
