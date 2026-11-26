import Link from "next/link";
import type { ReactNode } from "react";

export function Section({
  title,
  more,
  children,
  className = "",
}: {
  title: string;
  more?: { href: string; label: string };
  children: ReactNode;
  className?: string;
}) {
  const id = `sec-${title}`;
  return (
    <section aria-labelledby={id} className={`px-4 ${className}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 id={id} className="text-lg font-bold">
          {title}
        </h2>
        {more && (
          <Link href={more.href} className="inline-flex min-h-11 items-center text-accent underline underline-offset-4">
            {more.label}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

export function Card({ children, className = "", as: As = "div" }: { children: ReactNode; className?: string; as?: "div" | "article" | "li" }) {
  return <As className={`rounded-2xl border-2 border-line bg-paper ${className}`}>{children}</As>;
}
