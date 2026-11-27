import type { Metadata } from "next";
import { Screen } from "@/components/layout/Screen";
import { BackHeader } from "@/components/layout/Headers";
import { SupportView } from "@/components/support/SupportView";
import { projects } from "@/lib/data";

export const metadata: Metadata = { title: "応援プロジェクト" };

export default function SupportPage() {
  return (
    <Screen header={<BackHeader title="応援プロジェクト" backHref="/" />} footer="action">
      <SupportView project={projects[0]} />
    </Screen>
  );
}
