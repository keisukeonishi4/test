import type { VegColor, VegShape } from "@/lib/types";
import { c, vegFill } from "./colors";

// 野菜1つを描く <g>。200x200 の座標系で中央に置く。実在品種ではなく形と色の組み合わせ
export function VegShapeG({ shape, color, x = 0, y = 0, scale = 1 }: { shape: VegShape; color: VegColor; x?: number; y?: number; scale?: number }) {
  const body = vegFill[color].body;
  const leaves = (
    <g fill={c("leaf")}>
      <ellipse cx="86" cy="52" rx="10" ry="26" transform="rotate(-25 86 52)" />
      <ellipse cx="100" cy="46" rx="10" ry="30" fill={c("leaf-dark")} />
      <ellipse cx="114" cy="52" rx="10" ry="26" transform="rotate(25 114 52)" />
    </g>
  );
  const hi = <ellipse cx="84" cy="108" rx="8" ry="16" fill="#fff" opacity="0.28" transform="rotate(20 84 108)" />;
  const shapes: Record<VegShape, React.ReactNode> = {
    turnip: (
      <>
        {leaves}
        <path d="M100 168 Q102 182 100 194" stroke={body} strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="100" cy="122" r="46" fill={body} />
        <ellipse cx="100" cy="80" rx="16" ry="6" fill={c("leaf-light")} opacity="0.7" />
        {hi}
      </>
    ),
    daikon: (
      <>
        {leaves}
        <path d="M76 76 Q100 62 124 76 L114 182 Q100 198 86 182 Z" fill={body} />
        <path d="M77 76 Q100 64 123 76 L121 98 Q100 92 79 98 Z" fill={c("leaf-light")} opacity="0.75" />
        <path d="M90 120 h10 M104 146 h8 M92 166 h8" stroke={c("soil")} strokeWidth="2" opacity="0.35" strokeLinecap="round" />
      </>
    ),
    eggplant: (
      <>
        <path d="M100 52 Q140 70 142 128 Q144 180 100 186 Q56 180 60 130 Q64 84 100 52Z" fill={body} transform="rotate(12 100 120)" />
        <path d="M78 58 L100 40 L122 58 L112 66 L100 58 L88 66Z" fill={c("leaf-dark")} transform="rotate(12 100 120)" />
        <rect x="96" y="22" width="8" height="22" rx="3" fill={c("leaf-dark")} transform="rotate(12 100 120)" />
        <ellipse cx="82" cy="112" rx="7" ry="24" fill="#fff" opacity="0.22" transform="rotate(12 100 120)" />
      </>
    ),
    squash: (
      <>
        <rect x="94" y="46" width="12" height="22" rx="4" fill={c("leaf-dark")} />
        <ellipse cx="100" cy="122" rx="70" ry="52" fill={body} />
        <g fill="none" stroke="#000" strokeOpacity="0.14" strokeWidth="3">
          <ellipse cx="100" cy="122" rx="22" ry="52" />
          <ellipse cx="100" cy="122" rx="46" ry="52" />
        </g>
        <ellipse cx="70" cy="104" rx="10" ry="18" fill="#fff" opacity="0.25" />
      </>
    ),
    carrot: (
      <>
        {leaves}
        <path d="M72 76 Q100 66 128 76 Q116 140 100 192 Q84 140 72 76Z" fill={body} />
        <path d="M84 102 h12 M104 122 h12 M88 144 h10" stroke="#000" strokeOpacity="0.15" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
    chili: (
      <>
        <path d="M70 60 Q96 54 112 62 Q150 92 148 150 Q146 176 132 186 Q128 140 100 106 Q78 84 70 60Z" fill={body} />
        <path d="M60 52 Q72 46 86 56 L80 66 Q70 60 64 64Z" fill={c("leaf-dark")} />
        <path d="M52 40 Q58 46 64 54" stroke={c("leaf-dark")} strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M110 84 Q130 104 134 140" stroke="#fff" strokeOpacity="0.3" strokeWidth="6" fill="none" strokeLinecap="round" />
      </>
    ),
    greens: (
      <>
        <g fill={c("root")}>
          <rect x="86" y="120" width="8" height="66" rx="4" transform="rotate(-8 90 150)" />
          <rect x="96" y="118" width="8" height="70" rx="4" />
          <rect x="106" y="120" width="8" height="66" rx="4" transform="rotate(8 110 150)" />
        </g>
        <ellipse cx="72" cy="92" rx="24" ry="44" fill={c("leaf")} transform="rotate(-24 72 92)" />
        <ellipse cx="128" cy="92" rx="24" ry="44" fill={c("leaf")} transform="rotate(24 128 92)" />
        <ellipse cx="100" cy="76" rx="26" ry="52" fill={body} />
        <path d="M100 40 V124" stroke={c("root")} strokeWidth="3" opacity="0.8" />
      </>
    ),
    cucumber: (
      <>
        <rect x="40" y="84" width="128" height="40" rx="20" fill={body} transform="rotate(-30 100 104)" />
        <g fill={c("leaf-light")} transform="rotate(-30 100 104)">
          {[60, 80, 100, 120, 140].map((x) => (
            <circle key={x} cx={x} cy={x % 40 === 0 ? 96 : 110} r="2.5" />
          ))}
        </g>
        <path d="M150 60 Q162 50 168 40" stroke={c("leaf-dark")} strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="44" cy="148" r="8" fill={c("yellow")} />
      </>
    ),
  };
  return <g transform={`translate(${x} ${y}) translate(100 100) scale(${scale}) translate(-100 -100)`}>{shapes[shape]}</g>;
}

// 断面
export function VegSectionG({ color }: { color: VegColor }) {
  const { body, inner } = vegFill[color];
  return (
    <g>
      <circle cx="100" cy="104" r="66" fill={body} />
      <circle cx="100" cy="104" r="56" fill={inner} />
      <circle cx="100" cy="104" r="40" fill={body} opacity="0.18" />
      <g stroke={body} strokeWidth="2" opacity="0.5">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          return <line key={i} x1={100} y1={104} x2={100 + Math.cos(a) * 50} y2={104 + Math.sin(a) * 50} />;
        })}
      </g>
      <circle cx="100" cy="104" r="8" fill={body} opacity="0.6" />
    </g>
  );
}
