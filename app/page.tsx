import Link from "next/link";
import { Screen } from "@/components/layout/Screen";
import { TabHeader, HeaderIconLink } from "@/components/layout/Headers";
import { ButtonLink } from "@/components/ui/Button";
import { LiveBadge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Section, Card } from "@/components/ui/Section";
import { Illust } from "@/components/illust/Illust";
import { VegCard } from "@/components/veg/VegCard";
import { Icon } from "@/components/ui/Icon";
import { getVegetable, live, projects, vegetables } from "@/lib/data";
import { pct } from "@/lib/format";

export const revalidate = 86400; // 「今月まける種」を日ごとに更新

// 今月が種まき期間に入っている野菜（なければ先頭）
function seedOfThisMonth() {
  const month = Number(new Intl.DateTimeFormat("en-US", { month: "numeric", timeZone: "Asia/Tokyo" }).format(new Date()));
  return vegetables.find((v) => v.sowMonths[0] <= month && month <= v.sowMonths[1]) ?? vegetables[0];
}

export default function HomePage() {
  const liveVeg = getVegetable(live.vegetableId) ?? vegetables[0];
  const today = vegetables.filter((v) => v.featuredToday).slice(0, 3);
  const seed = seedOfThisMonth();
  const project = projects[0];

  return (
    <Screen
      header={
        <TabHeader
          title="野菜遺産"
          logo
          actions={
            <>
              <HeaderIconLink href="/zukan" icon="search" label="図鑑で野菜を探す" />
              <HeaderIconLink href="/mypage" icon="bell" label="お知らせ" />
            </>
          }
        />
      }
    >
      {/* 配信中のライブ */}
      <section aria-labelledby="home-live" className="px-4 pt-4">
        <Card className="overflow-hidden">
          <div className="relative">
            <Illust kind="live" veg={liveVeg.art} label="ライブ映像のサムネイル（シェフ×収穫）" rounded="" className="aspect-video" />
            {live.isLive && (
              <div className="absolute top-3 left-3">
                <LiveBadge>LIVE 配信中</LiveBadge>
              </div>
            )}
            <span className="absolute top-3 right-3 rounded-md bg-paper px-2.5 py-1 text-sm">視聴 {live.viewers}人</span>
          </div>
          <div className="space-y-4 p-4">
            <h2 id="home-live" className="text-lg leading-snug font-bold">
              {live.homeTitle}
            </h2>
            <ButtonLink href="/live" size="lg" className="w-full">
              ライブを見る・参加する
            </ButtonLink>
          </div>
        </Card>
      </section>

      {/* 今日出会える伝統野菜 */}
      <Section title="今日出会える伝統野菜" more={{ href: "/zukan", label: "図鑑をみる" }} className="mt-8">
        <ul className="grid grid-cols-3 gap-3">
          {today.map((v) => (
            <li key={v.id}>
              <VegCard veg={v} />
            </li>
          ))}
        </ul>
      </Section>

      {/* 今月まける種 */}
      <div className="mt-8 px-4">
        <Link
          href={`/buy/${seed.id}`}
          className="flex items-center gap-4 rounded-2xl border-2 border-line bg-paper p-4 transition hover:bg-wash"
        >
          <Illust kind="seed" veg={seed.art} label={`${seed.name}の種袋`} className="size-20 shrink-0" />
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-bold">今月まける種</span>
            <span className="block text-sm text-muted">近くの販売所なら少しおトク。取扱店を探す</span>
          </span>
          <Icon name="chevron" className="size-5 shrink-0 text-muted" />
        </Link>
      </div>

      {/* おすそわけ・応援への入口 */}
      <nav aria-label="おすそわけと応援" className="mt-4 grid grid-cols-2 gap-3 px-4">
        <Link href="/market" className="flex min-h-28 flex-col rounded-2xl border-2 border-line bg-paper p-4 transition hover:bg-wash">
          <span className="text-lg font-bold">おすそわけ</span>
          <span className="mt-2 text-sm text-muted">育った野菜を買う</span>
        </Link>
        <Link href="/support" className="flex min-h-28 flex-col rounded-2xl border-2 border-line bg-paper p-4 transition hover:bg-wash">
          <span className="text-lg font-bold">子ども食堂へ</span>
          <span className="mt-3">
            <ProgressBar value={project.raised} max={project.goal} label="子ども食堂への応援プロジェクトの達成率" />
          </span>
          <span className="mt-2 text-sm text-muted">達成 {pct(project.raised, project.goal)}%</span>
        </Link>
      </nav>
    </Screen>
  );
}
