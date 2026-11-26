import type { ReactNode } from "react";

// 画面下に固定するボタンの帯（詳細・フォームの画面）
export function StickyActionBar({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-app border-t-2 border-line bg-paper px-4 md:border-x-2 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="flex gap-3">{children}</div>
    </div>
  );
}
