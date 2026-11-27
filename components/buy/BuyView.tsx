"use client";
import { useState } from "react";
import { Segmented, useQueryValue } from "@/components/ui/Segmented";
import { Button, ButtonLink, TextLink } from "@/components/ui/Button";
import { Illust } from "@/components/illust/Illust";
import { Icon } from "@/components/ui/Icon";
import { toggleIn, useMock } from "@/lib/mock-store";
import type { Store, Vegetable } from "@/lib/types";

const MODES = ["store", "ec"] as const;
type Mode = (typeof MODES)[number];

// 販売所のほうが安いことを示すラベル
function Otoku() {
  return (
    <span className="ml-2 inline-block rounded-full bg-accent-wash px-2 py-0.5 text-xs font-bold whitespace-nowrap text-accent">
      おトク
    </span>
  );
}

export const STOCK_NOTE = "※ 在庫状況は表示していません。在庫は店舗へお問い合わせください。";

export function BuyView({ veg, stores }: { veg: Vegetable; stores: Store[] }) {
  const mode = useQueryValue<Mode>("mode", MODES, "store");
  return (
    <div className="space-y-5 px-4 pt-4">
      <div className="flex items-center gap-4">
        <Illust kind="seed" veg={veg.art} label={`${veg.name}の種袋`} className="size-20 shrink-0" />
        <div>
          <h2 className="text-xl font-bold">{veg.name}の種</h2>
          <p className="text-muted">1袋 [粒数]粒・種まき [月]〜[月]</p>
        </div>
      </div>

      <Segmented<Mode>
        param="mode"
        label="買い方"
        current={mode}
        items={[
          { id: "store", label: "近くの販売所（おトク）" },
          { id: "ec", label: "ネットで買う" },
        ]}
      />

      {mode === "store" ? <StoreMode veg={veg} stores={stores} /> : <EcMode veg={veg} />}
    </div>
  );
}

function StoreMode({ veg, stores }: { veg: Vegetable; stores: Store[] }) {
  const [selected, setSelected] = useState(stores[0]?.id);
  return (
    <div className="space-y-4">
      <section aria-labelledby="map-title">
        <h3 id="map-title" className="sr-only">
          取扱店の地図
        </h3>
        <div className="relative">
          <Illust kind="map" label="現在地周辺の取扱店の地図（仮）" className="aspect-[4/3]" />
          <span
            className="absolute flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper"
            style={{ left: "60%", top: "48%" }}
            aria-label="現在地"
            role="img"
          >
            <span className="size-3 rounded-full bg-accent ring-4 ring-accent/25" />
          </span>
          {stores.map((s, i) => {
            const on = s.id === selected;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelected(s.id)}
                aria-pressed={on}
                aria-label={`${i + 1}：${s.name}を選ぶ`}
                className="absolute flex size-11 -translate-x-1/2 -translate-y-full items-end justify-center"
                style={{ left: `${s.mapPos.x}%`, top: `${s.mapPos.y}%` }}
              >
                <span
                  className={`flex size-9 items-center justify-center rounded-full rounded-br-none border-2 border-paper font-bold shadow ${
                    on ? "bg-accent text-white" : "bg-paper text-ink"
                  } rotate-45`}
                >
                  <span className="-rotate-45">{i + 1}</span>
                </span>
              </button>
            );
          })}
          <p className="absolute bottom-2 left-2 rounded-md bg-paper/90 px-2 py-1 text-xs text-muted">
            現在地周辺の取扱店（既存の種販売店）
          </p>
        </div>
      </section>

      <ul className="space-y-3" aria-label="取扱店の一覧（近い順）">
        {stores.map((s, i) => (
          <li key={s.id}>
            <StoreCard store={s} index={i + 1} open={s.id === selected} onSelect={() => setSelected(s.id)} />
          </li>
        ))}
      </ul>

      <p className="text-sm text-muted">{STOCK_NOTE}</p>

      <section aria-labelledby="ec-summary" className="space-y-3 rounded-2xl bg-wash p-4">
        <h3 id="ec-summary" className="font-bold">
          ネットで買うと
        </h3>
        <p className="text-sm">
          ¥[EC価格]・<strong>[ ]pt付与</strong>・購入履歴と栽培日記が自動でつながる・種まき時期に通知
        </p>
        <ButtonLink href={`/buy/${veg.id}?mode=ec`} size="lg" className="w-full">
          ECで購入する
        </ButtonLink>
      </section>
    </div>
  );
}

