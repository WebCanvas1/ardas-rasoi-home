import { motion } from "framer-motion";

const items = [
  { title: "Homemade Goodness", desc: "Every meal is cooked the way our mothers did — with patience, prayer and pure ingredients.", icon: "🏠" },
  { title: "Fresh Daily", desc: "Curries, dal and rotis are prepared the morning of your tiffin. Nothing reheated, nothing stale.", icon: "🌿" },
  { title: "Hygienic Kitchen", desc: "Spotless prep, sealed packing and quality oil. We treat your meal like family.", icon: "✨" },
  { title: "Weekly Menu", desc: "A new combination every day so your week never feels repetitive.", icon: "📅" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-saffron">Our Story</span>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-bold text-primary md:text-5xl">
            A Tiffin That Tastes Like <span className="font-script text-saffron">Home</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Ardas Rasoi serves freshly prepared vegetarian tiffin and breakfast for students, families and busy professionals across Schofields. Real recipes, real ingredients, real ghar ka swad.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-3xl border border-saffron/20 bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-warm"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-warm text-2xl shadow-soft">
                {it.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-primary">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
