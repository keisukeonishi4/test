"use client";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

// 絞り込み用（選択で黒地）と選択用（選択で緑地＋✓）の2種類
export function Chip({
  selected,
  onClick,
  tone = "filter",
  children,
}: {
  selected: boolean;
  onClick: () => void;
  tone?: "filter" | "select";
  children: ReactNode;
}) {
  const on = tone === "filter" ? "border-ink bg-ink text-white" : "border-accent bg-accent text-white";
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`inline-flex min-h-11 shrink-0 items-center gap-1 rounded-full border-2 px-4 text-sm transition ${
        selected ? on : "border-strong bg-paper text-ink hover:bg-wash"
      }`}
    >
      {children}
      {selected && tone === "select" && <Icon name="check" className="size-4" />}
    </button>
  );
}

// 表示だけのタグ（産地・旬など）
export function Tag({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "live" | "accent" }) {
  const cls =
    tone === "live"
      ? "border-live text-live font-bold"
      : tone === "accent"
        ? "border-accent text-accent"
        : "border-strong text-ink";
  return <span className={`inline-flex min-h-8 items-center rounded-full border-2 px-3 text-sm ${cls}`}>{children}</span>;
}
