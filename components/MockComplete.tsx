import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

// 決済・支援・投稿などの完了画面（モック）。実際には何も送信しない
export function MockComplete({
  title,
  children,
  primary,
  secondary,
}: {
  title: string;
  children?: ReactNode;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col items-center px-6 pt-14 text-center" role="status">
      <div className="flex size-20 items-center justify-center rounded-full bg-accent-wash text-accent">
        <Icon name="check" className="size-10" />
      </div>
      <h2 className="mt-6 text-2xl font-bold">{title}</h2>
      <div className="mt-3 text-muted">{children}</div>
      <p className="mt-4 rounded-lg bg-wash px-3 py-2 text-sm text-muted">
        これはプロトタイプです。実際の決済・送信は行われていません。
      </p>
      <div className="mt-8 flex w-full flex-col gap-3">
        <ButtonLink href={primary.href} size="lg">
          {primary.label}
        </ButtonLink>
        {secondary && (
          <ButtonLink href={secondary.href} variant="outline" size="lg">
            {secondary.label}
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
