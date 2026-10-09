"use client";

import { useMemo, useState } from "react";
import { commits, type Level } from "@/data/athletes";

const levels: Level[] = ["D1", "D2", "D3", "NAIA", "JUCO"];

export function CommitBoard({ cols, filterAll, lang }: { cols: string[]; filterAll: string; lang: "en" | "es" }) {
  const [level, setLevel] = useState<Level | "all">("all");
  const rows = useMemo(() => {
    const r = level === "all" ? commits : commits.filter((c) => c.level === level);
    return [...r].sort((a, b) => b.committed.localeCompare(a.committed));
  }, [level]);
  const fmt = (ym: string) => {
    const [y, m] = ym.split("-");
    const names = lang === "es" ? ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${names[Number(m) - 1]} ${y}`;
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label={cols[4]}>
        {(["all", ...levels] as const).map((l) => (
          <button
            key={l}
            type="button"
            aria-pressed={level === l}
            onClick={() => setLevel(l)}
            className={`num border px-3 py-1.5 text-xs transition-colors ${level === l ? "border-clay bg-clay text-chalk" : "border-line-dark text-stone-2 hover:border-paper hover:text-paper"}`}
          >
            {l === "all" ? filterAll : l}
            <span className="ml-2 opacity-60">{l === "all" ? commits.length : commits.filter((c) => c.level === l).length}</span>
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-paper/60">
              {cols.map((c, i) => (
                <th key={c} scope="col" className={`eyebrow py-3 font-normal text-stone-2 ${i > 0 ? "pl-4" : ""}`}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.name} className="border-b border-line-dark">
                <td className="py-3 pr-4">
                  <span className="display-tight text-[1.15rem]">{c.name}</span>
                  <span className="num ml-2 text-xs text-stone-2">{c.hand}</span>
                </td>
                <td className="py-3 pl-4 text-stone-2">{c.hs}</td>
                <td className="num py-3 pl-4">{c.grad}</td>
                <td className="py-3 pl-4 font-medium">{c.school}</td>
                <td className="py-3 pl-4">
                  <span className="num border border-paper/40 px-1.5 py-0.5 text-xs">{c.level}</span>
                </td>
                <td className="num py-3 pl-4 text-stone-2">{fmt(c.committed)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
