import Image from "next/image";

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
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover", objectPosition: position }} />
    </div>
  );
}
