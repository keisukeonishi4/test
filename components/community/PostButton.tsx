"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { POINTS } from "@/lib/format";
import type { Vegetable } from "@/lib/types";

type Step = "menu" | "diary" | "question" | "done";

// ヘッダーの「＋投稿する」。何を投稿するかを選ぶダイアログ（投稿はモック）
export function PostButton({ vegetables }: { vegetables: Vegetable[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<Step>("menu");
  const [doneMsg, setDoneMsg] = useState("");

  const open = () => {
    setStep("menu");
    ref.current?.showModal();
  };
  const close = () => ref.current?.close();
  const finish = (msg: string) => {
    setDoneMsg(msg);
    setStep("done");
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="inline-flex min-h-11 items-center gap-1 rounded-full bg-accent px-4 font-bold text-white hover:brightness-110"
      >
        <Icon name="plus" className="size-5" />
        投稿する
      </button>
      <dialog
        ref={ref}
        aria-labelledby="post-dialog-title"
        className="m-auto w-[min(92vw,560px)] rounded-2xl p-0 backdrop:bg-ink/50"
        onClick={(e) => e.target === ref.current && close()}
      >
        <div className="space-y-4 p-5">
          <div className="flex items-center justify-between">
            <h2 id="post-dialog-title" className="text-lg font-bold">
              {step === "menu" && "何を投稿しますか？"}
              {step === "diary" && "栽培日記を書く"}
              {step === "question" && "質問する"}
              {step === "done" && "投稿しました"}
            </h2>
            <button type="button" onClick={close} aria-label="閉じる" className="flex size-11 items-center justify-center rounded-full hover:bg-wash">
              <Icon name="close" />
            </button>
          </div>

          {step === "menu" && (
            <ul className="space-y-2">
              <li>
                <MenuItem onClick={() => setStep("diary")} title="栽培日記を書く" sub="今日の様子や工夫を記録。育て方まとめにも役立ちます" />
              </li>
              <li>
                <Link href="/recipe/new" className="flex min-h-16 items-center gap-3 rounded-xl border-2 border-line p-3 hover:bg-wash">
                  <span className="flex-1">
                    <span className="block font-bold">レシピを投稿する</span>
                    <span className="block text-sm text-muted">投稿で {POINTS.recipe}pt</span>
                  </span>
                  <Icon name="chevron" className="size-5 text-muted" />
                </Link>
              </li>
              <li>
                <MenuItem onClick={() => setStep("question")} title="質問する" sub="育てる仲間と生産者が答えてくれます" />
              </li>
            </ul>
          )}

          {(step === "diary" || step === "question") && (
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                finish(step === "diary" ? "栽培日記を投稿しました（モック）。" : "質問を投稿しました（モック）。回答がつくとお知らせします。");
              }}
            >
              <div>
                <label htmlFor="post-veg" className="mb-1 block text-sm font-bold">
                  野菜
                </label>
                <select id="post-veg" className="min-h-12 w-full rounded-xl border-2 border-strong bg-paper px-3">
                  {vegetables.map((v) => (
                    <option key={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>
              {step === "question" && (
                <div>
                  <label htmlFor="post-title" className="mb-1 block text-sm font-bold">
                    質問のタイトル
                  </label>
                  <input id="post-title" required className="min-h-12 w-full rounded-xl border-2 border-strong px-3" placeholder="例：葉が黄色くなってきました" />
                </div>
              )}
              <div>
                <label htmlFor="post-body" className="mb-1 block text-sm font-bold">
                  {step === "diary" ? "今日の様子・工夫したこと" : "くわしく"}
                </label>
                <textarea id="post-body" required rows={4} className="w-full rounded-xl border-2 border-strong p-3" />
              </div>
              {step === "diary" && (
                <button type="button" className="flex min-h-12 w-full items-center justify-center gap-1 rounded-xl border-2 border-dashed border-strong text-muted">
                  <Icon name="plus" className="size-5" />
                  写真を追加（モック）
                </button>
              )}
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setStep("menu")} className="flex-1">
                  戻る
                </Button>
                <Button type="submit" className="flex-1">
                  投稿する
                </Button>
              </div>
            </form>
          )}

          {step === "done" && (
            <div role="status" className="space-y-4 text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent-wash text-accent">
                <Icon name="check" className="size-8" />
              </div>
              <p>{doneMsg}</p>
              <p className="text-xs text-muted">プロトタイプのため、実際には投稿されません。</p>
              <Button onClick={close} className="w-full">
                閉じる
              </Button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}

function MenuItem({ onClick, title, sub }: { onClick: () => void; title: string; sub: string }) {
  return (
    <button type="button" onClick={onClick} className="flex min-h-16 w-full items-center gap-3 rounded-xl border-2 border-line p-3 text-left hover:bg-wash">
      <span className="flex-1">
        <span className="block font-bold">{title}</span>
        <span className="block text-sm text-muted">{sub}</span>
      </span>
      <Icon name="chevron" className="size-5 text-muted" />
    </button>
  );
}
