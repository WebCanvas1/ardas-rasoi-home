const reviews = [
  { name: "Priya S.", text: "Tastes exactly like my mum's cooking back in Punjab. The dal is unreal.", role: "Schofields" },
  { name: "Arjun K.", text: "Perfect lunch tiffin for work. Fresh, hot and ready when I pick up.", role: "Engineer" },
  { name: "Neha M.", text: "Saves me so much time during the week and the kids love it.", role: "Mum of 2" },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-saffron">Loved Locally</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-primary md:text-5xl">
            Words From Our <span className="font-script text-saffron">Family</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="rounded-3xl border border-saffron/20 bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-warm"
            >
              <div className="text-3xl text-saffron">"</div>
              <blockquote className="-mt-2 text-foreground/90">{r.text}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-saffron font-bold text-saffron-foreground">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-primary">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
