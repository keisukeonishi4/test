// 使わない表現が app/ components/ lib/ data/ に含まれていないか検査する
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const BANNED = ["推し", "へんてこ", "変わった野菜"];
const ROOTS = ["app", "components", "lib", "data"];
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|json|css|md)$/.test(name)) {
      readFileSync(p, "utf8").split("\n").forEach((line, i) => {
        for (const w of BANNED) if (line.includes(w)) hits.push(`${p}:${i + 1}  「${w}」`);
      });
    }
  }
}
ROOTS.forEach((r) => { try { walk(r); } catch {} });

if (hits.length) {
  console.error("使わない表現が見つかりました:\n" + hits.join("\n"));
  process.exit(1);
}
console.log("OK: 使わない表現は見つかりませんでした");
