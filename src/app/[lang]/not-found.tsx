import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap py-24">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-[3rem] md:text-[5rem]">That page isn&apos;t here. / Esa página no está aquí.</h1>
      <Link href="/en" className="btn btn-ink mt-8">Home / Inicio</Link>
    </section>
  );
}
