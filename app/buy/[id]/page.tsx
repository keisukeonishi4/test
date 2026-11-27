import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Screen } from "@/components/layout/Screen";
import { BackHeader } from "@/components/layout/Headers";
import { BuyView } from "@/components/buy/BuyView";
import { getStoresFor, getVegetable, vegetables } from "@/lib/data";

export const generateStaticParams = () => vegetables.map((v) => ({ id: v.id }));

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const veg = getVegetable(id);
  return { title: veg ? `${veg.name}の種を買う` : "種を買う" };
}

export default async function BuyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const veg = getVegetable(id);
  if (!veg) notFound();
  return (
    <Screen header={<BackHeader title="種を買う" backHref={`/zukan/${veg.id}`} />} footer="none">
      <Suspense>
        <BuyView veg={veg} stores={getStoresFor(veg)} />
      </Suspense>
    </Screen>
  );
}
