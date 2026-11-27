"use client";
import { useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { Tabs, useQueryTab } from "@/components/ui/Tabs";
import { Segmented, useQueryValue } from "@/components/ui/Segmented";

export function ChipDemo() {
  const [f, setF] = useState("near");
  const [s, setS] = useState<string[]>(["a"]);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {[
          ["near", "近い順"],
          ["veg", "野菜で絞る"],
          ["ship", "発送OK"],
        ].map(([id, label]) => (
          <Chip key={id} selected={f === id} onClick={() => setF(id)}>
            {label}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["a", "b"].map((id) => (
          <Chip
            key={id}
            tone="select"
            selected={s.includes(id)}
            onClick={() => setS((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))}
          >
            [野菜名{id.toUpperCase()}]
          </Chip>
        ))}
      </div>
    </div>
  );
}

export function TabsDemo() {
  const ids = ["grow", "cook", "qa"];
  const cur = useQueryTab("tab", ids, "grow");
  return (
    <Tabs
      label="サンプルのタブ"
      current={cur}
      items={[
        { id: "grow", label: "育てる" },
        { id: "cook", label: "つくる" },
        { id: "qa", label: "質問" },
      ]}
    >
      <p className="py-4 text-muted">選択中：{cur}（URLの ?tab= と連動。←→キーでも切り替え）</p>
    </Tabs>
  );
}

export function SegmentedDemo() {
  const ids = ["store", "ec"] as const;
  const cur = useQueryValue<(typeof ids)[number]>("mode", ids, "store");
  return (
    <Segmented
      param="mode"
      label="サンプルの切り替え"
      current={cur}
      items={[
        { id: "store", label: "近くの販売所（おトク）" },
        { id: "ec", label: "ネットで買う" },
      ]}
    />
  );
}
