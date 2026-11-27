"use client";
import { useState } from "react";
import { Illust } from "@/components/illust/Illust";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { StickyActionBar } from "@/components/layout/StickyActionBar";
import { pct, yen } from "@/lib/format";
import type { Project } from "@/lib/types";

export function SupportView({ project }: { project: Project }) {
  const [plan, setPlan] = useState(project.plans[0].id);
  const [notify, setNotify] = useState(false);
  const rate = pct(project.raised, project.goal);

  return (
    <>
      <Illust kind="kids" label="子ども食堂で野菜を食べる様子（イメージ）" rounded="" className="aspect-[16/9]" />

      <div className="space-y-6 px-4 pt-5">
        <div>
          <h2 className="text-2xl leading-snug font-black">{project.title}</h2>
          <p className="mt-2 text-sm text-muted">
            種が売れないと育てる人が減り、品種そのものが消えていきます。応援が、子ども食堂のごはんと、次の世代の種まきにつながります。
          </p>
        </div>

        <div>
          <div className="flex items-end justify-between gap-2">
            <p className="text-3xl font-black">{yen(project.raised)}</p>
            <p className="text-sm text-muted">目標 {yen(project.goal)}</p>
          </div>
          <div className="mt-2">
            <ProgressBar value={project.raised} max={project.goal} label={`達成 ${rate}%`} />
          </div>
          <p className="mt-2 text-sm text-muted">
            達成 {rate}%・支援者 {project.supporters}人・残り {project.daysLeft}日・届けた種 {project.seedsDelivered}袋
          </p>
        </div>

        <fieldset>
          <legend className="mb-3 font-bold">応援のしかた</legend>
          <div className="space-y-3">
            {project.plans.map((p) => {
              const on = plan === p.id;
              return (
                <label
                  key={p.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition ${
                    on ? "border-accent bg-accent-wash" : "border-line hover:bg-wash"
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={p.id}
                    checked={on}
                    onChange={() => setPlan(p.id)}
                    className="mt-1 size-6 shrink-0 accent-accent"
                  />
                  <span>
                    <span className="block">
                      <strong>{p.label}</strong> {p.title}
                    </span>
                    <span className="block text-sm text-muted">{p.description}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <section aria-labelledby="next-plan" className="flex flex-wrap items-center gap-3 rounded-2xl bg-wash p-4">
          <p id="next-plan" className="min-w-0 flex-1">
            <strong>次回構想</strong>：{project.next.title}
            <br />
            <span className="text-sm">{project.next.description}</span>
          </p>
          <button
            type="button"
            aria-pressed={notify}
            onClick={() => setNotify((v) => !v)}
            className={`inline-flex min-h-12 items-center gap-1 rounded-xl border-2 px-4 font-bold ${
              notify ? "border-accent bg-accent text-white" : "border-ink bg-paper"
            }`}
          >
            {notify && <Icon name="check" className="size-4" />}
            {notify ? "通知を受け取る設定済み" : "通知を受け取る"}
          </button>
        </section>
      </div>

      <StickyActionBar>
        <ButtonLink href={`/support/complete?plan=${plan}`} size="lg" className="flex-1">
          このプランで応援する
        </ButtonLink>
      </StickyActionBar>
    </>
  );
}
