import type { VegColor } from "@/lib/types";

// イラストの色は CSS 変数（globals.css の --color-il-*）だけを使う
export const c = (name: string) => `var(--color-il-${name})`;

// 野菜の色 → 本体色・断面の内側の色
export const vegFill: Record<VegColor, { body: string; inner: string }> = {
  red: { body: c("red"), inner: c("root") },
  white: { body: c("root"), inner: c("plate") },
  purple: { body: c("purple"), inner: c("cream") },
  orange: { body: c("orange"), inner: c("yellow") },
  green: { body: c("green"), inner: c("leaf-light") },
  yellow: { body: c("yellow"), inner: c("cream") },
};
