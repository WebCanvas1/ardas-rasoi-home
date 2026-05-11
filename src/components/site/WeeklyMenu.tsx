import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { DAYS, useWeekMenu, todayName, type Combination } from "@/lib/menu-store";

function comboSubtitle(c: Combination) {
  const parts: string[] = [`${c.curriesAllowed} ${c.curriesAllowed === 1 ? "curry" : "curries"}`];
  if (c.rotiIncluded) parts.push(`${c.rotiCount} roti`);
  if (c.riceIncluded) parts.push("rice");
  if (c.dahiRaitaIncluded) parts.push("dahi raita");
  return parts.join(" + ");
}

export function WeeklyMenu() {
  const [week] = useWeekMenu();
  const today = todayName();

  return (
    <section id="menu" className="relative py-24 md:py-32 bg-gradient-warm/40">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-saffron">This Week's Tiffin</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-primary md:text-5xl">
            Weekly <span className="font-script text-saffron">Menu</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Choose your day, pick a combo, and we'll have your tiffin ready. Just text us 1 hour before pickup.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DAYS.map((day, i) => {
            const data = week[day];
            const isToday = day === today;
            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className={`relative flex flex-col rounded-3xl border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-warm ${
                  isToday ? "border-saffron ring-2 ring-saffron/30" : "border-border"
                }`}
              >
                {isToday && (
                  <span className="absolute -top-3 right-5 rounded-full bg-saffron px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-saffron-foreground shadow-soft">
                    Today
                  </span>
                )}
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-bold text-primary">{day}</h3>
                  <span className="font-script text-2xl text-saffron">Special</span>
                </div>

                <div className="mt-5">
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Curries
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {data.curries.map((c) => (
                      <span key={c.id} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                        {c.name}
                      </span>
                    ))}
                    {data.curries.length === 0 && (
                      <span className="text-xs text-muted-foreground">No curries set</span>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex-1 space-y-2">
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Combinations
                  </div>
                  {data.combinations.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between rounded-2xl bg-cream/70 px-4 py-3 ring-1 ring-saffron/15"
                    >
                      <div>
                        <div className="text-sm font-semibold text-foreground">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{comboSubtitle(c)}</div>
                      </div>
                      <div className="font-display text-lg font-bold text-saffron">${c.price}</div>
                    </div>
                  ))}
                  {data.combinations.length === 0 && (
                    <div className="text-xs text-muted-foreground">No combinations yet.</div>
                  )}
                </div>

                <Link
                  to="/order"
                  search={{ day }}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-whatsapp-foreground shadow-soft transition hover:-translate-y-0.5"
                >
                  Order {day}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
