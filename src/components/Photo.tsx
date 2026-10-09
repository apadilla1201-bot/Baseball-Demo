import Image from "next/image";

// Static-export builds (GitHub Pages) live under a sub-path; Vercel builds use "".
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Photo({
  src,
  alt,
  ratio,
  className = "",
  sizes = "100vw",
  priority = false,
  position,
  shade = true,
  fillParent = false,
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  position?: string;
  shade?: boolean;
  fillParent?: boolean;
}) {
  return (
    <div className={`photo ${shade ? "" : "no-shade"} ${className}`} style={{ ...(ratio ? { aspectRatio: ratio } : {}), ...(fillParent ? { position: "absolute" as const, inset: 0 } : {}) }}>
      <Image src={`${base}${src}`} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover", objectPosition: position }} />
    </div>
  );
}
