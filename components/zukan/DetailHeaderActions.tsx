"use client";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { toggleIn, useMock } from "@/lib/mock-store";

// 図鑑詳細のヘッダー右：♡（お気に入り）と共有
export function DetailHeaderActions({ vegId, name }: { vegId: string; name: string }) {
  const { state, update } = useMock();
  const fav = state.favorites.includes(vegId);
  const [msg, setMsg] = useState("");

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${name}｜野菜遺産`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setMsg("リンクをコピーしました");
    } catch {
      setMsg("共有できませんでした");
    }
    setTimeout(() => setMsg(""), 2500);
  };

  return (
    <>
      <button
        type="button"
        aria-pressed={fav}
        aria-label={fav ? "お気に入りから外す" : "お気に入りに追加"}
        onClick={() => update((s) => ({ ...s, favorites: toggleIn(s.favorites, vegId) }))}
        className={`flex size-11 items-center justify-center rounded-full hover:bg-wash ${fav ? "text-accent" : ""}`}
      >
        <Icon name="heart" filled={fav} />
      </button>
      <button type="button" aria-label="共有する" onClick={share} className="flex size-11 items-center justify-center rounded-full hover:bg-wash">
        <Icon name="share" />
      </button>
      <span role="status" className={msg ? "fixed top-16 left-1/2 z-40 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm text-white" : "sr-only"}>
        {msg}
      </span>
    </>
  );
}
