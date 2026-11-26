import type { Metadata } from "next";
import { Screen } from "@/components/layout/Screen";
import { TabHeader } from "@/components/layout/Headers";
import { ZukanList } from "@/components/zukan/ZukanList";
import { vegetables } from "@/lib/data";

export const metadata: Metadata = { title: "野菜図鑑" };

export default function ZukanPage() {
  return (
    <Screen header={<TabHeader title="野菜図鑑" />}>
      <ZukanList vegetables={vegetables} />
    </Screen>
  );
}
