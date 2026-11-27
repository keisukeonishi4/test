// 表示用の書式（数値はすべてダミー）
import { seasonLabel } from "./labels";
import type { Season, Vegetable } from "./types";

export const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;
export const months = ([a, b]: [number, number]) => `${a}月〜${b}月`;
export const seasons = (s: Season[]) => s.map((x) => seasonLabel[x]).join("・");
export const rarityLabel = (r: Vegetable["rarity"]) => ({ 1: "低", 2: "中", 3: "高" })[r];
export const pct = (v: number, max: number) => Math.round((v / max) * 100);

// ポイント（ダミー）
export const POINTS = { recipe: 50, recipePick: 300 } as const;
