"use client";
import Link from "next/link";
import { useState } from "react";
import { Illust } from "@/components/illust/Illust";
import { Button } from "@/components/ui/Button";
import { ProducerBadge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { toggleIn, useMock } from "@/lib/mock-store";
import type { Post, Recipe, Vegetable } from "@/lib/types";
import { Avatar } from "./Avatar";

type Wiki = Extract<Post, { type: "wiki" }>;
type Diary = Extract<Post, { type: "diary" }>;
type Question = Extract<Post, { type: "question" }>;

const card = "rounded-2xl border-2 bg-paper";
const pill =
  "inline-flex min-h-11 items-center gap-1 rounded-full border-2 border-strong px-3 text-sm whitespace-nowrap transition hover:bg-wash aria-pressed:border-accent aria-pressed:bg-accent-wash aria-pressed:font-bold aria-pressed:text-accent";

// みんなで編集する育て方まとめ
export function WikiCard({ wiki, veg }: { wiki: Wiki; veg?: Vegetable }) {
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useState<Record<number, string>>({});
  const { state } = useMock();
  const added = state.addedToWiki.length;

  return (
    <article className={`${card} border-accent-soft`}>
      <details className="group">
        <summary className="flex cursor-pointer list-none items-start gap-3 p-4 [&::-webkit-details-marker]:hidden">
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-accent">みんなで編集する育て方まとめ</span>
            <span className="mt-1 block text-lg font-bold">
              {wiki.title}（{wiki.region}版）
            </span>
            <span className="mt-1 block text-sm text-muted">
              編集者 {wiki.editors + (Object.keys(saved).length ? 1 : 0)}人・最終更新 {wiki.updatedAt}
            </span>
          </span>
          <Icon name="chevron" className="mt-1 size-5 shrink-0 text-muted transition group-open:rotate-90" />
        </summary>
        <div className="space-y-4 border-t-2 border-line p-4">
          {wiki.sections.map((sec, i) => (
            <section key={sec.heading}>
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-bold">{sec.heading}</h4>
                {editing !== i && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(i);
                      setDraft(saved[i] ?? sec.body);
                    }}
                    className="min-h-11 px-2 text-sm text-accent underline underline-offset-4"
                  >
                    編集する
                  </button>
                )}
              </div>
              {editing === i ? (
                <form
                  className="mt-2 space-y-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSaved((s) => ({ ...s, [i]: draft }));
                    setEditing(null);
                  }}
                >
                  <label htmlFor={`${wiki.id}-${i}`} className="sr-only">
                    {sec.heading}を編集
                  </label>
                  <textarea
                    id={`${wiki.id}-${i}`}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border-2 border-strong p-3"
                  />
                  <div className="flex gap-2">
                    <Button type="submit" size="sm">
                      保存する
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => setEditing(null)}>
                      やめる
                    </Button>
                  </div>
                </form>
              ) : (
                <p className="mt-1 text-sm">{saved[i] ?? sec.body}</p>
              )}
              {saved[i] !== undefined && editing !== i && (
                <p role="status" className="mt-1 text-xs text-accent">
                  保存しました（モック）。あなたも編集者に加わりました。
                </p>
              )}
            </section>
          ))}
          {added > 0 && (
            <p className="rounded-xl bg-accent-wash p-3 text-sm">栽培日記から {added}件 の工夫が追加候補に入っています。</p>
          )}
          {veg && (
            <Link href={`/zukan/${veg.id}`} className="inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4">
              {veg.name}を図鑑で見る
            </Link>
          )}
        </div>
      </details>
    </article>
  );
}

// 栽培日記
export function DiaryCard({ diary, veg }: { diary: Diary; veg?: Vegetable }) {
  const { state, update } = useMock();
  const liked = state.liked.includes(diary.id);
  const added = state.addedToWiki.includes(diary.id);
  const mine = state.myComments.filter((c) => c.postId === diary.id);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  return (
    <article className={`${card} border-line p-4`}>
      <header className="flex items-center gap-3">
        <Avatar />
        <div>
          <p className="font-bold">
            {diary.author} <span className="text-sm font-normal text-muted">種守 Lv.{diary.authorLevel}</span>
          </p>
          <p className="text-sm text-muted">
            栽培日記・{veg?.name} {diary.day}日目・{diary.createdAt}
          </p>
        </div>
      </header>
      <Illust kind="sprout" label={diary.photoLabel} className="mt-3 aspect-[16/9]" />
      <p className="mt-3">{diary.body}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={liked}
          onClick={() => update((s) => ({ ...s, liked: toggleIn(s.liked, diary.id) }))}
          className={pill}
        >
          <Icon name="heart" filled={liked} className="size-4" />
          いいね {diary.likes + (liked ? 1 : 0)}
        </button>
        <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className={pill}>
          コメント {diary.comments + mine.length}
        </button>
        <button
          type="button"
          aria-pressed={added}
          onClick={() => update((s) => ({ ...s, addedToWiki: toggleIn(s.addedToWiki, diary.id) }))}
          className={pill}
        >
          {added ? "まとめに追加済み" : "まとめに追加"}
        </button>
      </div>
      {open && (
        <div className="mt-3 space-y-2 border-t-2 border-line pt-3">
          <p className="text-sm text-muted">[ニックネーム]：[コメントの本文]</p>
          {mine.map((c, i) => (
            <p key={i} className="text-sm">
              <span className="font-bold">あなた</span>：{c.body}
            </p>
          ))}
          <CommentForm
            id={`c-${diary.id}`}
            label="コメントを書く"
            value={text}
            onChange={setText}
            onSubmit={() => {
              update((s) => ({ ...s, myComments: [...s.myComments, { postId: diary.id, body: text }] }));
              setText("");
            }}
          />
        </div>
      )}
    </article>
  );
}

