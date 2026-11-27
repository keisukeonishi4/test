import type { Metadata } from "next";
import { Suspense } from "react";
import { Screen } from "@/components/layout/Screen";
import { BackHeader } from "@/components/layout/Headers";
import { MarketView } from "@/components/market/MarketView";
import { chefShops, listings, marketFeeRate, vegetables } from "@/lib/data";

export const metadata: Metadata = { title: "おすそわけマーケット" };

export default function MarketPage() {
  return (
    <Screen header={<BackHeader title="おすそわけマーケット" backHref="/" />}>
      <Suspense>
        <MarketView listings={listings} chefShops={chefShops} vegetables={vegetables} feeRate={marketFeeRate} />
      </Suspense>
    </Screen>
  );
}
