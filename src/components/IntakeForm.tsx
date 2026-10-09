"use client";

import { useState } from "react";
import type { Dict } from "@/i18n";

type F = Dict["book"]["fields"];
type Data = Record<string, string | string[]>;

const gradYears = [2026, 2027, 2028, 2029, 2030, 2031];

function Field({ label, htmlFor, required, optional, help, error, children }: { label: string; htmlFor: string; required?: boolean; optional?: string; help?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="flex items-baseline justify-between gap-4 text-sm font-medium">
        <span>{label}</span>
        {!required && optional && <span className="eyebrow text-stone">{optional}</span>}
      </label>
      {help && <p className="mt-1 text-xs text-stone">{help}</p>}
      <div className="mt-2">{children}</div>
      {error && (
        <p className="num mt-1.5 text-xs text-clay" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls = "w-full border border-ink bg-chalk px-3 py-2.5 text-[1rem] outline-none focus:border-clay focus:ring-1 focus:ring-clay";

function Choice({ name, options, value, onChange, multi = false }: { name: string; options: readonly string[]; value: string | string[]; onChange: (v: string | string[]) => void; multi?: boolean }) {
  const selected = (o: string) => (multi ? (value as string[]).includes(o) : value === o);
  return (
    <div className="grid gap-2 sm:grid-cols-2" role={multi ? "group" : "radiogroup"}>
      {options.map((o) => (
        <label key={o} className={`flex cursor-pointer items-center gap-3 border px-3 py-2.5 text-sm transition-colors ${selected(o) ? "border-clay bg-clay/10" : "border-line hover:border-ink"}`}>
          <input
            type={multi ? "checkbox" : "radio"}
            name={name}
            value={o}
            checked={selected(o)}
            onChange={() => {
              if (multi) {
                const arr = value as string[];
                onChange(arr.includes(o) ? arr.filter((x) => x !== o) : [...arr, o]);
              } else onChange(o);
            }}
            className="h-4 w-4 accent-clay"
          />
          <span>{o}</span>
        </label>
      ))}
    </div>
  );
}

export function IntakeForm({ t }: { t: Dict["book"] }) {
  const f: F = t.fields;
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({ goals: [] });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const set = (k: string) => (v: string | string[]) => setData((d) => ({ ...d, [k]: v }));
  const str = (k: string) => (data[k] as string) ?? "";

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    const req = (k: string) => {
      const v = data[k];
      if (!v || (Array.isArray(v) && v.length === 0)) e[k] = t.errors.required;
    };
    if (s === 0) {
      req("athleteName");
      req("parentName");
      req("email");
      req("phone");
      if (str("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str("email"))) e.email = t.errors.email;
    }
    if (s === 1) {
      req("gradYear");
      req("level");
      req("hand");
      const v = str("velo");
      if (v && (Number.isNaN(Number(v)) || Number(v) < 50 || Number(v) > 105)) e.velo = t.errors.velo;
    }
    if (s === 2) {
      req("goals");
      req("recruiting");
    }
    if (s === 3) req("injury");
    if (s === 4) {
      req("format");
      req("language");
      if (str("consent") !== "yes") e.consent = t.errors.consent;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate(step)) setStep((s) => Math.min(s + 1, t.steps.length - 1));
  };
  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate(4)) setDone(true);
  };

  if (done) {
    const rows: [string, string][] = [
      [f.athleteName, str("athleteName")],
      [f.gradYear, str("gradYear")],
      [f.level, str("level")],
      [f.velo, str("velo") ? `${str("velo")} mph` : "—"],
      [f.goals, (data.goals as string[]).join(", ")],
      [f.format, str("format")],
      [f.language, str("language")],
    ];
    return (
      <div className="border border-ink bg-chalk p-6 md:p-10" role="status" aria-live="polite">
        <p className="eyebrow text-clay">{t.success.eyebrow}</p>
        <h2 className="display mt-3 text-[2.6rem] md:text-[3.4rem]">{t.success.title}</h2>
        <p className="mt-4 max-w-xl">{t.success.p}</p>
        <dl className="mt-8 border-t border-line">
          <p className="eyebrow mt-4 text-stone">{t.success.summary}</p>
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 border-b border-line py-2 text-sm">
              <dt className="text-stone">{k}</dt>
              <dd className="num text-right font-medium">{v || "—"}</dd>
            </div>
          ))}
        </dl>
        <button
          type="button"
          className="btn btn-ghost mt-8"
          onClick={() => {
            setDone(false);
            setStep(0);
            setData({ goals: [] });
          }}
        >
          {t.success.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="border border-ink bg-paper-2">
      {/* step indicator */}
      <ol className="grid grid-cols-5 border-b border-ink" aria-label={`${t.labels.step} ${step + 1} ${t.labels.of} ${t.steps.length}`}>
        {t.steps.map((s, i) => (
          <li key={s} className={`border-r border-ink px-2 py-3 last:border-r-0 ${i === step ? "bg-ink text-paper" : i < step ? "bg-chalk" : ""}`} aria-current={i === step ? "step" : undefined}>
            <span className="num block text-[0.65rem] opacity-70">0{i + 1}</span>
            <span className="display-tight block truncate text-[0.95rem] sm:text-[1.1rem]">{s}</span>
          </li>
        ))}
      </ol>

      <div className="space-y-6 p-5 md:p-8">
        {step === 0 && (
          <>
            <Field label={f.athleteName} htmlFor="athleteName" required error={errors.athleteName}>
              <input id="athleteName" className={inputCls} value={str("athleteName")} onChange={(e) => set("athleteName")(e.target.value)} autoComplete="off" />
            </Field>
            <Field label={f.parentName} htmlFor="parentName" required error={errors.parentName}>
              <input id="parentName" className={inputCls} value={str("parentName")} onChange={(e) => set("parentName")(e.target.value)} />
            </Field>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label={f.email} htmlFor="email" required error={errors.email}>
                <input id="email" type="email" inputMode="email" className={inputCls} value={str("email")} onChange={(e) => set("email")(e.target.value)} />
              </Field>
              <Field label={f.phone} htmlFor="phone" required error={errors.phone}>
                <input id="phone" type="tel" inputMode="tel" className={inputCls} placeholder="(305) 555-0100" value={str("phone")} onChange={(e) => set("phone")(e.target.value)} />
              </Field>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label={f.gradYear} htmlFor="gradYear" required error={errors.gradYear}>
                <select id="gradYear" className={inputCls} value={str("gradYear")} onChange={(e) => set("gradYear")(e.target.value)}>
                  <option value="">—</option>
                  {gradYears.map((y) => (
                    <option key={y} value={String(y)}>
                      {y}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={f.hs} htmlFor="hs" optional={t.labels.optional}>
                <input id="hs" className={inputCls} value={str("hs")} onChange={(e) => set("hs")(e.target.value)} />
              </Field>
            </div>
            <Field label={f.level} htmlFor="level" required error={errors.level}>
              <Choice name="level" options={f.levelOptions} value={str("level")} onChange={set("level")} />
            </Field>
            <Field label={f.hand} htmlFor="hand" required error={errors.hand}>
              <Choice name="hand" options={f.handOptions} value={str("hand")} onChange={set("hand")} />
            </Field>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label={f.velo} htmlFor="velo" optional={t.labels.optional} help={f.veloHelp} error={errors.velo}>
                <input id="velo" inputMode="decimal" className={`${inputCls} num`} placeholder="84" value={str("velo")} onChange={(e) => set("velo")(e.target.value)} />
              </Field>
              <Field label={f.gpa} htmlFor="gpa" optional={t.labels.optional}>
                <input id="gpa" inputMode="decimal" className={`${inputCls} num`} placeholder="3.6" value={str("gpa")} onChange={(e) => set("gpa")(e.target.value)} />
              </Field>
            </div>
            <Field label={f.veloSource} htmlFor="veloSource" optional={t.labels.optional}>
              <Choice name="veloSource" options={f.veloSourceOptions} value={str("veloSource")} onChange={set("veloSource")} />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <Field label={f.goals} htmlFor="goals" required error={errors.goals}>
              <Choice name="goals" options={f.goalOptions} value={data.goals as string[]} onChange={set("goals")} multi />
            </Field>
            <Field label={f.recruiting} htmlFor="recruiting" required error={errors.recruiting}>
              <Choice name="recruiting" options={f.recruitingOptions} value={str("recruiting")} onChange={set("recruiting")} />
            </Field>
          </>
        )}

        {step === 3 && (
          <>
            <Field label={f.injury} htmlFor="injury" required error={errors.injury}>
              <Choice name="injury" options={f.injuryOptions} value={str("injury")} onChange={set("injury")} />
            </Field>
            <Field label={f.injuryNotes} htmlFor="injuryNotes" optional={t.labels.optional}>
              <textarea id="injuryNotes" rows={4} className={inputCls} value={str("injuryNotes")} onChange={(e) => set("injuryNotes")(e.target.value)} />
            </Field>
          </>
        )}

        {step === 4 && (
          <>
            <Field label={f.format} htmlFor="format" required error={errors.format}>
              <Choice name="format" options={f.formatOptions} value={str("format")} onChange={set("format")} />
            </Field>
            <Field label={f.language} htmlFor="language" required error={errors.language}>
              <Choice name="language" options={f.languageOptions} value={str("language")} onChange={set("language")} />
            </Field>
            <Field label={f.notes} htmlFor="notes" optional={t.labels.optional}>
              <textarea id="notes" rows={3} className={inputCls} value={str("notes")} onChange={(e) => set("notes")(e.target.value)} />
            </Field>
            <div>
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-clay" checked={str("consent") === "yes"} onChange={(e) => set("consent")(e.target.checked ? "yes" : "")} />
                <span>{f.consent}</span>
              </label>
              {errors.consent && (
                <p className="num mt-1.5 text-xs text-clay" role="alert">
                  {errors.consent}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-ink p-5 md:px-8">
        <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} className={`link-ul display-tight text-[1.05rem] uppercase ${step === 0 ? "invisible" : ""}`}>
          ← {t.labels.back}
        </button>
        <p className="num text-xs text-stone">
          {t.labels.step} {step + 1} {t.labels.of} {t.steps.length}
        </p>
        {step < t.steps.length - 1 ? (
          <button type="button" onClick={next} className="btn btn-ink">
            {t.labels.next} <span aria-hidden="true">→</span>
          </button>
        ) : (
          <button type="submit" className="btn btn-clay">
            {t.labels.submit} <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </form>
  );
}
