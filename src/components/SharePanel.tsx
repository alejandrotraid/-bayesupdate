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
        className="flex items-center gap-[5px] rounded-lg border border-[#ddd] bg-white px-3 py-[6px] text-xs text-[#444] hover:bg-[#f3f2ed]"
      >
        <IconShare size={15} />
        Share
      </button>

      {open && (
        <div className="mt-3 rounded-[10px] border border-[#e8e7e0] bg-[#f8f7f2] p-3">
          <div className="mb-2 text-xs font-medium text-[#444]">
            Share this prediction
          </div>
          <div className="flex gap-[6px]">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 rounded-md border border-[#ddd] bg-white px-[10px] py-[6px] text-xs text-[#444]"
            />
            <button
              onClick={() => {
                navigator.clipboard?.writeText(shareUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="whitespace-nowrap rounded-md border border-[#ddd] bg-white px-[10px] py-[6px] text-xs text-[#444] hover:bg-[#eee]"
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
                    ? "border-[#b3cfe8] bg-[#E6F1FB] text-[#185FA5]"
                    : "border-[#ddd] bg-white text-[#555]"
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
