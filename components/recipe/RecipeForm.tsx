"use client";
import { useEffect, useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { StickyActionBar } from "@/components/layout/StickyActionBar";
import { MockComplete } from "@/components/MockComplete";
import { CloseHeader } from "@/components/layout/Headers";
import { useMock } from "@/lib/mock-store";
import { POINTS } from "@/lib/format";
import type { Vegetable } from "@/lib/types";

const DRAFT_KEY = "yasai-isan-recipe-draft";
const MAX_PHOTOS = 5;

type Draft = { title: string; vegIds: string[]; ingredients: string; steps: string; own: boolean };
const empty: Draft = { title: "", vegIds: [], ingredients: "", steps: "", own: false };

const field = "w-full rounded-xl border-2 border-strong bg-paper px-4 placeholder:text-muted";

export function RecipeForm({ vegetables }: { vegetables: Vegetable[] }) {
  const { update } = useMock();
  const [d, setD] = useState<Draft>(empty);
  const [photos, setPhotos] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) setD({ ...empty, ...JSON.parse(raw) });
    } catch {
      /* noop */
    }
  }, []);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((p) => ({ ...p, [k]: v }));
  const toggleVeg = (id: string) =>
    set("vegIds", d.vegIds.includes(id) ? d.vegIds.filter((x) => x !== id) : [...d.vegIds, id]);

  const saveDraft = () => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(d));
      setMsg("下書きを保存しました");
    } catch {
      setMsg("下書きを保存できませんでした");
    }
    setTimeout(() => setMsg(""), 2500);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!d.title.trim()) errs.push("レシピ名を入力してください");
    if (d.vegIds.length === 0) errs.push("使った野菜遺産を1つ以上選んでください");
    setErrors(errs);
    if (errs.length) return;
    update((s) => ({ ...s, earnedPoints: s.earnedPoints + POINTS.recipe }));
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      /* noop */
    }
    setDone(true);
    window.scrollTo({ top: 0 });
  };

  const header = (
    <CloseHeader
      title="レシピを投稿"
      closeHref="/community?tab=cook"
      action={
        !done && (
          <button type="button" onClick={saveDraft} className="min-h-11 px-3 text-muted hover:text-ink">
            下書き
          </button>
        )
      }
    />
  );

  if (done) {
    return (
      <>
      {header}
      <MockComplete
        title={`投稿しました！ ${POINTS.recipe}pt 獲得`}
        primary={{ href: "/community?tab=cook", label: "みんなのレシピを見る" }}
        secondary={{ href: "/mypage", label: "マイページでポイントを確認" }}
      >
        「{d.title}」を投稿しました（モック）。シェフの「今月のピック」に選ばれると、さらに {POINTS.recipePick}pt
        とライブでの紹介があります。
      </MockComplete>
      </>
    );
  }

  const shown = showAll ? vegetables : vegetables.filter((v, i) => i < 2 || d.vegIds.includes(v.id));

  return (
    <>
      {header}
      <span role="status" className={msg ? "fixed top-16 left-1/2 z-40 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm text-white" : "sr-only"}>
        {msg}
      </span>

      <form id="recipe-form" onSubmit={submit} noValidate className="space-y-6 px-4 pt-4">
        <p className="rounded-2xl bg-accent-wash p-4 text-sm">
          投稿で <strong>{POINTS.recipe}pt</strong>。シェフの「今月のピック」に選ばれると <strong>{POINTS.recipePick}pt</strong>
          ＋ライブで紹介
        </p>

        {errors.length > 0 && (
          <div role="alert" className="rounded-xl border-2 border-ink bg-wash p-3 text-sm font-bold">
            <ul className="list-inside list-disc">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-strong bg-wash p-4 text-center focus-within:outline-3 focus-within:outline-accent">
            <span className="flex items-center gap-1">
              <Icon name="plus" className="size-5" />
              完成写真を追加（最大{MAX_PHOTOS}枚）
            </span>
            <span className="text-xs text-muted">選んだ写真は送信されません（モック）</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(e) => setPhotos(Array.from(e.target.files ?? []).slice(0, MAX_PHOTOS).map((f) => f.name))}
            />
          </label>
          {photos.length > 0 && (
            <p className="mt-2 text-sm text-muted" aria-live="polite">
              {photos.length}枚選択中：{photos.join("、")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="r-title" className="mb-2 block font-bold">
            レシピ名 <span className="text-sm font-normal text-muted">（必須）</span>
          </label>
          <input
            id="r-title"
            value={d.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="例：[野菜名A]のまるごとロースト"
            aria-invalid={errors.some((e) => e.startsWith("レシピ名"))}
            className={`${field} min-h-12`}
          />
        </div>

        <fieldset>
          <legend className="mb-2 font-bold">
            使った野菜遺産 <span className="text-sm font-normal text-muted">（1つ以上）</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {shown.map((v) => (
              <Chip key={v.id} tone="select" selected={d.vegIds.includes(v.id)} onClick={() => toggleVeg(v.id)}>
                {v.name}
              </Chip>
            ))}
            {!showAll && (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="inline-flex min-h-11 items-center gap-1 rounded-full border-2 border-strong px-4 text-sm hover:bg-wash"
              >
                <Icon name="plus" className="size-4" />
                図鑑から選ぶ
              </button>
            )}
          </div>
        </fieldset>

        <div>
          <label htmlFor="r-ing" className="mb-2 block font-bold">
            材料
          </label>
          <textarea
            id="r-ing"
            rows={4}
            value={d.ingredients}
            onChange={(e) => set("ingredients", e.target.value)}
            placeholder="1行に1つ"
            className={`${field} py-3`}
          />
        </div>

        <div>
          <label htmlFor="r-steps" className="mb-2 block font-bold">
            作り方
          </label>
          <textarea
            id="r-steps"
            rows={5}
            value={d.steps}
            onChange={(e) => set("steps", e.target.value)}
            placeholder="手順を書く（写真も追加できます）"
            className={`${field} py-3`}
          />
        </div>

        <label className="flex min-h-11 cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={d.own}
            onChange={(e) => set("own", e.target.checked)}
            className="size-6 accent-accent"
          />
          自分で育てた野菜を使った（栽培日記とつなぐ）
        </label>
      </form>

      <StickyActionBar>
        <Button type="submit" form="recipe-form" size="lg" className="flex-1">
          投稿して {POINTS.recipe}pt もらう
        </Button>
      </StickyActionBar>
    </>
  );
}
