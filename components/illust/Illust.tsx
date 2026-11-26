import type { VegColor, VegShape } from "@/lib/types";
import { c, vegFill } from "./colors";
import { VegSectionG, VegShapeG } from "./Veg";

export type IllustKind =
  | "veg" // 野菜まるごと
  | "section" // 断面
  | "field" // 畑
  | "dish" // 料理
  | "live" // シェフの配信
  | "seed" // 種袋
  | "market" // かごに入った収穫野菜
  | "kids" // 子ども食堂の食卓
  | "sprout" // 栽培日記（プランターの芽）
  | "map" // 地図
  | "chef"; // シェフ（アバター）

type VegArt = { shape: VegShape; color: VegColor };

const DEFAULT_VEG: VegArt = { shape: "turnip", color: "red" };

// 背景色と、枠いっぱいに敷くか（slice）中央に収めるか（meet）
const meta: Record<IllustKind, { bg: string; fit: "meet" | "slice"; wide?: boolean }> = {
  veg: { bg: "mint", fit: "meet" },
  section: { bg: "cream", fit: "meet" },
  field: { bg: "sky", fit: "slice", wide: true },
  dish: { bg: "table", fit: "meet" },
  live: { bg: "sky", fit: "slice", wide: true },
  seed: { bg: "cream", fit: "meet" },
  market: { bg: "mint", fit: "meet" },
  kids: { bg: "table", fit: "slice" },
  sprout: { bg: "sky", fit: "meet" },
  map: { bg: "mint", fit: "slice" },
  chef: { bg: "mint", fit: "meet" },
};

// 畑・ライブは横長（320x180）で描く
function Field({ veg }: { veg: VegArt }) {
  return (
    <g>
      <rect x="0" y="0" width="320" height="180" fill={c("sky")} />
      <circle cx="272" cy="36" r="20" fill={c("yellow")} opacity="0.9" />
      <rect x="0" y="84" width="320" height="96" fill={c("soil")} />
      {[100, 126, 154].map((y, i) => (
        <rect key={y} x="0" y={y} width="320" height={8 + i * 3} fill={c("soil-dark")} opacity="0.5" />
      ))}
      {[24, 66, 108, 150, 192, 234, 276, 304].map((x, i) => (
        <g key={x} transform={`translate(${x} ${i % 2 ? 96 : 122})`}>
          <ellipse cx="-5" cy="-7" rx="4.5" ry="11" fill={c("leaf")} transform="rotate(-30 -5 -7)" />
          <ellipse cx="5" cy="-7" rx="4.5" ry="11" fill={c("leaf-dark")} transform="rotate(30 5 -7)" />
        </g>
      ))}
      <VegShapeG shape={veg.shape} color={veg.color} x={20} y={34} scale={0.46} />
    </g>
  );
}

