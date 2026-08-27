import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow mb-6">404</p>
      <h1 className="text-display-2">
        This page doesn&apos;t{" "}
        <span className="font-serif font-normal italic text-accent-ink">exist</span>.
      </h1>
      <p className="mt-6 max-w-md leading-relaxed text-muted">
        The link is either wrong or the page has moved. The work is still where
        you left it.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Back home</Button>
        <Button href="/work" variant="secondary">
          See the work
        </Button>
      </div>
    </section>
  );
}
