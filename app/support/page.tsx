import type { Metadata } from "next";
import { Screen } from "@/components/layout/Screen";
import { BackHeader } from "@/components/layout/Headers";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "応援プロジェクト" };

export default function SupportPage() {
  return (
    <Screen header={<BackHeader title="応援プロジェクト" backHref="/" />} footer="none">
      <ComingSoon name="応援プロジェクト" />
    </Screen>
  );
}
