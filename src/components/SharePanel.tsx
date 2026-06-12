"use client";

import { useState } from "react";
import { IconEye, IconEdit, IconLock, IconShare } from "@tabler/icons-react";

const SHARE_OPTIONS = [
  { id: "view", label: "View only", icon: IconEye },
  { id: "contribute", label: "Can contribute", icon: IconEdit },
  { id: "private", label: "Private link", icon: IconLock },
] as const;

export function SharePanel({ shareUrl }: { shareUrl: string }) {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState<(typeof SHARE_OPTIONS)[number]["id"]>(
    "view"
  );
  const [copied, setCopied] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-[5px] rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-[6px] text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-page)]"
      >
        <IconShare size={15} />
        Share
      </button>

      {open && (
        <div className="mt-3 rounded-[10px] border border-[var(--border)] bg-[var(--bg-subtle)] p-3">
          <div className="mb-2 text-xs font-medium text-[var(--text-secondary)]">
            Share this prediction
          </div>
          <div className="flex gap-[6px]">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] px-[10px] py-[6px] text-xs text-[var(--text-secondary)]"
            />
            <button
              onClick={() => {
                navigator.clipboard?.writeText(shareUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="whitespace-nowrap rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] px-[10px] py-[6px] text-xs text-[var(--text-secondary)] hover:bg-[var(--border)]"
            >
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
          <div className="mt-2 flex gap-[6px]">
            {SHARE_OPTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setOption(id)}
                className={`flex flex-1 items-center justify-center gap-1 rounded-md border p-[5px] text-[11px] ${
                  option === id
                    ? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-secondary)]"
                }`}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
