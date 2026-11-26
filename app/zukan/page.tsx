import type { Metadata } from "next";
import { Screen } from "@/components/layout/Screen";
import { TabHeader } from "@/components/layout/Headers";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "野菜図鑑" };

export default function ZukanPage() {
  return (
    <Screen header={<TabHeader title="野菜図鑑" />}>
      <ComingSoon name="野菜図鑑 一覧" />
    </Screen>
  );
}
