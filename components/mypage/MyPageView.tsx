"use client";
import Link from "next/link";
import { useState } from "react";
import { Illust } from "@/components/illust/Illust";
import { Avatar } from "@/components/community/Avatar";
import { useMock } from "@/lib/mock-store";
import type { User, Vegetable } from "@/lib/types";

export function MyPageView({ user, vegetables }: { user: User; vegetables: Vegetable[] }) {
  const { state, reset } = useMock();
  const vegOf = (id: string) => vegetables.find((v) => v.id === id);
  const points = user.points + state.earnedPoints;
  const favorites = state.favorites.map(vegOf).filter((v): v is Vegetable => !!v);

  return (
    <div className="space-y-8 px-4 pt-5">
      <div className="flex items-center gap-4">
        <Avatar size="size-20" />
        <div>
          <h2 className="text-2xl font-black">{user.nickname}</h2>
          <p className="text-sm text-muted">
            種守（たねもり）Lv.{user.level}・次に育てたい {user.nextWantCount}品種
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-accent-wash p-4">
          <dt className="text-sm">保有ポイント</dt>
          <dd className="mt-1 text-3xl font-black">
            {points.toLocaleString("ja-JP")}pt
          </dd>
          {state.earnedPoints > 0 && <dd className="text-xs font-bold text-accent">今回 +{state.earnedPoints}pt</dd>}
        </div>
        <div className="rounded-2xl bg-wash p-4">
          <dt className="text-sm">わたしが育てた品種</dt>
          <dd className="mt-1 text-3xl font-black">{user.grownCount}種</dd>
        </div>
      </dl>

      <section aria-labelledby="growing">
        <h3 id="growing" className="mb-3 text-lg font-bold">
          栽培中
        </h3>
        <ul className="space-y-3">
          {user.growing.map((g) => {
            const v = vegOf(g.vegetableId);
            return (
              <li key={g.vegetableId} className="flex items-center gap-4 rounded-2xl border-2 border-line p-4">
                <Illust kind="sprout" label={`${v?.name}の成長記録`} className="size-16 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold">
                    {v?.name}・{g.day}日目
                  </p>
                  <p className="text-sm text-muted">
                    次の作業：{g.nextTask}（{g.nextDate}）
                  </p>
                </div>
                <Link href="/community?tab=grow" className="inline-flex min-h-11 shrink-0 items-center text-accent underline underline-offset-4">
                  日記を書く
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="collection">
        <h3 id="collection" className="mb-3 text-lg font-bold">
          育てた野菜コレクション
        </h3>
        <ul className="grid grid-cols-5 gap-2">
          {user.collection.map((c) => {
            const v = vegOf(c.vegetableId);
            return (
              <li key={c.vegetableId}>
                {c.collected && v ? (
                  <Link href={`/zukan/${v.id}`} className="block rounded-full">
                    <Illust kind="veg" veg={v.art} label={`${v.name}（育てた）`} rounded="rounded-full" className="aspect-square ring-4 ring-accent-soft ring-inset" />
                  </Link>
                ) : (
                  <span
                    role="img"
                    aria-label="まだ育てていない品種"
                    className="block aspect-square rounded-full border-2 border-dashed border-strong"
                  />
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-2 text-sm text-muted">図鑑のバッジを集めると限定の種・ライブ招待</p>
      </section>

      {favorites.length > 0 && (
        <section aria-labelledby="favs">
          <h3 id="favs" className="mb-3 text-lg font-bold">
            お気に入りの野菜
          </h3>
          <ul className="flex flex-wrap gap-2">
            {favorites.map((v) => (
              <li key={v.id}>
                <Link href={`/zukan/${v.id}`} className="inline-flex min-h-11 items-center rounded-full border-2 border-strong px-4 hover:bg-wash">
                  {v.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="history">
        <h3 id="history" className="mb-1 text-lg font-bold">
          購入履歴
        </h3>
        <ul className="divide-y-2 divide-line border-y-2 border-line">
          {user.history.map((h) => (
            <li key={h.id} className="flex min-h-14 items-center justify-between gap-3">
              <span>{h.label}</span>
              <span className="text-sm text-muted">
                {h.date}
                {h.points !== null && `・+${h.points}pt`}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <Settings onReset={reset} />
    </div>
  );
}

function Settings({ onReset }: { onReset: () => void }) {
  const [sow, setSow] = useState(true);
  const [liveOn, setLiveOn] = useState(true);
  const [msg, setMsg] = useState("");
  return (
    <section id="settings" aria-labelledby="settings-title" className="scroll-mt-20">
      <h3 id="settings-title" className="mb-1 text-lg font-bold">
        通知の設定
      </h3>
      <ul className="divide-y-2 divide-line border-y-2 border-line">
        <Toggle label="種まき時期のお知らせ" checked={sow} onChange={setSow} />
        <Toggle label="ライブ配信のお知らせ" checked={liveOn} onChange={setLiveOn} />
      </ul>
      <button
        type="button"
        onClick={() => {
          onReset();
          setMsg("操作した内容（投票・いいね・ポイントなど）をリセットしました");
        }}
        className="mt-4 min-h-11 text-sm text-muted underline underline-offset-4"
      >
        プロトタイプの操作内容をリセット
      </button>
      <p role="status" className="text-sm text-accent">
        {msg}
      </p>
    </section>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <li>
      <label className="flex min-h-14 cursor-pointer items-center justify-between gap-3">
        {label}
        <input type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
        <span
          aria-hidden="true"
          className="relative h-7 w-12 shrink-0 rounded-full bg-strong transition peer-checked:bg-accent peer-focus-visible:outline-3 peer-focus-visible:outline-accent after:absolute after:top-1 after:left-1 after:size-5 after:rounded-full after:bg-paper after:transition peer-checked:after:translate-x-5"
        />
      </label>
    </li>
  );
}
