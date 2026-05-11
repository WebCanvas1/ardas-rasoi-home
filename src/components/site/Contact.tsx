import { Link } from "@tanstack/react-router";
import { WHATSAPP_NUMBER } from "@/lib/menu-store";
import { WAIcon } from "./Hero";
import logo from "@/assets/ardas-logo.jpg";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-saffron">Find Us</span>
            <h2 className="mt-3 font-display text-4xl font-bold text-primary md:text-5xl">
              Visit & <span className="font-script text-saffron">Pickup</span>
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Homemade tiffin and breakfast in Schofields. Text 1 hour before pickup and we'll have it warm and ready.
            </p>
            <div className="mt-8 space-y-4 text-foreground/90">
              <div className="flex items-start gap-3">
                <span className="mt-1 text-saffron">📍</span>
                <div>
                  <div className="font-semibold">Schofields, NSW</div>
                  <div className="text-sm text-muted-foreground">Exact address shared on order</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-saffron">📞</span>
                <div className="font-semibold">{WHATSAPP_NUMBER}</div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-saffron">⏰</span>
                <div>
                  <div className="font-semibold">Mon – Sun</div>
                  <div className="text-sm text-muted-foreground">Breakfast 7–10am · Tiffin 11am–8pm</div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-whatsapp-foreground shadow-warm hover:-translate-y-0.5 transition"
              >
                <WAIcon className="h-4 w-4" /> Message Us
              </a>
              <Link
                to="/order"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-warm hover:-translate-y-0.5 transition"
              >
                Build My Tiffin
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-saffron/20 bg-card shadow-warm">
            <div className="relative aspect-[4/3] w-full bg-gradient-warm">
              <iframe
                title="Map"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Schofields,NSW&output=embed"
              />
            </div>
            <div className="flex items-center gap-3 p-5">
              <img src={logo} alt="" className="h-12 w-12 rounded-full object-cover ring-2 ring-saffron/40" />
              <div>
                <div className="font-display text-lg font-semibold text-primary">Ardas Rasoi</div>
                <div className="text-xs text-muted-foreground">Fresh · Blessed · Home-Cooked</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
