"use client";
// URLクエリと連動するタブ（?tab=xxx）。role=tablist / tab / tabpanel を付ける
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, useRef, type KeyboardEvent, type ReactNode } from "react";

export type TabItem = { id: string; label: ReactNode };

export function useQueryTab(param: string, ids: string[], fallback: string) {
  const sp = useSearchParams();
  const v = sp.get(param);
  return v && ids.includes(v) ? v : fallback;
}

export function Tabs({
  items,
  param = "tab",
  current,
  label,
  children,
  className = "",
}: {
  items: TabItem[];
  param?: string;
  current: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (id: string) => {
    const q = new URLSearchParams(sp.toString());
    q.set(param, id);
    router.replace(`${pathname}?${q.toString()}`, { scroll: false });
  };

  const onKey = (e: KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + items.length) % items.length;
    refs.current[n]?.focus();
    select(items[n].id);
  };

  return (
    <div className={className}>
      <div role="tablist" aria-label={label} className="flex border-b-2 border-line">
        {items.map((t, i) => {
          const on = t.id === current;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${base}-${t.id}`}
              aria-selected={on}
              aria-controls={`${base}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`-mb-0.5 min-h-12 flex-1 border-b-4 px-2 text-base transition ${
                on ? "border-accent font-bold text-ink" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-${current}`}>
        {children}
      </div>
    </div>
  );
}
