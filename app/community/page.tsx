import type { Metadata } from "next";
import { Suspense } from "react";
import { Screen } from "@/components/layout/Screen";
import { TabHeader } from "@/components/layout/Headers";
import { CommunityView } from "@/components/community/CommunityView";
import { PostButton } from "@/components/community/PostButton";
import { posts, recipes, vegetables } from "@/lib/data";

export const metadata: Metadata = { title: "みんなの畑と台所" };

export default function CommunityPage() {
  return (
    <Screen bg="wash" header={<TabHeader title="みんなの畑と台所" actions={<PostButton vegetables={vegetables} />} />}>
      <Suspense>
        <CommunityView posts={posts} recipes={recipes} vegetables={vegetables} />
      </Suspense>
    </Screen>
  );
}
