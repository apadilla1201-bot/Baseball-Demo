export function FAQ({ items, dark = false }: { items: { q: string; a: string }[]; dark?: boolean }) {
  const line = dark ? "border-line-dark" : "border-line";
  return (
    <div className={`border-t ${line}`}>
      {items.map((it) => (
        <details key={it.q} className={`group border-b ${line}`}>
          <summary className="flex items-start justify-between gap-6 py-5">
            <span className="display-tight text-[1.35rem] leading-tight md:text-[1.6rem]">{it.q}</span>
            <span className="faq-plus display mt-1 shrink-0 text-[1.6rem] leading-none text-clay" aria-hidden="true">
              +
            </span>
          </summary>
          <p className={`max-w-2xl pb-6 ${dark ? "text-stone-2" : "text-stone"}`}>{it.a}</p>
        </details>
      ))}
    </div>
  );
}
