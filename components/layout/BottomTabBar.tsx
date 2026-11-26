"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/Icon";

const tabs: { href: string; label: string; icon: IconName; match: (p: string) => boolean }[] = [
  { href: "/", label: "ホーム", icon: "home", match: (p) => p === "/" },
  { href: "/live", label: "ライブ", icon: "live", match: (p) => p.startsWith("/live") },
  { href: "/zukan", label: "図鑑", icon: "book", match: (p) => p.startsWith("/zukan") },
  { href: "/community", label: "みんな", icon: "people", match: (p) => p.startsWith("/community") || p.startsWith("/market") },
  { href: "/mypage", label: "マイ", icon: "person", match: (p) => p.startsWith("/mypage") },
];

export function BottomTabBar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="メインメニュー"
      className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-app border-t-2 border-line bg-paper md:border-x-2 pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5">
        {tabs.map((t) => {
          const on = t.match(pathname);
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                aria-current={on ? "page" : undefined}
                className={`flex min-h-16 flex-col items-center justify-center gap-0.5 text-xs ${
                  on ? "font-bold text-accent" : "text-muted hover:text-ink"
                }`}
              >
                <Icon name={t.icon} className="size-7" />
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
