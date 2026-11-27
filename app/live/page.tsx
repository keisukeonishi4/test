import type { Metadata } from "next";
import { Screen } from "@/components/layout/Screen";
import { LiveView } from "@/components/live/LiveView";
import { getVegetable, live, vegetables } from "@/lib/data";

export const metadata: Metadata = { title: "ライブ配信" };

export default function LivePage() {
  const veg = getVegetable(live.vegetableId) ?? vegetables[0];
  return (
    <Screen>
      <LiveView live={live} veg={veg} />
    </Screen>
  );
}
