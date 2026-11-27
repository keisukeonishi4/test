"use client";
import Link from "next/link";
import { useState } from "react";
import { Illust } from "@/components/illust/Illust";
import { Placeholder } from "@/components/ui/Placeholder";
import { LiveBadge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useMock } from "@/lib/mock-store";
import { yen } from "@/lib/format";
import type { Live, Vegetable } from "@/lib/types";

export function LiveView({ live, veg }: { live: Live; veg: Vegetable }) {
  return (
    <>
      {/* 映像（YouTube埋め込み枠） */}
      <div className="relative">
        <Placeholder
          label="ライブ映像（YouTube埋め込み枠）"
          tone="dark"
          rounded=""
          className="aspect-video"
        />
        <Link
          href="/"
          aria-label="ホームへ戻る"
          className="absolute top-2 left-2 flex size-11 items-center justify-center rounded-full bg-paper/80 hover:bg-paper"
        >
          <Icon name="back" />
        </Link>
        {live.isLive && (
          <div className="absolute top-3 right-3">
            <LiveBadge>LIVE・{live.viewers}人</LiveBadge>
          </div>
        )}
      </div>

      <div className="space-y-6 px-4 pt-4">
        <div className="flex items-center gap-3">
          <Illust kind="chef" label={live.chef} rounded="rounded-full" className="size-14 shrink-0" />
          <div className="min-w-0 flex-1">
            <h1 className="text-lg leading-snug font-bold">{live.title}</h1>
            <p className="text-sm text-muted">
              {live.chef}（{live.shop}）
            </p>
          </div>
          <ButtonLink href="/market#chef-shops" variant="outline" size="sm" className="shrink-0">
            お店を見る
          </ButtonLink>
        </div>

        <Poll poll={live.poll} />
        <Products live={live} veg={veg} />
        <Comments initial={live.comments} />
      </div>
    </>
  );
}

function Poll({ poll }: { poll: Live["poll"] }) {
  const { state, update } = useMock();
  const voted = state.pollVote;
  const total = poll.options.reduce((n, o) => n + o.votes, 0) + (voted ? 1 : 0);
  return (
    <section aria-labelledby="poll-q" className="rounded-2xl bg-wash p-4">
      <h2 id="poll-q" className="font-bold">
        {poll.question}
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {poll.options.map((o) => {
          const n = o.votes + (voted === o.id ? 1 : 0);
          const p = Math.round((n / total) * 100);
          const mine = voted === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={mine}
              onClick={() => update((s) => ({ ...s, pollVote: o.id }))}
              className={`relative min-h-14 overflow-hidden rounded-xl border-2 bg-paper px-3 font-bold ${
                mine ? "border-accent text-accent" : "border-ink"
              }`}
            >
              {voted && (
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 ${mine ? "bg-accent-wash" : "bg-ph"}`}
                  style={{ width: `${p}%` }}
                />
              )}
              <span className="relative flex flex-col items-center justify-center py-1">
                <span>{o.label}</span>
                {voted && (
                  <span className="flex items-center gap-1 text-lg">
                    {mine && <Icon name="check" className="size-4" />}
                    {p}%
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-muted" aria-live="polite">
        {voted ? `投票ありがとうございます。結果はダミー集計（${total}票）です。もう一方を押すと投票を変えられます。` : "投票結果をライブのメニューに反映します"}
      </p>
    </section>
  );
}

function Products({ live, veg }: { live: Live; veg: Vegetable }) {
  const [bought, setBought] = useState<string[]>([]);
  return (
    <section aria-labelledby="products">
      <h2 id="products" className="mb-3 font-bold">
        この配信で紹介中
      </h2>
      <ul className="space-y-3">
        {live.products.map((p) => (
          <li key={p.id} className="flex items-center gap-3 rounded-2xl border-2 border-line p-3">
            <Illust
              kind={p.kind === "seed" ? "seed" : "market"}
              veg={veg.art}
              label={p.title}
              className="size-16 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="font-bold">{p.title}</p>
              <p className="text-sm text-muted">
                {yen(p.price)}・{p.note}
              </p>
            </div>
            {p.kind === "seed" ? (
              <ButtonLink href={`/buy/${veg.id}?mode=ec`} size="sm">
                購入
              </ButtonLink>
            ) : bought.includes(p.id) ? (
              <span role="status" className="text-sm font-bold text-accent">
                購入済み（モック）
              </span>
            ) : (
              <Button size="sm" onClick={() => setBought((b) => [...b, p.id])}>
                購入
              </Button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Comments({ initial }: { initial: Live["comments"] }) {
  const [list, setList] = useState(initial);
  const [text, setText] = useState("");
  return (
    <section aria-labelledby="comments-title">
      <h2 id="comments-title" className="sr-only">
        コメント
      </h2>
      <ul className="space-y-2" aria-live="polite">
        {list.map((c, i) => (
          <li key={i}>
            <span className="font-bold">{c.author}</span> {c.body}
          </li>
        ))}
      </ul>
      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          setList((l) => [...l, { author: "あなた", body: text }]);
          setText("");
        }}
      >
        <label htmlFor="live-comment" className="mb-1 block text-sm text-muted">
          コメント
        </label>
        <div className="flex gap-2">
          <input
            id="live-comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="シェフに質問する"
            className="min-h-12 min-w-0 flex-1 rounded-full border-2 border-strong px-4 placeholder:text-muted"
          />
          <Button type="submit" variant="dark" className="rounded-full">
            送信
          </Button>
        </div>
      </form>
    </section>
  );
}
