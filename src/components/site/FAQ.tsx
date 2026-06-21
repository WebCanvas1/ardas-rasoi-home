import { useState } from "react";

const faqs = [
  { q: "How do I place an order?", a: "Message us on WhatsApp with your selected day, meal, pickup/delivery preference, and quantity." },
  { q: "How early should I order?", a: "Please place orders at least 2 hours before pickup or delivery." },
  { q: "Do you deliver?", a: "Yes, delivery is available within a 5 km radius of Marayong." },
  { q: "Where can I pick up?", a: "Pickup is available from Marayong or near Marayong Train Station. Exact address is shared after confirmation." },
  { q: "Is the food vegetarian?", a: "Yes, all meals are pure vegetarian and freshly prepared." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 md:py-32 bg-gradient-warm/40">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-saffron">Need Help?</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-primary md:text-5xl">
            Frequently Asked
          </h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="overflow-hidden rounded-2xl border border-saffron/20 bg-card shadow-soft">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold text-primary">{f.q}</span>
                <span className={`text-saffron transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-muted-foreground">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
