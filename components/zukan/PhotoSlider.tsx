"use client";
import { useRef, useState } from "react";
import { Illust, type IllustKind } from "@/components/illust/Illust";
import { Icon } from "@/components/ui/Icon";
import type { Vegetable } from "@/lib/types";

const SLIDES: { kind: IllustKind; label: string }[] = [
  { kind: "veg", label: "全体" },
  { kind: "section", label: "断面" },
  { kind: "field", label: "畑" },
  { kind: "dish", label: "料理" },
];

// 写真スライダー（全体・断面・畑・料理）。スワイプか左右の矢印ボタンで切り替え
export function PhotoSlider({ veg }: { veg: Vegetable }) {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  const go = (n: number) => {
    const el = ref.current;
    if (!el) return;
    const next = Math.max(0, Math.min(SLIDES.length - 1, n));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section aria-roledescription="カルーセル" aria-label={`${veg.name}の写真`} className="relative">
      <div
        ref={ref}
        onScroll={(e) => {
          const el = e.currentTarget;
          setI(Math.round(el.scrollLeft / el.clientWidth));
        }}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
      >
        {SLIDES.map((s, n) => (
          <div
            key={s.kind}
            className="w-full shrink-0 snap-center"
            aria-roledescription="スライド"
            aria-label={`${n + 1} / ${SLIDES.length}：${s.label}`}
          >
            <Illust kind={s.kind} veg={veg.art} label={`${veg.name}の${s.label}`} rounded="" className="aspect-[4/3] sm:aspect-[16/9]" />
          </div>
        ))}
      </div>

      <span className="absolute right-3 bottom-3 rounded-full bg-paper/90 px-3 py-1 text-sm" aria-live="polite">
        {i + 1} / {SLIDES.length}
        <span className="sr-only">：{SLIDES[i].label}</span>
      </span>

      {i > 0 && (
        <button
          type="button"
          onClick={() => go(i - 1)}
          aria-label="前の写真"
          className="absolute top-1/2 left-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 shadow"
        >
          <Icon name="back" className="size-5" />
        </button>
      )}
      {i < SLIDES.length - 1 && (
        <button
          type="button"
          onClick={() => go(i + 1)}
          aria-label="次の写真"
          className="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 shadow"
        >
          <Icon name="chevron" className="size-5" />
        </button>
      )}
    </section>
  );
}
