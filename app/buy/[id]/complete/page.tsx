import { notFound } from "next/navigation";
import { Screen } from "@/components/layout/Screen";
import { BackHeader } from "@/components/layout/Headers";
import { MockComplete } from "@/components/MockComplete";
import { getVegetable, vegetables } from "@/lib/data";

export const generateStaticParams = () => vegetables.map((v) => ({ id: v.id }));

export default async function BuyCompletePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const veg = getVegetable(id);
  if (!veg) notFound();
  return (
    <Screen header={<BackHeader title="購入完了" backHref={`/buy/${veg.id}`} />} footer="none">
      <MockComplete
        title="ご購入ありがとうございます"
        primary={{ href: "/mypage", label: "マイページで確認する" }}
        secondary={{ href: `/zukan/${veg.id}`, label: "図鑑に戻る" }}
      >
        {veg.name}の種を購入しました（モック）。[ ]pt が付与されます。
      </MockComplete>
    </Screen>
  );
}
