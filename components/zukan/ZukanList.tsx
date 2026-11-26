"use client";
import { useMemo, useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { VegCard } from "@/components/veg/VegCard";
import { seasonLabel } from "@/lib/labels";
import type { Season, Vegetable } from "@/lib/types";

const SEASONS: Season[] = ["spring", "summer", "autumn", "winter"];

// 図鑑一覧（ワイヤーなし・想定）：名前で探す＋地域・旬で絞り込む
export function ZukanList({ vegetables }: { vegetables: Vegetable[] }) {
  const regions = useMemo(() => [...new Set(vegetables.map((v) => v.region))].sort(), [vegetables]);
  const [q, setQ] = useState("");
  const [region, setRegion] = useState<string | null>(null);
  const [season, setSeason] = useState<Season | null>(null);

  const list = vegetables.filter(
    (v) =>
      (!q || v.name.includes(q) || v.furigana.includes(q)) &&
      (!region || v.region === region) &&
      (!season || v.seasons.includes(season)),
  );

  return (
    <div className="space-y-5 px-4 pt-4">
      <p className="text-muted">
        形も色も物語もちがう、いろんな伝統野菜と出会えます。気になる野菜の個性をのぞいて、育て比べ・食べ比べを楽しもう。
      </p>

      <div>
        <label htmlFor="zukan-q" className="mb-1 block text-sm font-bold">
          野菜の名前で探す
        </label>
        <input
          id="zukan-q"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="例：[野菜名A]"
          className="min-h-12 w-full rounded-xl border-2 border-strong bg-paper px-4 placeholder:text-muted"
        />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-bold">地域</legend>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          <Chip selected={region === null} onClick={() => setRegion(null)}>
            すべて
          </Chip>
          {regions.map((r) => (
            <Chip key={r} selected={region === r} onClick={() => setRegion(region === r ? null : r)}>
              {r}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-bold">旬</legend>
        <div className="flex flex-wrap gap-2">
          <Chip selected={season === null} onClick={() => setSeason(null)}>
            すべて
          </Chip>
          {SEASONS.map((s) => (
            <Chip key={s} selected={season === s} onClick={() => setSeason(season === s ? null : s)}>
              {seasonLabel[s]}
            </Chip>
          ))}
        </div>
      </fieldset>

      <p className="text-sm text-muted" aria-live="polite">
        {list.length}品種と出会えます
      </p>

      {list.length > 0 ? (
        <ul className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3">
          {list.map((v) => (
            <li key={v.id}>
              <VegCard veg={v} sub={`産地 ${v.region}・旬 ${v.seasons.map((s) => seasonLabel[s]).join("・")}`} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl bg-wash p-6 text-center">
          <p className="font-bold">条件に合う野菜が見つかりませんでした</p>
          <button
            type="button"
            onClick={() => {
              setQ("");
              setRegion(null);
              setSeason(null);
            }}
            className="mt-3 min-h-11 text-accent underline underline-offset-4"
          >
            条件をリセットする
          </button>
        </div>
      )}
    </div>
  );
}
