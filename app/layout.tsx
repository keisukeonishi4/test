import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { MockStoreProvider } from "@/lib/mock-store";
import "./globals.css";

const noto = Noto_Sans_JP({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: { default: "野菜遺産｜伝統野菜を育てて食べよう（プロトタイプ）", template: "%s｜野菜遺産" },
  description: "いろんな伝統野菜と出会い、育てて、食べて楽しむ。野菜遺産 公式サイトのプロトタイプです。",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={noto.variable}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-paper focus:p-3"
        >
          本文へスキップ
        </a>
        <MockStoreProvider>
          <div className="mx-auto min-h-dvh max-w-app bg-paper md:border-x-2 md:border-line">{children}</div>
        </MockStoreProvider>
      </body>
    </html>
  );
}
