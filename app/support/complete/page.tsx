import type { Metadata } from "next";
import { Suspense } from "react";
import { Screen } from "@/components/layout/Screen";
import { BackHeader } from "@/components/layout/Headers";
import { SupportComplete } from "@/components/support/SupportComplete";
import { projects } from "@/lib/data";

export const metadata: Metadata = { title: "応援完了" };

export default function SupportCompletePage() {
  return (
    <Screen header={<BackHeader title="応援プロジェクト" backHref="/support" />} footer="none">
      <Suspense>
        <SupportComplete project={projects[0]} />
      </Suspense>
    </Screen>
  );
}
