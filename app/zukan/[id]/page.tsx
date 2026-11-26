import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Screen } from "@/components/layout/Screen";
import { BackHeader } from "@/components/layout/Headers";
import { StickyActionBar } from "@/components/layout/StickyActionBar";
import { ButtonLink } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Chip";
import { PhotoSlider } from "@/components/zukan/PhotoSlider";
import { DetailHeaderActions } from "@/components/zukan/DetailHeaderActions";
import { DetailTabs } from "@/components/zukan/DetailTabs";
import { getRecipesFor, getVegetable, posts, vegetables } from "@/lib/data";

export const generateStaticParams = () => vegetables.map((v) => ({ id: v.id }));

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: getVegetable(id)?.name ?? "野菜図鑑" };
}

export default async function ZukanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const veg = getVegetable(id);
  if (!veg) notFound();
  const recipes = getRecipesFor(veg.id);
  const diaries = posts.filter((p) => p.type === "diary" && p.vegetableId === veg.id) as Extract<
    (typeof posts)[number],
    { type: "diary" }
  >[];

  return (
    <Screen
      header={<BackHeader title="野菜図鑑" backHref="/zukan" actions={<DetailHeaderActions vegId={veg.id} name={veg.name} />} />}
      footer="action"
    >
      <PhotoSlider veg={veg} />

      <div className="space-y-5 px-4 pt-5">
        <div>
          <p className="text-sm text-muted">{veg.furigana}</p>
          <h2 className="text-3xl font-black">{veg.name}</h2>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="基本情報">
            <li>
              <Tag>産地 {veg.region}</Tag>
            </li>
            <li>
              <Tag>旬 [時期]</Tag>
            </li>
            <li>
              <Tag tone="live">絶滅危惧度 [ランク]</Tag>
            </li>
          </ul>
        </div>

        <section aria-labelledby="character" className="rounded-2xl bg-wash p-4">
          <h3 id="character" className="mb-2 font-bold">
            この野菜の個性
          </h3>
          <ul className="space-y-1">
            {veg.character.map((c) => (
              <li key={c} className="flex gap-1">
                <span aria-hidden="true">・</span>
                {c}
              </li>
            ))}
          </ul>
        </section>

        <Suspense>
          <DetailTabs veg={veg} recipes={recipes} diaries={diaries} />
        </Suspense>
      </div>

      <StickyActionBar>
        <ButtonLink href={`/market?veg=${veg.id}`} variant="outline" size="lg" className="flex-1">
          食べたい
        </ButtonLink>
        <ButtonLink href={`/buy/${veg.id}`} size="lg" className="flex-1">
          育てたい（種）
        </ButtonLink>
      </StickyActionBar>
    </Screen>
  );
}
