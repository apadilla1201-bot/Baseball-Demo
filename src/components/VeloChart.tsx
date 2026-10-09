"use client";

import { useEffect, useRef, useState } from "react";
import type { VeloPoint } from "@/data/athletes";

const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_ES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export function VeloChart({ points, lang, label, rtt = false }: { points: VeloPoint[]; lang: "en" | "es"; label: string; rtt?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const W = 640;
  const H = 240;
  const padL = 44;
  const padR = 20;
  const padT = 18;
  const padB = 34;
  const vals = points.map((p) => p.mph).filter((v) => v > 0);
  const minV = Math.floor((Math.min(...vals) - 2) / 2) * 2;
  const maxV = Math.ceil((Math.max(...vals) + 2) / 2) * 2;
  const x = (i: number) => padL + (i * (W - padL - padR)) / (points.length - 1);
  const y = (v: number) => padT + (H - padT - padB) * (1 - (v - minV) / (maxV - minV));
  const plotted = points.map((p, i) => ({ ...p, i })).filter((p) => p.mph > 0);
  const d = plotted.map((p, k) => `${k === 0 ? "M" : "L"}${x(p.i).toFixed(1)},${y(p.mph).toFixed(1)}`).join(" ");
  const ticks: number[] = [];
  for (let v = minV; v <= maxV; v += 2) ticks.push(v);
  const months = lang === "es" ? MONTHS_ES : MONTHS_EN;
  const fmt = (date: string) => {
    const [yy, mm] = date.split("-");
    return `${months[Number(mm) - 1]} '${yy.slice(2)}`;
  };
  const first = plotted[0];
  const last = plotted[plotted.length - 1];

  return (
    <div ref={ref} className={inView ? "in-view" : ""}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`${label}: ${first.mph} → ${last.mph}`}>
        {ticks.map((v) => (
          <g key={v}>
            <line x1={padL} x2={W - padR} y1={y(v)} y2={y(v)} stroke="currentColor" strokeOpacity={v === minV ? 0.5 : 0.12} />
            <text x={padL - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" fill="currentColor" fillOpacity={0.7}>
              {v}
            </text>
          </g>
        ))}
        {points.map((p, i) => (
          <text key={p.date} x={x(i)} y={H - 10} textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"} fontSize="11" fontFamily="var(--font-mono)" fill="currentColor" fillOpacity={0.7}>
            {fmt(p.date)}
          </text>
        ))}
        {rtt && points[0].mph === 0 && (
          <text x={x(0)} y={y(minV) - 8} fontSize="11" fontFamily="var(--font-mono)" fill="currentColor" fillOpacity={0.7}>
            0 ·
          </text>
        )}
        <path d={d} fill="none" stroke="var(--color-clay)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" className="draw-line" />
        {plotted.map((p) => (
          <circle key={p.date} cx={x(p.i)} cy={y(p.mph)} r="4" fill="var(--color-paper)" stroke="var(--color-clay)" strokeWidth="2" />
        ))}
        <text x={x(last.i) - 10} y={y(last.mph) - 12} textAnchor="end" fontSize="22" fontWeight="700" fontFamily="var(--font-display)" fill="currentColor">
          {last.mph}
        </text>
      </svg>
    </div>
  );
}
