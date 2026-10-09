import { Eyebrow } from "./Section";
import { Photo } from "./Photo";

export function PageHero({
  eyebrow,
  title,
  sub,
  photo,
  alt,
  position,
  tone = "paper",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  photo?: string;
  alt?: string;
  position?: string;
  tone?: "paper" | "ink";
}) {
  const dark = tone === "ink";
  return (
    <section className={dark ? "dark bg-ink text-paper" : "bg-paper"}>
      <div className="wrap grid gap-8 pt-12 md:grid-cols-12 md:pt-20">
        <div className={`${photo ? "md:col-span-7" : "md:col-span-10"} ${photo ? "pb-10 md:pb-20" : "pb-12 md:pb-20"}`}>
          <Eyebrow className={`mb-5 ${dark ? "text-stone-2" : "text-stone"}`}>{eyebrow}</Eyebrow>
          <h1 className="display text-balance text-[3.4rem] md:text-[5.5rem] lg:text-[6.5rem]">{title}</h1>
          {sub && <p className={`mt-6 max-w-xl text-lg md:text-xl ${dark ? "text-stone-2" : "text-stone"}`}>{sub}</p>}
        </div>
        {photo && (
          <div className="md:col-span-5 md:self-end">
            <Photo src={photo} alt={alt ?? ""} ratio="4/3" position={position} sizes="(min-width: 768px) 40vw, 100vw" priority />
          </div>
        )}
      </div>
    </section>
  );
}
