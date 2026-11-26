"use client";
import Link from "next/link";
import { Tabs, useQueryTab } from "@/components/ui/Tabs";
import { TextLink, ButtonLink } from "@/components/ui/Button";
import { Illust } from "@/components/illust/Illust";
import { Icon } from "@/components/ui/Icon";
import { difficultyLabel } from "@/lib/labels";
import type { Post, Recipe, Vegetable } from "@/lib/types";

type Diary = Extract<Post, { type: "diary" }>;

const IDS = ["grow", "recipe", "growers"];

// 育て方／レシピ／育てる人 のタブ（?tab= と連動）
export function DetailTabs({ veg, recipes, diaries }: { veg: Vegetable; recipes: Recipe[]; diaries: Diary[] }) {
  const current = useQueryTab("tab", IDS, "grow");
  return (
    <Tabs
      label={`${veg.name}の情報`}
      current={current}
      items={[
        { id: "grow", label: "育て方" },
        { id: "recipe", label: "レシピ [数]" },
        { id: "growers", label: "育てる人 [数]" },
      ]}
    >
      {current === "grow" && <Grow veg={veg} />}
      {current === "recipe" && <Recipes veg={veg} recipes={recipes} />}
      {current === "growers" && <Growers veg={veg} diaries={diaries} />}
    </Tabs>
  );
}

function Grow({ veg }: { veg: Vegetable }) {
  const rows = [
    ["難易度", `${difficultyLabel[veg.difficulty]}${veg.planterOk ? "・プランター可" : "・畑向き"}`],
    ["種まき", "[月]〜[月]"],
    ["収穫まで", "約[日数]日"],
  ];
  return (
    <div className="pt-4">
      <dl className="grid grid-cols-[6.5rem_1fr] gap-y-3">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-muted">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <TextLink href="/community?tab=grow" className="mt-3">
        みんなの育て方まとめを読む
      </TextLink>
    </div>
  );
}

function Recipes({ veg, recipes }: { veg: Vegetable; recipes: Recipe[] }) {
  return (
    <div className="space-y-3 pt-4">
      {recipes.length === 0 && <p className="text-muted">まだレシピがありません。最初のひと皿を投稿してみませんか。</p>}
      <ul className="space-y-3">
        {recipes.map((r) => (
          <li key={r.id}>
            <details className="group rounded-2xl border-2 border-line">
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 p-3 [&::-webkit-details-marker]:hidden">
                <Illust kind="dish" veg={veg.art} label={r.title} className="size-16 shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block font-bold">{r.title}</span>
                  <span className="block text-sm text-muted">
                    {r.author}
                    {r.byChef && <span className="ml-2 rounded-full bg-accent-wash px-2 py-0.5 text-xs font-bold text-accent">シェフ監修</span>}
                    {r.usedOwnHarvest && <span className="ml-2 text-xs">自分で育てた野菜</span>}
                  </span>
                </span>
                <Icon name="chevron" className="size-5 shrink-0 text-muted transition group-open:rotate-90" />
              </summary>
              <div className="grid gap-4 border-t-2 border-line p-4 sm:grid-cols-2">
                <div>
                  <h3 className="mb-1 text-sm font-bold">材料</h3>
                  <ul className="list-inside list-disc text-sm">
                    {r.ingredients.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-bold">作り方</h3>
                  <ol className="list-inside list-decimal text-sm">
                    {r.steps.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
      <ButtonLink href="/recipe/new" variant="outline" className="w-full">
        <Icon name="plus" className="size-5" />
        レシピを投稿する（[ ]pt）
      </ButtonLink>
    </div>
  );
}

function Growers({ veg, diaries }: { veg: Vegetable; diaries: Diary[] }) {
  return (
    <div className="space-y-3 pt-4">
      <p className="text-muted">[数]人が{veg.name}を育てています。</p>
      {diaries.length === 0 && <p className="rounded-xl bg-wash p-4 text-sm">まだ栽培日記がありません。</p>}
      <ul className="space-y-3">
        {diaries.map((d) => (
          <li key={d.id}>
            <Link href="/community?tab=grow" className="flex items-center gap-3 rounded-2xl border-2 border-line p-3 hover:bg-wash">
              <Illust kind="sprout" label="成長記録" className="size-16 shrink-0" />
              <span className="min-w-0 flex-1">
                <span className="block font-bold">
                  {d.author} <span className="text-sm font-normal text-muted">種守 Lv.[ ]</span>
                </span>
                <span className="block text-sm text-muted">栽培日記・[ ]日目</span>
                <span className="block truncate text-sm">{d.body}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <TextLink href="/community?tab=grow">みんなの栽培日記を見る</TextLink>
    </div>
  );
}
