import { useState } from "react";

const faqs = [
  { q: "How do I place an order?", a: "Pick your day and combo on our menu page, then send your order via WhatsApp. Easy!" },
  { q: "How early should I order?", a: "Please text us at least 1 hour before pickup so we can prepare your tiffin fresh." },
  { q: "Do you offer delivery?", a: "We're pickup-first, but local delivery can be arranged on request — just ask on WhatsApp." },
  { q: "Are your meals 100% vegetarian?", a: "Absolutely. Pure veg, no eggs, prepared in a sattvic kitchen." },
  { q: "Can I customise my tiffin?", a: "Each combo lets you pick from the day's curries — choose what you love." },
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
