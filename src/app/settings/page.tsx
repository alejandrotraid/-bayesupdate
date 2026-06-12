import Link from "next/link";
import { IconBulb, IconChevronRight } from "@tabler/icons-react";
import { NavBar } from "@/components/NavBar";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-[#eee] px-4 pb-[10px] pt-[14px]">
        <div className="text-lg font-medium text-[#1a1a1a]">Settings</div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="rounded-xl border border-[#eee] p-4">
          <div className="text-[11px] font-medium uppercase tracking-wide text-[#888]">
            Account
          </div>
          <div className="mt-2 text-sm text-[#1a1a1a]">{user?.email}</div>
        </div>

        <Link
          href="/learn"
          className="flex items-center justify-between rounded-xl border border-[#eee] p-4"
        >
          <div className="flex items-center gap-2">
            <IconBulb size={18} className="text-[#185FA5]" />
            <div className="text-sm text-[#1a1a1a]">
              What is Bayesian thinking?
            </div>
          </div>
          <IconChevronRight size={16} className="text-[#888]" />
        </Link>

        <form action={signOut}>
          <button
            type="submit"
            className="w-full rounded-lg border border-[#ddd] p-[10px] text-sm text-[#993C1D] hover:bg-[#FAECE7]"
          >
            Sign out
          </button>
        </form>
      </div>

      <div className="mt-auto">
        <NavBar />
      </div>
    </div>
  );
}
