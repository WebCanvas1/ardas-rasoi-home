import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/ardas-logo.jpg";
import thali from "@/assets/hero-thali.jpg";
import { WHATSAPP_NUMBER } from "@/lib/menu-store";

export function Hero() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hi Ardas Rasoi, I'd like to place a tiffin order."
  )}`;

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 bg-gradient-hero">
      <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(circle_at_20%_20%,oklch(0.85_0.12_75)_0%,transparent_45%),radial-gradient(circle_at_80%_60%,oklch(0.85_0.1_140)_0%,transparent_45%)]" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 flex items-center gap-3">
            <img src={logo} alt="Ardas Rasoi logo" className="h-16 w-16 rounded-full object-cover shadow-warm ring-2 ring-saffron/50" />
            <span className="rounded-full border border-saffron/40 bg-saffron/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-brown">
              Vegetarian Tiffin & Breakfast
            </span>
          </div>
          <h1 className="font-display text-5xl font-bold leading-[1.05] text-balance text-primary md:text-7xl">
            Ardas <span className="font-script text-saffron">Rasoi</span>
          </h1>
          <p className="mt-4 font-script text-3xl text-brown md:text-4xl">
            Fresh · Blessed · Home-Cooked
          </p>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            Authentic North Indian tiffins prepared every morning with love, fresh ingredients and ghar ka swad — delivered to your day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-warm transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              View Weekly Menu
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 text-sm font-semibold text-whatsapp-foreground shadow-warm transition hover:-translate-y-0.5"
            >
              <WAIcon className="h-4 w-4" /> Order on WhatsApp
            </a>
            <Link
              to="/order"
              className="rounded-full border border-primary/30 bg-cream px-7 py-3.5 text-sm font-semibold text-primary transition hover:bg-secondary"
            >
              Build My Tiffin
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-xs uppercase tracking-widest text-muted-foreground">
            <span>🌿 100% Vegetarian</span>
            <span>✦ Daily Fresh</span>
            <span>♥ Made With Love</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-6 -z-10 rounded-full bg-gradient-saffron opacity-30 blur-3xl" />
          <img
            src={thali}
            alt="Premium Indian thali with dal, paneer curry, rice, roti, dahi raita and chai"
            width={1600}
            height={1200}
            className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-warm ring-1 ring-saffron/30"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-cream/95 p-4 shadow-warm md:block"
          >
            <div className="text-xs uppercase tracking-widest text-saffron">Today's Special</div>
            <div className="font-display text-lg font-bold text-primary">Tiffin from $15</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function WAIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M.057 24l1.687-6.163A11.867 11.867 0 010 12.067C0 5.405 5.405 0 12.067 0c3.181 0 6.167 1.24 8.413 3.488A11.83 11.83 0 0124 12.072c0 6.662-5.405 12.067-12.067 12.067a12.06 12.06 0 01-5.762-1.469L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.692 5.55l-.999 3.648 3.796-.897zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  );
}
