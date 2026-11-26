import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

const bar = "sticky top-0 z-30 flex min-h-14 items-center gap-2 border-b-2 border-line bg-paper/95 px-2 backdrop-blur";

// タブの画面：タイトル＋右側の操作
export function TabHeader({ title, actions, logo = false }: { title: string; actions?: ReactNode; logo?: boolean }) {
  return (
    <header className={bar}>
      {logo ? (
        <Link href="/" className="flex min-h-11 items-center px-2 text-2xl font-black tracking-wide">
          <h1>{title}</h1>
        </Link>
      ) : (
        <h1 className="px-2 text-xl font-bold">{title}</h1>
      )}
      <div className="ml-auto flex items-center gap-1">{actions}</div>
    </header>
  );
}

// 詳細の画面：＜ 戻る＋タイトル
export function BackHeader({ title, backHref, actions }: { title: string; backHref: string; actions?: ReactNode }) {
  return (
    <header className={bar}>
      <Link href={backHref} aria-label="戻る" className="flex size-11 items-center justify-center rounded-full hover:bg-wash">
        <Icon name="back" />
      </Link>
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="ml-auto flex items-center gap-1">{actions}</div>
    </header>
  );
}

// フォームの画面：× 閉じる＋タイトル＋右操作
export function CloseHeader({ title, closeHref, action }: { title: string; closeHref: string; action?: ReactNode }) {
  return (
    <header className={bar}>
      <Link href={closeHref} aria-label="閉じる" className="flex size-11 items-center justify-center rounded-full hover:bg-wash">
        <Icon name="close" />
      </Link>
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="ml-auto flex items-center">{action}</div>
    </header>
  );
}

// ヘッダー右側のアイコンボタン／リンク
export function HeaderIconLink({ href, icon, label }: { href: string; icon: IconName; label: string }) {
  return (
    <Link href={href} aria-label={label} className="flex size-11 items-center justify-center rounded-full hover:bg-wash">
      <Icon name={icon} />
    </Link>
  );
}
