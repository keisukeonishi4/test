import type { Metadata } from "next";
import { Screen } from "@/components/layout/Screen";
import { TabHeader } from "@/components/layout/Headers";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "ライブ配信" };

export default function LivePage() {
  return (
    <Screen header={<TabHeader title="ライブ" />}>
      <ComingSoon name="ライブ配信" />
    </Screen>
  );
}
