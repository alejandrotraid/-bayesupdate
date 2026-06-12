import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { NavBar } from "@/components/NavBar";

export default function LearnPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-[#eee] px-4 pb-[10px] pt-[14px]">
        <Link
          href="/settings"
          className="mb-[10px] flex items-center gap-1 text-[13px] text-[#888]"
        >
          <IconArrowLeft size={14} />
          Back
        </Link>
        <div className="text-lg font-medium text-[#1a1a1a]">
          What is Bayesian thinking?
        </div>
        <div className="mt-1 text-[13px] text-[#888]">
          The idea behind this app, explained simply.
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-4 text-sm leading-relaxed text-[#1a1a1a]">
        <section>
          <h2 className="mb-2 text-[11px] font-medium uppercase tracking-wide text-[#888]">
            The big idea
          </h2>
          <p>
            Bayesian thinking is just a structured way of doing something you
            already do every day: <strong>holding a belief, then updating it
            when you learn something new.</strong>
          </p>
          <p className="mt-2">
            Instead of treating your opinion as fixed or as &ldquo;all or
            nothing,&rdquo; you treat it as a probability — a number between
            0% and 100% — and you let new evidence nudge that number up or
            down. Strong evidence moves it a lot. Weak or mixed evidence moves
            it a little.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[11px] font-medium uppercase tracking-wide text-[#888]">
            The formula
          </h2>
          <p>At its heart, Bayes&apos; theorem looks like this:</p>
          <div className="my-3 rounded-xl border border-[#eee] bg-[#f8f7f2] p-4 text-center font-mono text-[15px] text-[#185FA5]">
            P(H | E) = P(E | H) · P(H) / P(E)
          </div>
          <p>In plain language:</p>
          <ul className="mt-2 flex flex-col gap-2">
            <li className="flex gap-2">
              <span className="font-mono text-[#185FA5]">P(H)</span>
              <span>
                — your <strong>prior</strong>: how likely you thought the
                belief (H) was <em>before</em> the new evidence.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-[#185FA5]">P(E | H)</span>
              <span>
                — how likely this evidence (E) would be <em>if</em> the
                belief were true.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-[#185FA5]">P(E)</span>
              <span>
                — how likely the evidence is overall, across every way it
                could happen.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-[#185FA5]">P(H | E)</span>
              <span>
                — your <strong>posterior</strong>: your updated belief
                <em>after</em> seeing the evidence.
              </span>
            </li>
          </ul>
          <p className="mt-2">
            You don&apos;t need to calculate this by hand — the point is the
            shape of the idea:
          </p>
          <div className="my-3 rounded-xl border border-[#eee] bg-[#f8f7f2] p-4 text-center font-mono text-[14px] text-[#185FA5]">
            new belief = old belief × how well the evidence fits
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-[11px] font-medium uppercase tracking-wide text-[#888]">
            An everyday example
          </h2>
          <p>
            Imagine you think there&apos;s a <strong>30%</strong> chance it
            will rain tomorrow (your prior). Then you check the forecast and
            see a storm warning for your area.
          </p>
          <p className="mt-2">
            Storm warnings are usually accurate, so seeing one makes rain much
            more likely than your original 30% guess. Bayesian thinking says:
            don&apos;t throw away your prior belief, but don&apos;t ignore the
            new evidence either — <strong>combine them</strong>. Your updated
            estimate might land around 80%.
          </p>
          <p className="mt-2">
            If instead you&apos;d seen a much weaker signal — say, one cloud
            in the sky — your estimate might only move from 30% to 35%. The
            size of the update depends on how strong and how relevant the
            evidence is.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[11px] font-medium uppercase tracking-wide text-[#888]">
            How BayesUpdate applies this
          </h2>
          <p>
            Every prediction you track starts with a <strong>prior</strong> —
            the initial probability you set when you create it. Behind the
            scenes, this app represents that belief as a{" "}
            <span className="font-mono">Beta distribution</span>, a standard
            tool for modeling &ldquo;how confident am I, and how much room is
            there to change my mind?&rdquo;
          </p>
          <p className="mt-2">
            Each time you log a piece of evidence, you describe:
          </p>
          <ul className="mt-2 flex flex-col gap-2">
            <li className="flex gap-2">
              <span className="font-mono text-[#185FA5]">Direction</span>
              <span>
                — does this evidence make the outcome more likely
                (favorable), less likely (unfavorable), or doesn&apos;t move
                the needle (neutral)?
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-[#185FA5]">Strength</span>
              <span>
                — how big a deal is this evidence: weak, moderate, or strong?
              </span>
            </li>
          </ul>
          <p className="mt-2">
            The app then nudges your probability up or down by an amount
            proportional to that strength — exactly like the storm-warning
            example above. Weak evidence shifts the number slightly; strong
            evidence shifts it a lot. Over time, the probability traces a
            history you can look back on, showing how your belief evolved as
            evidence came in.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[11px] font-medium uppercase tracking-wide text-[#888]">
            Why this is useful day to day
          </h2>
          <ul className="flex flex-col gap-2">
            <li>
              <strong>It keeps you honest.</strong> Writing down a number
              forces you to be specific instead of vaguely &ldquo;hopeful&rdquo;
              or &ldquo;worried.&rdquo;
            </li>
            <li>
              <strong>It fights overreaction.</strong> One good or bad day
              shouldn&apos;t swing your belief from 10% to 90% — Bayesian
              updating keeps changes proportional to the evidence.
            </li>
            <li>
              <strong>It builds a track record.</strong> Looking back at how
              your probability moved (and what eventually happened) helps you
              calibrate — are you usually too optimistic? Too pessimistic?
            </li>
            <li>
              <strong>It separates belief from outcome.</strong> You can be
              well-calibrated (your 70% predictions come true about 70% of the
              time) even when any single prediction doesn&apos;t go your way.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-[11px] font-medium uppercase tracking-wide text-[#888]">
            In short
          </h2>
          <p>
            Bayesian thinking is a simple loop: <strong>start with a belief,
            gather evidence, update proportionally, repeat.</strong>{" "}
            BayesUpdate just gives that loop a home — so your beliefs about
            your job search, health goals, finances, or anything else stay
            grounded in the evidence you&apos;re actually collecting.
          </p>
        </section>
      </div>

      <div className="mt-auto">
        <NavBar />
      </div>
    </div>
  );
}
