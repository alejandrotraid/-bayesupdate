"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconHome,
  IconChartBar,
  IconCheck,
  IconSettings,
} from "@tabler/icons-react";

const ITEMS = [
  { href: "/", label: "Home", icon: IconHome },
  { href: "/insights", label: "Insights", icon: IconChartBar },
  { href: "/resolved", label: "Resolved", icon: IconCheck },
  { href: "/settings", label: "Settings", icon: IconSettings },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <div className="flex border-t border-[#eee] bg-white">
      {ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center gap-[3px] py-[10px] text-[10px] ${
              active ? "text-[#185FA5]" : "text-[#888]"
            }`}
          >
            <Icon size={20} stroke={1.75} />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
