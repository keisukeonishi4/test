import type { Metadata } from "next";
import { Screen } from "@/components/layout/Screen";
import { TabHeader, HeaderIconLink } from "@/components/layout/Headers";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "マイページ" };

export default function MyPage() {
  return (
    <Screen header={<TabHeader title="マイページ" actions={<HeaderIconLink href="/mypage" icon="gear" label="設定（モック）" />} />}>
      <ComingSoon name="マイページ" />
    </Screen>
  );
}
