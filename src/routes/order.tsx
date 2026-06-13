import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  DAYS,
  useWeekMenu,
  todayName,
  WHATSAPP_NUMBER,
  type Day,
  type Combination,
} from "@/lib/menu-store";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { WAIcon } from "@/components/site/Hero";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function scrollToTop() {
  setTimeout(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, 50);
}

// Returns date for a given day name within the current week (Mon-Sun).
// If that day already passed this week, returns today instead.
function dateForDayInWeek(day: Day): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const dayIndex: Record<Day, number> = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 0,
  };
  const today = now.getDay();
  const norm = (d: number) => (d === 0 ? 6 : d - 1);
  const target = norm(dayIndex[day]);
  const cur = norm(today);
  const diff = target - cur;
  const d = new Date(now);
  d.setDate(now.getDate() + diff);
  if (d < now) return now;
  return d;
}

function endOfWeek(): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const cur = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const d = new Date(now);
  d.setDate(now.getDate() + (6 - cur));
  d.setHours(23, 59, 59, 999);
  return d;
}

function dayNameFromDate(date: Date): Day {
  const map: Day[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return map[date.getDay()];
}

type Search = { day?: Day };

export const Route = createFileRoute("/order")({
  component: OrderPage,
  validateSearch: (s: Record<string, unknown>): Search => ({
    day: typeof s.day === "string" && (DAYS as readonly string[]).includes(s.day)
      ? (s.day as Day)
      : undefined,
  }),
  head: () => ({
    meta: [{ title: "Build My Tiffin · Ardas Rasoi" }],
  }),
});

function comboSubtitle(c: Combination) {
  const parts: string[] = [`${c.curriesAllowed} ${c.curriesAllowed === 1 ? "curry" : "curries"}`];
  if (c.rotiIncluded) parts.push(`${c.rotiCount} roti`);
  if (c.riceIncluded) parts.push("rice");
  if (c.dahiRaitaIncluded) parts.push("dahi raita");
  return parts.join(" + ");
}

function OrderPage() {
  const search = Route.useSearch();
  const [week] = useWeekMenu();
  const [day, setDay] = useState<Day>(search.day ?? todayName());
  const [orderDate, setOrderDate] = useState<Date>(() => dateForDayInWeek(search.day ?? todayName()));
  const [comboId, setComboId] = useState<string | null>(null);
  const [selectedCurries, setSelectedCurries] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    scrollToTop();
  }, [search.day]);

  useEffect(() => {
    setComboId(null);
    setSelectedCurries([]);
    setOrderDate(dateForDayInWeek(day));
    scrollToTop();
  }, [day]);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const weekEnd = useMemo(() => endOfWeek(), []);

  const data = week[day];
  const combo = useMemo(() => data?.combinations.find((c) => c.id === comboId) ?? null, [data, comboId]);

  const toggleCurry = (id: string) => {
    if (!combo) return;
    setSelectedCurries((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= combo.curriesAllowed) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const ready = combo && selectedCurries.length === combo.curriesAllowed && name.trim() && phone.trim();

  const sendOrder = () => {
    if (!ready || !combo) return;

    const selectedCombination = {
      name: combo.name,
      price: combo.price,
      rotiIncluded: combo.rotiIncluded,
      rotiCount: combo.rotiCount,
      riceIncluded: combo.riceIncluded,
      raitaIncluded: combo.dahiRaitaIncluded,
    };

    const selectedDay = day;
    const curryNames = selectedCurries
      .map((id) => data.curries.find((c) => c.id === id)?.name)
      .filter(Boolean) as string[];

    const formattedDate = format(orderDate, "EEEE, d MMMM yyyy");

    const message = `
Hello Ardas Rasoi,

Name: ${name}
Order Date: ${formattedDate}
Day: ${selectedDay}
Combination: ${selectedCombination.name}
Curries: ${curryNames.join(", ")}
${selectedCombination.rotiIncluded ? `Rotis: ${selectedCombination.rotiCount}` : ""}
${selectedCombination.riceIncluded ? "Rice Included" : ""}
${selectedCombination.raitaIncluded ? "Dahi Raita Included" : ""}
Price: $${selectedCombination.price}

Note: ${note}
`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/61422931252?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-saffron">Order Tiffin</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-primary md:text-5xl">
              Build My <span className="font-script text-saffron">Tiffin</span>
            </h1>
            <p className="mt-3 text-muted-foreground">A few quick taps and we'll have it ready.</p>
          </div>

          <Step n={1} title="Pick a day">
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-7">
              {DAYS.map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setDay(d);
                    scrollToTop();
                  }}
                  className={`rounded-2xl border px-2 py-3 text-sm font-semibold transition ${
                    day === d
                      ? "border-saffron bg-saffron text-saffron-foreground shadow-soft"
                      : "border-border bg-card text-foreground hover:border-saffron/50"
                  }`}
                >
                  {d.slice(0, 3)}
                </button>
              ))}
            </div>
          </Step>

          <Step n={2} title="Pick your order date">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full sm:w-auto justify-start text-left font-normal rounded-xl px-4 py-6 text-sm")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(orderDate, "EEEE, d MMMM yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={orderDate}
                  onSelect={(d) => {
                    if (!d) return;
                    setOrderDate(d);
                    setDay(dayNameFromDate(d));
                    scrollToTop();
                  }}
                  disabled={(d) => d < today || d > weekEnd}
                  defaultMonth={orderDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            <p className="mt-2 text-xs text-muted-foreground">
              You can order from today through the end of this week.
            </p>
          </Step>

          <Step n={3} title="Choose a combination">
            <div className="grid gap-3 sm:grid-cols-2">
              {data.combinations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setComboId(c.id);
                    setSelectedCurries([]);
                  }}
                  className={`text-left rounded-2xl border p-4 transition ${
                    comboId === c.id
                      ? "border-saffron bg-saffron/10 shadow-soft"
                      : "border-border bg-card hover:border-saffron/40"
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <div className="font-display text-lg font-bold text-primary">{c.name}</div>
                    <div className="font-display text-lg font-bold text-saffron">${c.price}</div>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{comboSubtitle(c)}</div>
                </button>
              ))}
              {data.combinations.length === 0 && (
                <div className="text-sm text-muted-foreground">No combinations available for {day}.</div>
              )}
            </div>
          </Step>

          {combo && (
            <Step n={4} title={`Select ${combo.curriesAllowed} ${combo.curriesAllowed === 1 ? "curry" : "curries"}`}>
              <div className="grid gap-2 sm:grid-cols-2">
                {data.curries.map((c) => {
                  const active = selectedCurries.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggleCurry(c.id)}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                        active
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <span className="font-medium text-foreground">{c.name}</span>
                      <span
                        className={`grid h-5 w-5 place-items-center rounded-full border ${
                          active ? "bg-primary text-primary-foreground border-primary" : "border-border"
                        }`}
                      >
                        {active ? "✓" : ""}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Selected {selectedCurries.length} of {combo.curriesAllowed}
              </p>
            </Step>
          )}

          {combo && (
            <Step n={5} title="Your details">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Name">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={80}
                    className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm focus:border-saffron focus:outline-none"
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={20}
                    className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm focus:border-saffron focus:outline-none"
                    placeholder="04xx xxx xxx"
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Pickup / delivery note (optional)">
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      maxLength={300}
                      rows={3}
                      className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm focus:border-saffron focus:outline-none"
                      placeholder="Pickup at 6:30pm, etc."
                    />
                  </Field>
                </div>
              </div>
            </Step>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-3xl border border-saffron/30 bg-card p-6 shadow-warm"
          >
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Order total</div>
                <div className="font-display text-3xl font-bold text-primary">${combo?.price ?? 0}</div>
              </div>
              <button
                type="button"
                onClick={sendOrder}
                disabled={!ready}
                className={`inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold shadow-warm transition ${
                  ready
                    ? "bg-whatsapp text-whatsapp-foreground hover:-translate-y-0.5"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                <WAIcon className="h-4 w-4" /> Send Order on WhatsApp
              </button>
            </div>
            {!ready && combo && (
              <p className="mt-3 text-xs text-muted-foreground">
                Complete all steps to send your order.
              </p>
            )}
          </motion.div>

          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">← Back to home</Link>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-8 rounded-3xl border border-border bg-card/80 p-6 shadow-soft md:p-8"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-saffron font-bold text-saffron-foreground">
          {n}
        </span>
        <h2 className="font-display text-xl font-bold text-primary">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
