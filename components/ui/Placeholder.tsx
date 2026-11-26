// 画像のかわり。グレーの枠にラベルを出す
export function Placeholder({
  label,
  className = "",
  rounded = "rounded-xl",
  tone = "ph",
}: {
  label?: string;
  className?: string;
  rounded?: string;
  tone?: "ph" | "dark";
}) {
  const toneClass = tone === "dark" ? "bg-ph-deep text-muted" : "bg-ph text-muted";
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label ? `画像（仮）：${label}` : undefined}
      aria-hidden={label ? undefined : true}
      className={`flex items-center justify-center p-2 text-center text-sm ${toneClass} ${rounded} ${className}`}
    >
      {label}
    </div>
  );
}
