import type { Metadata } from "next";
import { Screen } from "@/components/layout/Screen";
import { TabHeader } from "@/components/layout/Headers";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "みんなの畑と台所" };

export default function CommunityPage() {
  return (
    <Screen
      bg="wash"
      header={
        <TabHeader
          title="みんなの畑と台所"
          actions={
            <ButtonLink href="/recipe/new" size="sm" className="rounded-full">
              <Icon name="plus" className="size-5" />
              投稿する
            </ButtonLink>
          }
        />
      }
    >
      <ComingSoon name="コミュニティ" />
    </Screen>
  );
}
