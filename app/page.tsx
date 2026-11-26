import { Screen } from "@/components/layout/Screen";
import { TabHeader, HeaderIconLink } from "@/components/layout/Headers";
import { ComingSoon } from "@/components/ComingSoon";

export default function HomePage() {
  return (
    <Screen
      header={
        <TabHeader
          title="野菜遺産"
          logo
          actions={
            <>
              <HeaderIconLink href="/zukan" icon="search" label="図鑑で野菜を探す" />
              <HeaderIconLink href="/mypage" icon="bell" label="お知らせ" />
            </>
          }
        />
      }
    >
      <ComingSoon name="ホーム" />
    </Screen>
  );
}
