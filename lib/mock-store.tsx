"use client";
// モックの操作状態。sessionStorage に保存（失敗しても動く）
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type MockState = {
  pollVote: string | null; // ライブ投票で選んだ選択肢
  wants: { eat: string[]; grow: string[] }; // 図鑑の「食べたい」「育てたい」
  favorites: string[]; // 図鑑の♡
  coupons: string[]; // 受け取った来店クーポン（store id）
  earnedPoints: number; // このセッションで付与されたポイント（ダミー）
  liked: string[]; // いいねした投稿
  addedToWiki: string[]; // 「まとめに追加」した栽培日記
  myComments: { postId: string; body: string }[]; // 自分が書いたコメント・回答
};

const initial: MockState = {
  pollVote: null,
  wants: { eat: [], grow: [] },
  favorites: [],
  coupons: [],
  earnedPoints: 0,
  liked: [],
  addedToWiki: [],
  myComments: [],
};

const KEY = "yasai-isan-mock";

type Ctx = {
  state: MockState;
  update: (fn: (s: MockState) => MockState) => void;
  reset: () => void;
};

const MockContext = createContext<Ctx | null>(null);

export function MockStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MockState>(initial);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) setState({ ...initial, ...JSON.parse(raw) });
    } catch {
      /* 保存領域が使えない環境でも初期値で動かす */
    }
  }, []);

  const update = useCallback((fn: (s: MockState) => MockState) => {
    setState((prev) => {
      const next = fn(prev);
      try {
        sessionStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* noop */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => update(() => initial), [update]);

  return <MockContext.Provider value={{ state, update, reset }}>{children}</MockContext.Provider>;
}

export function useMock() {
  const ctx = useContext(MockContext);
  if (!ctx) throw new Error("useMock は MockStoreProvider の中で使う");
  return ctx;
}

export const toggleIn = (list: string[], id: string) =>
  list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
