import { Link } from "@tanstack/react-router";
import { WHATSAPP_NUMBER, WHATSAPP_GROUP_LINK } from "@/lib/menu-store";
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
              Pickup &amp; <span className="font-script text-saffron">Delivery</span>
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Pickup available from Marayong or nearby Marayong Train Station — exact address is shared once your order is confirmed. Delivery available within a 5 km radius. Please order at least 2 hours prior.
            </p>
            <div className="mt-8 space-y-4 text-foreground/90">
              <div className="flex items-start gap-3">
                <span className="mt-1 text-saffron">📍</span>
                <div>
                  <div className="font-semibold">Marayong 2148 / Blacktown, NSW</div>
                  <div className="text-sm text-muted-foreground">Exact pickup address shared on order</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-saffron">🚗</span>
                <div>
                  <div className="font-semibold">Delivery within 5 km</div>
                  <div className="text-sm text-muted-foreground">Around Marayong &amp; Blacktown</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-saffron">📞</span>
                <div className="font-semibold">{WHATSAPP_NUMBER}</div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-saffron">⏰</span>
                <div>
                  <div className="font-semibold">Wed – Sun</div>
                  <div className="text-sm text-muted-foreground">Please order at least 2 hours prior.</div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent("Hi House of Flavours, I'd like to place a tiffin order.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-whatsapp-foreground shadow-warm hover:-translate-y-0.5 transition"
              >
                <WAIcon className="h-4 w-4" /> Message Us
              </a>
              {/* TODO: replace WHATSAPP_GROUP_LINK with client's WhatsApp group/channel link */}
              <a
                href={WHATSAPP_GROUP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-whatsapp/40 bg-card px-6 py-3 text-sm font-semibold text-primary hover:-translate-y-0.5 transition"
              >
                💬 Join WhatsApp Group
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
                title="Map of Marayong, NSW"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Marayong+NSW+2148&output=embed"
              />
            </div>
            <div className="flex items-center gap-3 p-5">
              <img src={logo} alt="" className="h-12 w-12 rounded-full object-cover ring-2 ring-saffron/40" />
              <div>
                <div className="font-display text-lg font-semibold text-primary">House of Flavours</div>
                <div className="text-xs text-muted-foreground">Fresh Homemade Meals Delivered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
