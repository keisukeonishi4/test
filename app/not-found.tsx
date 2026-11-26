import { Screen } from "@/components/layout/Screen";
import { TabHeader } from "@/components/layout/Headers";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Screen header={<TabHeader title="野菜遺産" logo />}>
      <div className="space-y-6 p-6 text-center">
        <h2 className="text-xl font-bold">ページが見つかりません</h2>
        <ButtonLink href="/">ホームへ戻る</ButtonLink>
      </div>
    </Screen>
  );
}
