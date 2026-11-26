import type { Metadata } from "next";
import { Screen } from "@/components/layout/Screen";
import { CloseHeader } from "@/components/layout/Headers";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "レシピを投稿" };

export default function RecipeNewPage() {
  return (
    <Screen header={<CloseHeader title="レシピを投稿" closeHref="/community?tab=cook" />} footer="none">
      <ComingSoon name="レシピ投稿" />
    </Screen>
  );
}
