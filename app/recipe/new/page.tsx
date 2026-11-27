import type { Metadata } from "next";
import { Screen } from "@/components/layout/Screen";
import { RecipeForm } from "@/components/recipe/RecipeForm";
import { vegetables } from "@/lib/data";

export const metadata: Metadata = { title: "レシピを投稿" };

export default function RecipeNewPage() {
  return (
    <Screen footer="action">
      <RecipeForm vegetables={vegetables} />
    </Screen>
  );
}
