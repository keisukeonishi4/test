import type { Metadata } from "next";
import { Screen } from "@/components/layout/Screen";
import { BackHeader } from "@/components/layout/Headers";
import { MockComplete } from "@/components/MockComplete";

export const metadata: Metadata = { title: "購入完了" };

export default function MarketCompletePage() {
  return (
    <Screen header={<BackHeader title="購入完了" backHref="/market" />} footer="none">
      <MockComplete
        title="ご購入ありがとうございます"
        primary={{ href: "/market", label: "マーケットに戻る" }}
        secondary={{ href: "/community?tab=cook", label: "レシピを探す" }}
      >
        出品者から受け渡しの連絡が届きます（モック）。届いたら、レシピの投稿もお待ちしています。
      </MockComplete>
    </Screen>
  );
}
