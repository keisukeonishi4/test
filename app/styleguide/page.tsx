import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { Screen } from "@/components/layout/Screen";
import { BackHeader } from "@/components/layout/Headers";
import { Button, ButtonLink, TextLink } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Chip";
import { LiveBadge, ProducerBadge } from "@/components/ui/Badge";
import { Placeholder } from "@/components/ui/Placeholder";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Card } from "@/components/ui/Section";
import { ChipDemo, TabsDemo } from "./Demo";

export const metadata: Metadata = { title: "共通パーツ" };

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3 border-b-2 border-line px-4 py-6">
      <h2 className="font-bold">{title}</h2>
      {children}
    </section>
  );
}

const colors = [
  ["ink", "bg-ink", "本文"],
  ["muted", "bg-muted", "補助テキスト"],
  ["accent", "bg-accent", "深緑 #2E6B3F"],
  ["live", "bg-live", "赤茶 #B3471B"],
  ["accent-wash", "bg-accent-wash", "薄い緑"],
  ["wash", "bg-wash", "薄いグレー"],
  ["ph", "bg-ph", "プレースホルダー"],
  ["line", "bg-line", "線"],
];

export default function StyleguidePage() {
  return (
    <Screen header={<BackHeader title="共通パーツ" backHref="/" />} footer="none">
      <Block title="色">
        <ul className="grid grid-cols-2 gap-3">
          {colors.map(([k, c, label]) => (
            <li key={k} className="flex items-center gap-3">
              <span className={`size-10 rounded-lg border-2 border-line ${c}`} aria-hidden="true" />
              <span className="text-sm">{label}</span>
            </li>
          ))}
        </ul>
      </Block>
      <Block title="ボタン（高さ44px以上）">
        <div className="flex flex-col gap-3">
          <ButtonLink href="/live" size="lg">ライブを見る・参加する</ButtonLink>
          <div className="flex gap-3">
            <Button variant="outline" size="lg" className="flex-1">食べたい</Button>
            <Button size="lg" className="flex-1">育てたい（種）</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary">メッセージ</Button>
            <Button variant="dark">送信</Button>
            <Button variant="outline-dark">通知を受け取る</Button>
            <Button size="sm">購入</Button>
          </div>
          <TextLink href="/zukan">図鑑をみる</TextLink>
        </div>
      </Block>
      <Block title="チップ（絞り込み：黒／選択：緑＋✓）">
        <ChipDemo />
      </Block>
      <Block title="タブ">
        <Suspense>
          <TabsDemo />
        </Suspense>
      </Block>
      <Block title="タグ・バッジ">
        <div className="flex flex-wrap items-center gap-2">
          <Tag>産地 [地域]</Tag>
          <Tag>旬 [時期]</Tag>
          <Tag tone="live">絶滅危惧度 [ランク]</Tag>
          <LiveBadge>LIVE 配信中</LiveBadge>
          <ProducerBadge />
        </div>
      </Block>
      <Block title="プレースホルダー・カード・進捗">
        <Placeholder label="野菜写真" className="aspect-square w-32" />
        <Card className="p-4">
          <p className="font-bold">子ども食堂へ</p>
          <div className="mt-3">
            <ProgressBar value={62} max={100} label="達成 [ ]%" />
          </div>
          <p className="mt-2 text-sm text-muted">達成 [ ]%</p>
        </Card>
      </Block>
    </Screen>
  );
}
