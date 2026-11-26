import type { ReactNode } from "react";
import { BottomTabBar } from "./BottomTabBar";

// 1画面の骨組み。footer: "tabs"=下部タブ / "action"=固定ボタン（中身はページ側で描く） / "none"
export function Screen({
  header,
  footer = "tabs",
  bg = "paper",
  children,
}: {
  header?: ReactNode;
  footer?: "tabs" | "action" | "none";
  bg?: "paper" | "wash";
  children: ReactNode;
}) {
  const pad = footer === "none" ? "pb-8" : "pb-28";
  return (
    <div className={`min-h-dvh ${bg === "wash" ? "bg-wash" : "bg-paper"}`}>
      {header}
      <main id="main" className={pad}>
        {children}
        <p className="mt-10 px-4 text-center text-xs text-muted">
          プロトタイプ表示です。名前・価格・人数などはすべてダミーです。
        </p>
      </main>
      {footer === "tabs" && <BottomTabBar />}
    </div>
  );
}