function Dish({ veg }: { veg: VegArt }) {
  const { body, inner } = vegFill[veg.color];
  return (
    <g>
      <ellipse cx="100" cy="112" rx="84" ry="70" fill="#000" opacity="0.08" />
      <circle cx="100" cy="104" r="78" fill={c("plate")} />
      <circle cx="100" cy="104" r="62" fill="none" stroke={c("root")} strokeWidth="4" />
      {[
        [78, 90, -20],
        [112, 82, 25],
        [122, 116, 60],
        [86, 124, 10],
      ].map(([x, y, r]) => (
        <g key={`${x}-${y}`} transform={`rotate(${r} ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx="20" ry="14" fill={body} />
          <ellipse cx={x} cy={y} rx="13" ry="8" fill={inner} />
        </g>
      ))}
      {[
        [104, 104],
        [96, 72],
        [130, 96],
        [70, 110],
      ].map(([x, y]) => (
        <ellipse key={`${x}${y}`} cx={x} cy={y} rx="6" ry="3" fill={c("leaf")} transform={`rotate(30 ${x} ${y})`} />
      ))}
      <rect x="176" y="40" width="6" height="120" rx="3" fill={c("wood")} />
    </g>
  );
}

function ChefHat({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="-14" cy="-10" r="14" fill={c("plate")} />
      <circle cx="0" cy="-18" r="16" fill={c("plate")} />
      <circle cx="14" cy="-10" r="14" fill={c("plate")} />
      <rect x="-20" y="-6" width="40" height="18" rx="3" fill={c("plate")} />
      <rect x="-20" y="8" width="40" height="5" fill={c("root")} />
    </g>
  );
}

function Chef() {
  return (
    <g>
      <path d="M40 200 Q40 140 100 140 Q160 140 160 200Z" fill={c("plate")} />
      <path d="M100 140 L92 200 M100 140 L108 200" stroke={c("root")} strokeWidth="3" />
      <circle cx="100" cy="104" r="34" fill={c("table")} />
      <ChefHat x={100} y={70} s={1.3} />
      <path d="M86 116 Q100 126 114 116" stroke={c("ink")} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="88" cy="100" r="3" fill={c("ink")} />
      <circle cx="112" cy="100" r="3" fill={c("ink")} />
    </g>
  );
}

function Live({ veg }: { veg: VegArt }) {
  return (
    <g>
      <Field veg={veg} />
      <path d="M176 180 Q176 142 212 140 Q248 142 248 180Z" fill={c("plate")} />
      <circle cx="212" cy="120" r="19" fill={c("table")} />
      <ChefHat x={212} y={100} s={0.78} />
      <circle cx="205" cy="118" r="2.2" fill={c("ink")} />
      <circle cx="219" cy="118" r="2.2" fill={c("ink")} />
      <path d="M206 128 Q212 132 218 128" stroke={c("ink")} strokeWidth="2" fill="none" strokeLinecap="round" />
      <VegShapeG shape={veg.shape} color={veg.color} x={78} y={52} scale={0.26} />
    </g>
  );
}

function Seed({ veg }: { veg: VegArt }) {
  return (
    <g>
      <g transform="rotate(-6 100 104)">
        <rect x="52" y="30" width="96" height="146" rx="6" fill={c("plate")} stroke={c("wood")} strokeWidth="3" />
        <path d="M52 44 h96" stroke={c("wood")} strokeWidth="2" strokeDasharray="4 4" />
        <rect x="60" y="54" width="80" height="78" rx="4" fill={c("mint")} />
        <VegShapeG shape={veg.shape} color={veg.color} x={0} y={-7} scale={0.38} />
        <rect x="60" y="140" width="80" height="10" rx="2" fill={c("leaf-dark")} />
        <rect x="60" y="156" width="52" height="6" rx="2" fill={c("wood")} opacity="0.6" />
      </g>
      {[
        [158, 160],
        [166, 150],
        [150, 172],
        [172, 168],
      ].map(([x, y]) => (
        <ellipse key={`${x}${y}`} cx={x} cy={y} rx="4" ry="6" fill={c("soil")} transform={`rotate(40 ${x} ${y})`} />
      ))}
    </g>
  );
}

function Market({ veg }: { veg: VegArt }) {
  return (
    <g>
      <VegShapeG shape="greens" color="green" x={-38} y={-10} scale={0.55} />
      <VegShapeG shape={veg.shape} color={veg.color} x={0} y={-16} scale={0.6} />
      <VegShapeG shape="carrot" color="orange" x={40} y={-8} scale={0.52} />
      <path d="M30 104 h140 l-14 76 h-112z" fill={c("wood")} />
      {[118, 136, 154].map((y) => (
        <path key={y} d={`M${34 + (y - 104) * 0.2} ${y} h${132 - (y - 104) * 0.4}`} stroke="#000" strokeOpacity="0.15" strokeWidth="3" />
      ))}
      <path d="M30 104 Q100 40 170 104" stroke={c("wood")} strokeWidth="6" fill="none" />
    </g>
  );
}

function Kids({ veg }: { veg: VegArt }) {
  const { body } = vegFill[veg.color];
  const bowls = [
    [50, 70],
    [150, 70],
    [50, 140],
    [150, 140],
    [100, 105],
  ];
  return (
    <g>
      <rect x="-100" y="-50" width="400" height="300" fill={c("table")} />
      {[0, 40, 80, 120, 160, 200].map((x) => (
        <path key={x} d={`M${x - 100} -50 V250`} stroke={c("wood")} strokeOpacity="0.25" strokeWidth="2" transform="translate(100 0)" />
      ))}
      {bowls.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="26" fill={c("plate")} />
          <circle cx={x} cy={y} r="18" fill={i === 4 ? body : c("cream")} />
          {i !== 4 && <circle cx={x - 4} cy={y - 3} r="6" fill={body} />}
          {i !== 4 && <circle cx={x + 6} cy={y + 4} r="5" fill={c("leaf")} />}
          <rect x={x + 30} y={y - 16} width="4" height="34" rx="2" fill={c("wood")} />
        </g>
      ))}
    </g>
  );
}

function Sprout() {
  return (
    <g>
      <rect x="0" y="150" width="200" height="50" fill={c("cream")} />
      <path d="M52 110 h96 l-10 66 h-76z" fill={c("wood")} />
      <rect x="46" y="100" width="108" height="16" rx="4" fill={c("soil-dark")} />
      <path d="M100 104 V62" stroke={c("leaf-dark")} strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="80" cy="64" rx="20" ry="10" fill={c("leaf")} transform="rotate(-20 80 64)" />
      <ellipse cx="120" cy="56" rx="22" ry="11" fill={c("leaf-light")} transform="rotate(20 120 56)" />
      <circle cx="160" cy="36" r="14" fill={c("yellow")} opacity="0.9" />
      <path d="M30 40 v10 M24 46 h12" stroke={c("plate")} strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function MapG() {
  return (
    <g>
      <rect x="-100" y="-50" width="400" height="300" fill={c("mint")} />
      <path d="M-100 150 Q40 120 120 160 T300 140" stroke={c("sky")} strokeWidth="18" fill="none" />
      <g stroke={c("plate")} strokeWidth="8" fill="none" strokeLinecap="round">
        <path d="M-100 70 H300" />
        <path d="M60 -50 V250" />
        <path d="M150 -50 L120 250" />
        <path d="M-100 20 L300 110" strokeWidth="5" />
      </g>
      {[
        [10, 100, 30, 26],
        [80, 30, 40, 24],
        [168, 30, 50, 30],
        [80, 90, 30, 40],
        [180, 170, 40, 30],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill={c("leaf-light")} opacity="0.45" />
      ))}
    </g>
  );
}

// 画像のかわりのイラスト。枠いっぱいに背景色を敷き、絵を中央に置く
export function Illust({
  kind,
  veg = DEFAULT_VEG,
  label,
  className = "",
  rounded = "rounded-xl",
}: {
  kind: IllustKind;
  veg?: VegArt;
  label: string;
  className?: string;
  rounded?: string;
}) {
  const m = meta[kind];
  return (
    <div
      role="img"
      aria-label={`イラスト：${label}`}
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{ backgroundColor: c(m.bg) }}
    >
      <svg
        viewBox={m.wide ? "0 0 320 180" : "0 0 200 200"}
        preserveAspectRatio={`xMidYMid ${m.fit}`}
        className="absolute inset-0 size-full"
        aria-hidden="true"
        focusable="false"
      >
        {kind === "veg" && (
          <>
            <ellipse cx="100" cy="190" rx="54" ry="8" fill="#000" opacity="0.08" />
            <VegShapeG shape={veg.shape} color={veg.color} />
          </>
        )}
        {kind === "section" && <VegSectionG color={veg.color} />}
        {kind === "field" && <Field veg={veg} />}
        {kind === "dish" && <Dish veg={veg} />}
        {kind === "live" && <Live veg={veg} />}
        {kind === "seed" && <Seed veg={veg} />}
        {kind === "market" && <Market veg={veg} />}
        {kind === "kids" && <Kids veg={veg} />}
        {kind === "sprout" && <Sprout />}
        {kind === "map" && <MapG />}
        {kind === "chef" && <Chef />}
      </svg>
    </div>
  );
}
