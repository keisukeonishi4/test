import { notFound } from "next/navigation";
import { Screen } from "@/components/layout/Screen";
import { BackHeader } from "@/components/layout/Headers";
import { ComingSoon } from "@/components/ComingSoon";
import { getVegetable, vegetables } from "@/lib/data";

export const generateStaticParams = () => vegetables.map((v) => ({ id: v.id }));

export default async function BuyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const veg = getVegetable(id);
  if (!veg) notFound();
  return (
    <Screen header={<BackHeader title="種を買う" backHref={`/zukan/${veg.id}`} />} footer="none">
      <ComingSoon name={`種を買う：${veg.name}`} />
    </Screen>
  );
}
