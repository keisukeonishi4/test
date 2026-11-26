import { notFound } from "next/navigation";
import { Screen } from "@/components/layout/Screen";
import { BackHeader } from "@/components/layout/Headers";
import { StickyActionBar } from "@/components/layout/StickyActionBar";
import { ButtonLink, Button } from "@/components/ui/Button";
import { ComingSoon } from "@/components/ComingSoon";
import { getVegetable, vegetables } from "@/lib/data";

export const generateStaticParams = () => vegetables.map((v) => ({ id: v.id }));

export default async function ZukanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const veg = getVegetable(id);
  if (!veg) notFound();
  return (
    <Screen header={<BackHeader title="野菜図鑑" backHref="/zukan" />} footer="action">
      <ComingSoon name={`図鑑詳細：${veg.name}`} />
      <StickyActionBar>
        <Button variant="outline" size="lg" className="flex-1">
          食べたい
        </Button>
        <ButtonLink href={`/buy/${veg.id}`} size="lg" className="flex-1">
          育てたい（種）
        </ButtonLink>
      </StickyActionBar>
    </Screen>
  );
}
