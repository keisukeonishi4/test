"use client";
import Link from "next/link";
import { Tabs, useQueryTab } from "@/components/ui/Tabs";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Illust } from "@/components/illust/Illust";
import { POINTS } from "@/lib/format";
import type { Post, Recipe, Vegetable } from "@/lib/types";
import { DiaryCard, QuestionCard, RecipeCard, WikiCard } from "./Cards";

const IDS = ["grow", "cook", "qa"];

export function CommunityView({ posts, recipes, vegetables }: { posts: Post[]; recipes: Recipe[]; vegetables: Vegetable[] }) {
  const current = useQueryTab("tab", IDS, "grow");
  const vegOf = (id: string) => vegetables.find((v) => v.id === id);
  const wikis = posts.filter((p) => p.type === "wiki");
  const diaries = posts.filter((p) => p.type === "diary");
  const questions = posts.filter((p) => p.type === "question");

  return (
    <Tabs
      label="コミュニティ"
      current={current}
      className="bg-paper"
      items={[
        { id: "grow", label: "育てる" },
        { id: "cook", label: "つくる" },
        { id: "qa", label: "質問" },
      ]}
    >
      <div className="min-h-[60vh] space-y-4 bg-wash px-4 pt-4">
        {current === "grow" && (
          <>
            {wikis.map((w) => (
              <WikiCard key={w.id} wiki={w} veg={vegOf(w.vegetableId)} />
            ))}
            {diaries.map((d, i) => (
              <div key={d.id} className="space-y-4">
                <DiaryCard diary={d} veg={vegOf(d.vegetableId)} />
                {/* ワイヤーどおり、日記の流れの中に質問をはさむ */}
                {i === 0 && questions[0] && <QuestionCard q={questions[0]} />}
              </div>
            ))}
          </>
        )}

        {current === "cook" && (
          <>
            <div className="flex items-center gap-3 rounded-2xl bg-accent-wash p-4">
              <p className="flex-1 text-sm">
                レシピ投稿で <strong>{POINTS.recipe}pt</strong>。シェフの「今月のピック」に選ばれると <strong>{POINTS.recipePick}pt</strong>
                ＋ライブで紹介。
              </p>
              <ButtonLink href="/recipe/new" size="sm" className="shrink-0">
                投稿する
              </ButtonLink>
            </div>
            {recipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} vegs={r.vegetableIds.map(vegOf).filter((v): v is Vegetable => !!v)} />
            ))}
            <nav aria-label="育てた野菜のつなぎ先" className="grid grid-cols-2 gap-3">
              <Link href="/market" className="overflow-hidden rounded-2xl border-2 border-line bg-paper hover:bg-wash">
                <Illust kind="market" label="収穫野菜のかご" rounded="" className="aspect-[4/3]" />
                <span className="block p-3">
                  <span className="block font-bold">おすそわけマーケット</span>
                  <span className="block text-sm text-muted">育てた野菜を出品・購入</span>
                </span>
              </Link>
              <Link href="/support" className="overflow-hidden rounded-2xl border-2 border-line bg-paper hover:bg-wash">
                <Illust kind="kids" label="子ども食堂の食卓" rounded="" className="aspect-[4/3]" />
                <span className="block p-3">
                  <span className="block font-bold">子ども食堂を応援</span>
                  <span className="block text-sm text-muted">種を届けるプロジェクト</span>
                </span>
              </Link>
            </nav>
          </>
        )}

        {current === "qa" && (
          <>
            <p className="text-sm text-muted">育て方や食べ方の疑問を、育てる仲間と生産者に聞いてみよう。</p>
            {questions.map((q, i) => (
              <QuestionCard key={q.id} q={q} expanded={i === 0} />
            ))}
            <Link
              href="/zukan"
              className="flex min-h-11 items-center gap-1 text-sm text-accent underline underline-offset-4"
            >
              図鑑の育て方を見る
              <Icon name="chevron" className="size-4" />
            </Link>
          </>
        )}
      </div>
    </Tabs>
  );
}
