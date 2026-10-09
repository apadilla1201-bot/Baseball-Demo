"use client";

import { useState } from "react";
import type { Dict } from "@/i18n";

const inputCls = "w-full border border-ink bg-chalk px-3 py-2.5 text-[1rem] outline-none focus:border-clay focus:ring-1 focus:ring-clay";

export function ContactForm({ t }: { t: Dict["contact"]["form"] }) {
  const [sent, setSent] = useState(false);
  if (sent)
    return (
      <p className="border border-ink bg-chalk p-5 text-sm" role="status">
        {t.sent}
      </p>
    );
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          {t.name}
          <input required className={`${inputCls} mt-2`} name="name" />
        </label>
        <label className="block text-sm font-medium">
          {t.email}
          <input required type="email" className={`${inputCls} mt-2`} name="email" />
        </label>
      </div>
      <label className="block text-sm font-medium">
        {t.message}
        <textarea required rows={5} className={`${inputCls} mt-2`} name="message" />
      </label>
      <button type="submit" className="btn btn-ink">
        {t.send} <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
