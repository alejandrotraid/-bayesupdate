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
      <div className="border-b border-[var(--border)] px-4 pb-[10px] pt-[14px]">
        <div className="text-lg font-medium text-[var(--text-primary)]">Settings</div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="rounded-xl border border-[var(--border)] p-4">
          <div className="text-[11px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
            Account
          </div>
          <div className="mt-2 text-sm text-[var(--text-primary)]">{user?.email}</div>
        </div>

        <Link
          href="/learn"
          className="flex items-center justify-between rounded-xl border border-[var(--border)] p-4"
        >
          <div className="flex items-center gap-2">
            <IconBulb size={18} className="text-[var(--accent)]" />
            <div className="text-sm text-[var(--text-primary)]">
              What is Bayesian thinking?
            </div>
          </div>
          <IconChevronRight size={16} className="text-[var(--text-muted)]" />
        </Link>

        <form action={signOut}>
          <button
            type="submit"
            className="w-full rounded-lg border border-[var(--border-strong)] p-[10px] text-sm text-[var(--negative-text)] hover:bg-[var(--negative-soft)]"
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
