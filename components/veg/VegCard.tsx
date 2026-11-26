import Link from "next/link";
import { Illust } from "@/components/illust/Illust";
import type { Vegetable } from "@/lib/types";

// 野菜カード（ホームの「今日出会える伝統野菜」・図鑑一覧で共通）
export function VegCard({ veg, sub }: { veg: Vegetable; sub?: React.ReactNode }) {
  return (
    <Link href={`/zukan/${veg.id}`} className="group block rounded-xl">
      <Illust kind="veg" veg={veg.art} label={`${veg.name}の全体`} className="aspect-[4/5] transition group-hover:brightness-95" />
      <p className="mt-2 font-bold group-hover:underline">{veg.name}</p>
      <p className="text-sm text-muted">{sub ?? "育てる人 [数]人"}</p>
    </Link>
  );
}
