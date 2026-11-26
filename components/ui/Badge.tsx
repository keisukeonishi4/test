import type { ReactNode } from "react";

// 赤茶のバッジ。ライブ・絶滅危惧度・質問ラベルだけに使う（CLAUDE.md）
export function LiveBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-live px-2.5 py-1 text-sm font-bold text-white">
      {children}
    </span>
  );
}

export function ProducerBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-accent-wash px-2 py-0.5 text-xs font-bold text-accent">
      生産者バッジ
    </span>
  );
}