function StoreCard({ store, index, open, onSelect }: { store: Store; index: number; open: boolean; onSelect: () => void }) {
  const { state, update } = useMock();
  const shown = state.coupons.includes(store.id);
  return (
    <article className={`rounded-2xl border-2 bg-paper ${open ? "border-accent" : "border-line"}`}>
      <button
        type="button"
        onClick={onSelect}
        aria-expanded={open}
        className="flex min-h-14 w-full items-center gap-3 p-4 text-left"
      >
        <span
          className={`flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
            open ? "bg-accent text-white" : "bg-ph"
          }`}
          aria-hidden="true"
        >
          {index}
        </span>
        <span className="flex-1 text-lg font-bold">{store.name}</span>
        <span className="text-sm text-muted">[ ]km・取扱店</span>
      </button>
      {open && (
        <div className="space-y-3 border-t-2 border-line px-4 pt-3 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p>
              店頭価格 <strong className="text-xl">¥[販売所価格]</strong>
              <Otoku />
            </p>
            {store.coupon && (
              <Button
                variant="outline"
                aria-pressed={shown}
                onClick={() => update((s) => ({ ...s, coupons: toggleIn(s.coupons, store.id) }))}
              >
                {shown ? "クーポンを閉じる" : "来店クーポン"}
              </Button>
            )}
          </div>
          <dl className="grid grid-cols-[4.5rem_1fr] gap-y-1 text-sm">
            <dt className="text-muted">住所</dt>
            <dd>{store.address}</dd>
            <dt className="text-muted">営業時間</dt>
            <dd>{store.hours}</dd>
          </dl>
          {store.coupon && shown && (
            <div role="status" className="rounded-xl border-2 border-dashed border-accent bg-accent-wash p-4 text-center">
              <p className="text-sm font-bold text-accent">来店クーポン（モック）</p>
              <p className="mt-1 text-lg font-bold">{store.coupon}</p>
              <p className="mt-2 font-mono text-xl tracking-widest">YS-[コード]</p>
              <p className="mt-2 text-xs text-muted">お会計のときにこの画面を店頭で見せてください</p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

const BENEFITS = [
  { title: "ポイントがたまる", body: "購入で [ ]pt。レシピ投稿のポイントと合わせて使えます。" },
  { title: "購入履歴が残る", body: "いつ・どの品種を買ったかをマイページでふり返れます。" },
  { title: "栽培日記とつながる", body: "買った種がそのまま栽培日記に登録されます。" },
  { title: "種まき時期に通知", body: "まきどきが来たらお知らせします。" },
];

function EcMode({ veg }: { veg: Vegetable }) {
  const [qty, setQty] = useState(1);
  return (
    <div className="space-y-4">
      <section aria-labelledby="ec-price" className="space-y-4 rounded-2xl border-2 border-line p-4">
        <h3 id="ec-price" className="sr-only">
          ネットで買う
        </h3>
        <div className="flex items-end justify-between">
          <p>
            EC価格 <strong className="text-2xl">¥[EC価格]</strong>
            <span className="text-sm text-muted"> / 1袋</span>
          </p>
          <p className="text-sm font-bold text-accent">[ ]pt 付与</p>
        </div>
        <div className="flex items-center justify-between">
          <span id="qty-label" className="font-bold">
            数量
          </span>
          <div className="flex items-center gap-2" role="group" aria-labelledby="qty-label">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1}
              aria-label="1袋減らす"
              className="flex size-11 items-center justify-center rounded-full border-2 border-strong text-xl disabled:opacity-40"
            >
              −
            </button>
            <output aria-live="polite" className="w-10 text-center text-lg font-bold">
              {qty}
            </output>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(9, q + 1))}
              aria-label="1袋増やす"
              className="flex size-11 items-center justify-center rounded-full border-2 border-strong text-xl"
            >
              ＋
            </button>
          </div>
        </div>
        <ButtonLink href={`/buy/${veg.id}/complete`} size="lg" className="w-full">
          購入する（モック）
        </ButtonLink>
        <p className="text-center text-xs text-muted">実際の決済は行われません</p>
      </section>

      <section aria-labelledby="ec-benefits">
        <h3 id="ec-benefits" className="mb-2 font-bold">
          ネットで買うメリット
        </h3>
        <ul className="space-y-2">
          {BENEFITS.map((b) => (
            <li key={b.title} className="flex gap-3 rounded-xl bg-wash p-3">
              <Icon name="check" className="mt-0.5 size-5 shrink-0 text-accent" />
              <span>
                <span className="block font-bold">{b.title}</span>
                <span className="block text-sm text-muted">{b.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="rounded-2xl border-2 border-line p-4">
        <p className="text-sm">
          近くの販売所なら店頭価格 <strong>¥[販売所価格]</strong> で
          <Otoku />
        </p>
        <TextLink href={`/buy/${veg.id}?mode=store`}>近くの取扱店を探す</TextLink>
      </div>
    </div>
  );
}
