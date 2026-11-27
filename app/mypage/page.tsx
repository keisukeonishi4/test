import type { Metadata } from "next";
import { Screen } from "@/components/layout/Screen";
import { TabHeader, HeaderIconLink } from "@/components/layout/Headers";
import { MyPageView } from "@/components/mypage/MyPageView";
import { user, vegetables } from "@/lib/data";

export const metadata: Metadata = { title: "マイページ" };

export default function MyPage() {
  return (
    <Screen header={<TabHeader title="マイページ" actions={<HeaderIconLink href="#settings" icon="gear" label="通知の設定" />} />}>
      <MyPageView user={user} vegetables={vegetables} />
    </Screen>
  );
}
