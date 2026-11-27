import { notFound } from "next/navigation";
import { Screen } from "@/components/layout/Screen";
import { BackHeader } from "@/components/layout/Headers";
import { MockComplete } from "@/components/MockComplete";
import { getVegetable, vegetables } from "@/lib/data";
import { yen } from "@/lib/format";

export const generateStaticParams = () => vegetables.map((v) => ({ id: v.id }));

export default async function BuyCompletePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const veg = getVegetable(id);
  if (!veg) notFound();
  return (
    <Screen header={<BackHeader title="購入完了" backHref={`/buy/${veg.id}?mode=ec`} />} footer="none">
      <MockComplete
        title="ご購入ありがとうございます"
        primary={{ href: "/mypage", label: "マイページで確認する" }}
        secondary={{ href: `/zukan/${veg.id}`, label: "図鑑に戻る" }}
      >
        {veg.name}の種（{yen(veg.seed.ecPrice)}）を購入しました（モック）。{veg.seed.ecPoints}pt が付与され、購入履歴と栽培日記に登録されます。種まき時期になったらお知らせします。
      </MockComplete>
    </Screen>
  );
}
