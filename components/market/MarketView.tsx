"use client";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ProducerBadge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Illust } from "@/components/illust/Illust";
import { yen } from "@/lib/format";
import type { ChefShop, Listing, Vegetable } from "@/lib/types";

export function MarketView({
  listings,
  chefShops,
  vegetables,
  feeRate,
}: {
  listings: Listing[];
  chefShops: ChefShop[];
  vegetables: Vegetable[];
  feeRate: number;
}) {
  const initialVeg = useSearchParams().get("veg");
  const [nearFirst, setNearFirst] = useState(true);
  const [vegFilter, setVegFilter] = useState<string | null>(
    initialVeg && vegetables.some((v) => v.id === initialVeg) ? initialVeg : null,
  );
  const [showVegs, setShowVegs] = useState(!!vegFilter);
  const [ship, setShip] = useState(false);
  const [handoff, setHandoff] = useState(false);
  const vegOf = (id: string) => vegetables.find((v) => v.id === id);

  let list = listings.filter(
    (l) => (!vegFilter || l.vegetableId === vegFilter) && (!ship || l.delivery.ship) && (!handoff || l.delivery.handoffArea),
  );
  if (nearFirst) list = [...list].sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <div className="space-y-4 px-4 pt-4 pb-16">
      <p>育てた人から、食べたい人へ。栽培日記つきの野菜だから、誰がどう育てたかが見える。</p>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1" role="group" aria-label="並び替えと絞り込み">
        <Chip selected={nearFirst} onClick={() => setNearFirst((v) => !v)}>
          近い順
        </Chip>
        <Chip selected={showVegs || !!vegFilter} onClick={() => setShowVegs((v) => !v)}>
          {vegFilter ? `${vegOf(vegFilter)?.name}` : "野菜で絞る"}
        </Chip>
        <Chip selected={ship} onClick={() => setShip((v) => !v)}>
          発送OK
        </Chip>
        <Chip selected={handoff} onClick={() => setHandoff((v) => !v)}>
          手渡し
        </Chip>
      </div>

      {showVegs && (
        <fieldset className="rounded-2xl bg-wash p-3">
          <legend className="sr-only">野菜で絞る</legend>
          <div className="flex flex-wrap gap-2">
            <Chip tone="select" selected={!vegFilter} onClick={() => setVegFilter(null)}>
              すべて
            </Chip>
            {vegetables.map((v) => (
              <Chip key={v.id} tone="select" selected={vegFilter === v.id} onClick={() => setVegFilter(v.id)}>
                {v.name}
              </Chip>
            ))}
          </div>
        </fieldset>
      )}

      <p className="text-sm text-muted" aria-live="polite">
        {list.length}件の出品
      </p>

      <ul className="space-y-3">
        {list.map((l) => {
          const veg = vegOf(l.vegetableId);
          return (
            <li key={l.id}>
              <article className="flex gap-4 rounded-2xl border-2 border-line p-3">
                <Illust kind="market" veg={veg?.art} label={`${veg?.name}の収穫写真`} className="aspect-square w-28 shrink-0 sm:w-36" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="text-lg font-bold">
                    {veg?.name} {l.amount}
                  </h3>
                  <p className="flex flex-wrap items-center gap-x-2 text-sm text-muted">
                    {l.seller}
                    {l.sellerType === "producer" ? <ProducerBadge /> : <span>・栽培日記 {l.diaryCount}件</span>}
                  </p>
                  <p className="text-sm text-muted">
                    {[l.delivery.ship && "発送", l.delivery.handoffArea && `${l.delivery.handoffArea}で手渡し`].filter(Boolean).join(" ／ ")}
                    ・{l.distanceKm}km
                  </p>
                  <div className="mt-auto flex items-end justify-between pt-2">
                    <strong className="text-xl">{yen(l.price)}</strong>
                    <ButtonLink href={`/market/complete?item=${l.id}`} size="sm">
                      購入
                    </ButtonLink>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
        {list.length === 0 && <li className="rounded-2xl bg-wash p-6 text-center">条件に合う出品がありません</li>}
      </ul>

      <section id="chef-shops" aria-labelledby="chef-title" className="scroll-mt-20">
        <h2 id="chef-title" className="sr-only">
          シェフの店で食べる
        </h2>
        {chefShops.map((c) => (
          <ChefShopCard key={c.id} shop={c} veg={vegOf(c.vegetableId)} />
        ))}
      </section>

      <p className="text-sm text-muted">※ 取引ごとに手数料 {feeRate}%・食品表示・衛生ルールは要確認</p>

      <SellButton vegetables={vegetables} />
    </div>
  );
}

function ChefShopCard({ shop, veg }: { shop: ChefShop; veg?: Vegetable }) {
  const [note, setNote] = useState(false);
  return (
    <article className="flex gap-4 rounded-2xl border-2 border-line p-3">
      <Illust kind="dish" veg={veg?.art} label={`${shop.name}の料理`} className="aspect-square w-28 shrink-0 sm:w-36" />
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-lg font-bold">シェフの店で食べる</h3>
        <p className="text-sm text-muted">
          {shop.name}・{shop.course}
        </p>
        <button
          type="button"
          onClick={() => setNote(true)}
          className="mt-auto min-h-11 self-start text-accent underline underline-offset-4"
        >
          予約ページへ
        </button>
        {note && (
          <p role="status" className="text-xs text-muted">
            プロトタイプのため、外部の予約ページには移動しません。
          </p>
        )}
      </div>
    </article>
  );
}

function SellButton({ vegetables }: { vegetables: Vegetable[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [done, setDone] = useState(false);
  const close = () => ref.current?.close();
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setDone(false);
          ref.current?.showModal();
        }}
        className="fixed right-[max(1rem,calc(50%-320px+1rem))] bottom-24 z-20 inline-flex min-h-14 items-center gap-1 rounded-full bg-ink px-6 text-lg font-bold text-white shadow-lg hover:brightness-125"
      >
        <Icon name="plus" className="size-5" />
        出品する
      </button>
      <dialog
        ref={ref}
        aria-labelledby="sell-title"
        className="m-auto w-[min(92vw,560px)] rounded-2xl p-0 backdrop:bg-ink/50"
        onClick={(e) => e.target === ref.current && close()}
      >
        <div className="space-y-4 p-5">
          <div className="flex items-center justify-between">
            <h2 id="sell-title" className="text-lg font-bold">
              {done ? "出品しました" : "育てた野菜を出品する"}
            </h2>
            <button type="button" onClick={close} aria-label="閉じる" className="flex size-11 items-center justify-center rounded-full hover:bg-wash">
              <Icon name="close" />
            </button>
          </div>
          {done ? (
            <div role="status" className="space-y-4 text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent-wash text-accent">
                <Icon name="check" className="size-8" />
              </div>
              <p>出品しました（モック）。栽培日記が出品ページに表示されます。</p>
              <Button onClick={close} className="w-full">
                閉じる
              </Button>
            </div>
          ) : (
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
            >
              <div>
                <label htmlFor="sell-veg" className="mb-1 block text-sm font-bold">
                  野菜
                </label>
                <select id="sell-veg" className="min-h-12 w-full rounded-xl border-2 border-strong bg-paper px-3">
                  {vegetables.map((v) => (
                    <option key={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="sell-amount" className="mb-1 block text-sm font-bold">
                    量
                  </label>
                  <input id="sell-amount" required placeholder="例：約500g" className="min-h-12 w-full rounded-xl border-2 border-strong px-3" />
                </div>
                <div>
                  <label htmlFor="sell-price" className="mb-1 block text-sm font-bold">
                    価格（円）
                  </label>
                  <input id="sell-price" required inputMode="numeric" placeholder="例：500" className="min-h-12 w-full rounded-xl border-2 border-strong px-3" />
                </div>
              </div>
              <fieldset>
                <legend className="mb-1 text-sm font-bold">受け渡し</legend>
                <div className="flex gap-4">
                  {["発送", "手渡し"].map((x) => (
                    <label key={x} className="flex min-h-11 items-center gap-2">
                      <input type="checkbox" defaultChecked={x === "発送"} className="size-5 accent-accent" />
                      {x}
                    </label>
                  ))}
                </div>
              </fieldset>
              <p className="text-xs text-muted">※ 取引ごとに手数料がかかります。食品表示・衛生ルールをご確認ください。</p>
              <Button type="submit" size="lg" className="w-full">
                出品する（モック）
              </Button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
