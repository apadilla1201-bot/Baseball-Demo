import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span className="inline-block h-px w-6 bg-current" aria-hidden="true" />
      {children}
    </p>
  );
}

export function Head({
  eyebrow,
  title,
  sub,
  className = "",
  size = "md",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <h2 className={`display text-balance ${size === "lg" ? "text-[3rem] md:text-[4.5rem]" : "text-[2.5rem] md:text-[3.5rem]"}`}>
        {title}
      </h2>
      {sub && <p className="mt-4 max-w-xl text-lg text-stone">{sub}</p>}
    </div>
  );
}

export function CTA({
  title,
  p,
  primary,
  secondary,
  price,
  priceNote,
  tone = "clay",
}: {
  title: string;
  p: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  price?: string;
  priceNote?: string;
  tone?: "clay" | "ink";
}) {
  const dark = tone === "clay" ? "bg-clay text-chalk" : "bg-ink text-paper";
  return (
    <section className={`${dark} dark`}>
      <div className="wrap grid gap-8 py-16 md:grid-cols-12 md:items-end md:py-24">
        <div className="md:col-span-7">
          <h2 className="display text-[3rem] md:text-[5rem]">{title}</h2>
          <p className="mt-4 max-w-lg text-lg opacity-90">{p}</p>
        </div>
        <div className="md:col-span-5 md:justify-self-end">
          {price && (
            <p className="num mb-4 text-sm opacity-80">
              <span className="display text-[2.5rem] leading-none">{price}</span>
              {priceNote && <span className="ml-3">{priceNote}</span>}
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <Link href={primary.href} className={`btn ${tone === "clay" ? "bg-ink text-paper border-ink hover:bg-ink-3" : "btn-clay"}`}>
              {primary.label} <span aria-hidden="true">→</span>
            </Link>
            {secondary && (
              <Link href={secondary.href} className="btn btn-ghost">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
