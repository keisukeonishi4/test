import type { Season } from "./types";

export const seasonLabel: Record<Season, string> = {
  spring: "春",
  summer: "夏",
  autumn: "秋",
  winter: "冬",
};

export const difficultyLabel = { easy: "やさしい", normal: "ふつう" } as const;
