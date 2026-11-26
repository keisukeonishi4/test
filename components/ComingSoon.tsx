import { Placeholder } from "@/components/ui/Placeholder";

// まだ実装していない画面の仮表示（共通レイアウト確認用）
export function ComingSoon({ name }: { name: string }) {
  return (
    <div className="space-y-4 p-4">
      <Placeholder label={`${name}（これから実装）`} className="h-48" />
      <p className="text-muted">この画面は共通レイアウトの確認用の仮表示です。順番に実装していきます。</p>
    </div>
  );
}
