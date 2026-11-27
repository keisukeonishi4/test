"use client";
// 2〜3択の切り替え（URLクエリと連動）。見た目はワイヤーの「近くの販売所／ネットで買う」
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQueryValue<T extends string>(param: string, ids: readonly T[], fallback: T): T {
  const v = useSearchParams().get(param);
  return (v && (ids as readonly string[]).includes(v) ? v : fallback) as T;
}

export function Segmented<T extends string>({
  param,
  items,
  current,
  label,
}: {
  param: string;
  items: { id: T; label: string }[];
  current: T;
  label: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  return (
    <div role="radiogroup" aria-label={label} className="flex gap-1 rounded-2xl bg-ph p-1">
      {items.map((it) => {
        const on = it.id === current;
        return (
          <button
            key={it.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => {
              const q = new URLSearchParams(sp.toString());
              q.set(param, it.id);
              router.replace(`${pathname}?${q.toString()}`, { scroll: false });
            }}
            className={`min-h-12 flex-1 rounded-xl px-1 text-sm whitespace-nowrap transition sm:text-base ${
              on ? "bg-paper font-bold shadow-sm" : "text-muted hover:text-ink"
            }`}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
