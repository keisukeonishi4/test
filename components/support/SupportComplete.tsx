"use client";
import { useSearchParams } from "next/navigation";
import { MockComplete } from "@/components/MockComplete";
import type { Project } from "@/lib/types";

export function SupportComplete({ project }: { project: Project }) {
  const id = useSearchParams().get("plan");
  const plan = project.plans.find((p) => p.id === id) ?? project.plans[0];
  const corporate = plan.kind === "corporate";
  return (
    <MockComplete
      title={corporate ? "お問い合わせを受け付けました" : "応援ありがとうございます"}
      primary={{ href: "/support", label: "プロジェクトに戻る" }}
      secondary={{ href: "/", label: "ホームへ" }}
    >
      {corporate
        ? `「${plan.title}」について、担当者からご連絡します（モック）。`
        : `${plan.label}「${plan.title}」で応援しました（モック）。${plan.description}をお届けします。`}
    </MockComplete>
  );
}
