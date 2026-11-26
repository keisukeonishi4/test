import type { Metadata } from "next";
import { Screen } from "@/components/layout/Screen";
import { BackHeader } from "@/components/layout/Headers";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "おすそわけマーケット" };

export default function MarketPage() {
  return (
    <Screen header={<BackHeader title="おすそわけマーケット" backHref="/" />}>
      <ComingSoon name="おすそわけマーケット" />
    </Screen>
  );
}