// 質問
export function QuestionCard({ q, expanded = false }: { q: Question; expanded?: boolean }) {
  const { state, update } = useMock();
  const mine = state.myComments.filter((c) => c.postId === q.id);
  const [text, setText] = useState("");
  const hasProducer = q.answers.some((a) => a.badge === "producer");
  return (
    <article className={`${card} border-line`}>
      <details open={expanded} className="group">
        <summary className="flex cursor-pointer list-none items-start gap-3 p-4 [&::-webkit-details-marker]:hidden">
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-live">質問</span>
            <span className="mt-1 block text-lg font-bold">{q.title}</span>
            <span className="mt-1 block text-sm text-muted">
              回答 {q.answers.length + mine.length}件{hasProducer && "・生産者バッジの回答あり"}・{q.createdAt}
            </span>
          </span>
          <Icon name="chevron" className="mt-1 size-5 shrink-0 text-muted transition group-open:rotate-90" />
        </summary>
        <div className="space-y-3 border-t-2 border-line p-4">
          <p>{q.body}</p>
          <ul className="space-y-2">
            {q.answers.map((a, i) => (
              <li key={i} className="rounded-xl bg-wash p-3">
                <p className="flex flex-wrap items-center gap-2 text-sm font-bold">
                  {a.author}
                  {a.badge === "producer" && <ProducerBadge />}
                </p>
                <p className="mt-1 text-sm">{a.body}</p>
              </li>
            ))}
            {mine.map((c, i) => (
              <li key={`m${i}`} className="rounded-xl bg-accent-wash p-3 text-sm">
                <span className="font-bold">あなた</span>：{c.body}
              </li>
            ))}
          </ul>
          <CommentForm
            id={`a-${q.id}`}
            label="回答する"
            value={text}
            onChange={setText}
            onSubmit={() => {
              update((s) => ({ ...s, myComments: [...s.myComments, { postId: q.id, body: text }] }));
              setText("");
            }}
          />
        </div>
      </details>
    </article>
  );
}

function CommentForm({
  id,
  label,
  value,
  onChange,
  onSubmit,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) onSubmit();
      }}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`${label}（モック）`}
        className="min-h-11 min-w-0 flex-1 rounded-full border-2 border-strong px-4 text-sm placeholder:text-muted"
      />
      <Button type="submit" variant="dark" size="sm" className="rounded-full">
        送信
      </Button>
    </form>
  );
}

// レシピ（つくるタブ）
export function RecipeCard({ recipe, vegs }: { recipe: Recipe; vegs: Vegetable[] }) {
  const main = vegs[0];
  return (
    <article className={`${card} border-line`}>
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center gap-3 p-3 [&::-webkit-details-marker]:hidden">
          <Illust kind="dish" veg={main?.art} label={recipe.title} className="size-20 shrink-0" />
          <span className="min-w-0 flex-1">
            <span className="block font-bold">{recipe.title}</span>
            <span className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted">
              {recipe.author}
              {recipe.byChef && (
                <span className="rounded-full bg-accent-wash px-2 py-0.5 text-xs font-bold text-accent">シェフ監修</span>
              )}
              {recipe.usedOwnHarvest && <span className="text-xs">自分で育てた野菜</span>}
            </span>
          </span>
          <Icon name="chevron" className="size-5 shrink-0 text-muted transition group-open:rotate-90" />
        </summary>
        <div className="grid gap-4 border-t-2 border-line p-4 sm:grid-cols-2">
          <div>
            <h4 className="mb-1 text-sm font-bold">材料</h4>
            <ul className="list-inside list-disc text-sm">
              {recipe.ingredients.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-1 text-sm font-bold">作り方</h4>
            <ol className="list-inside list-decimal text-sm">
              {recipe.steps.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ol>
          </div>
          <p className="flex flex-wrap gap-2 text-sm sm:col-span-2">
            使った野菜：
            {vegs.map((v) => (
              <Link key={v.id} href={`/zukan/${v.id}`} className="text-accent underline underline-offset-4">
                {v.name}
              </Link>
            ))}
          </p>
        </div>
      </details>
    </article>
  );
}
