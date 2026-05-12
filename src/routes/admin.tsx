import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  DAYS,
  useWeekMenu,
  newId,
  defaultWeek,
  saveWeekToApi,
  type Day,
  type Combination,
} from "@/lib/menu-store";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin · Ardas Rasoi" }] }),
});

const ADMIN_USER = "ardas@rasoi";
const ADMIN_PASS = "Tiffin@2026";
const AUTH_KEY = "ardas-admin-auth";

function AdminPage() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    setAuth(typeof window !== "undefined" && sessionStorage.getItem(AUTH_KEY) === "1");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-24">
        {auth ? <Dashboard onLogout={() => { sessionStorage.removeItem(AUTH_KEY); setAuth(false); }} /> : <Login onSuccess={() => { sessionStorage.setItem(AUTH_KEY, "1"); setAuth(true); }} />}
      </main>
      <Footer />
    </div>
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  return (
    <div className="mx-auto max-w-md px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-saffron/20 bg-card p-8 shadow-warm"
      >
        <h1 className="font-display text-3xl font-bold text-primary">Admin Login</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage the weekly Ardas Rasoi menu.</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (u === ADMIN_USER && p === ADMIN_PASS) onSuccess();
            else setErr("Invalid credentials");
          }}
        >
          <input
            value={u}
            onChange={(e) => setU(e.target.value)}
            placeholder="Username"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-saffron focus:outline-none"
          />
          <input
            value={p}
            onChange={(e) => setP(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-saffron focus:outline-none"
          />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-warm transition hover:-translate-y-0.5">
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [week, setWeek] = useWeekMenu();
  const [day, setDay] = useState<Day>("Monday");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const data = week[day];

  const update = (next: typeof data) => {
    setWeek({ ...week, [day]: next });
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg(null);
    const ok = await saveWeekToApi(week);
    setSaving(false);
    setSaveMsg(
      ok
        ? { type: "success", text: "Menu updated successfully" }
        : { type: "error", text: "Failed to save menu. Changes kept locally." },
    );
    setTimeout(() => setSaveMsg(null), 4000);
  };


  const addCurry = () => update({ ...data, curries: [...data.curries, { id: newId(), name: "New Curry" }] });
  const removeCurry = (id: string) => update({ ...data, curries: data.curries.filter((c) => c.id !== id) });
  const renameCurry = (id: string, name: string) =>
    update({ ...data, curries: data.curries.map((c) => (c.id === id ? { ...c, name } : c)) });

  const addCombo = () =>
    update({
      ...data,
      combinations: [
        ...data.combinations,
        {
          id: newId(),
          name: "New Combination",
          price: 15,
          curriesAllowed: 1,
          rotiIncluded: true,
          rotiCount: 4,
          riceIncluded: false,
          dahiRaitaIncluded: false,
        },
      ],
    });
  const updateCombo = (id: string, patch: Partial<Combination>) =>
    update({ ...data, combinations: data.combinations.map((c) => (c.id === id ? { ...c, ...patch } : c)) });
  const removeCombo = (id: string) =>
    update({ ...data, combinations: data.combinations.filter((c) => c.id !== id) });

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-saffron">Admin Dashboard</span>
          <h1 className="mt-1 font-display text-3xl font-bold text-primary md:text-4xl">Manage Weekly Menu</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { if (confirm("Reset entire week to defaults?")) setWeek(defaultWeek()); }}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:bg-secondary"
          >
            Reset Week
          </button>
          <button
            onClick={onLogout}
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Day picker */}
      <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-7">
        {DAYS.map((d) => (
          <button
            key={d}
            onClick={() => setDay(d)}
            className={`rounded-xl border px-2 py-3 text-sm font-semibold transition ${
              day === d
                ? "border-saffron bg-saffron text-saffron-foreground"
                : "border-border bg-card hover:border-saffron/50"
            }`}
          >
            {d.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Curries */}
      <Section title={`${day} · Curries`} action={<button onClick={addCurry} className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">+ Add Curry</button>}>
        <div className="grid gap-2 sm:grid-cols-2">
          {data.curries.map((c) => (
            <div key={c.id} className="flex items-center gap-2 rounded-xl border border-border bg-card p-2">
              <input
                value={c.name}
                onChange={(e) => renameCurry(c.id, e.target.value)}
                className="flex-1 bg-transparent px-2 py-1 text-sm focus:outline-none"
              />
              <button
                onClick={() => removeCurry(c.id)}
                className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* Combinations */}
      <Section title={`${day} · Combinations`} action={<button onClick={addCombo} className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">+ Add Combo</button>}>
        <div className="grid gap-4 md:grid-cols-2">
          {data.combinations.map((c) => (
            <div key={c.id} className="space-y-3 rounded-2xl border border-saffron/20 bg-card p-4 shadow-soft">
              <div className="grid grid-cols-3 gap-2">
                <label className="col-span-2 text-xs">
                  <span className="text-muted-foreground">Name</span>
                  <input value={c.name} onChange={(e) => updateCombo(c.id, { name: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                </label>
                <label className="text-xs">
                  <span className="text-muted-foreground">Price ($)</span>
                  <input type="number" min={0} value={c.price} onChange={(e) => updateCombo(c.id, { price: Number(e.target.value) })}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                </label>
              </div>
              <label className="block text-xs">
                <span className="text-muted-foreground">Curries customer can choose</span>
                <input type="number" min={1} max={5} value={c.curriesAllowed}
                  onChange={(e) => updateCombo(c.id, { curriesAllowed: Math.max(1, Number(e.target.value)) })}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Toggle label="Roti included" checked={c.rotiIncluded} onChange={(v) => updateCombo(c.id, { rotiIncluded: v })} />
                <label className="text-xs">
                  <span className="text-muted-foreground">Roti count</span>
                  <input type="number" min={0} disabled={!c.rotiIncluded} value={c.rotiCount}
                    onChange={(e) => updateCombo(c.id, { rotiCount: Number(e.target.value) })}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm disabled:opacity-50" />
                </label>
                <Toggle label="Rice included" checked={c.riceIncluded} onChange={(v) => updateCombo(c.id, { riceIncluded: v })} />
                <Toggle label="Dahi Raita included" checked={c.dahiRaitaIncluded} onChange={(v) => updateCombo(c.id, { dahiRaitaIncluded: v })} />
              </div>
              <button onClick={() => removeCombo(c.id)}
                className="w-full rounded-full bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive">
                Remove combination
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* Save Menu Changes */}
      <div className="mt-8 rounded-3xl border border-saffron/30 bg-card p-6 shadow-warm">
        <div className="flex flex-col items-center gap-3 text-center">
          <h3 className="font-display text-xl font-bold text-primary">Publish Changes</h3>
          <p className="text-sm text-muted-foreground">
            Save the entire weekly menu to the cloud so all visitors see the latest version.
          </p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-saffron px-8 py-3 text-sm font-semibold text-saffron-foreground shadow-warm transition hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Menu Changes"}
          </button>
          {saveMsg && (
            <p
              className={`text-sm font-medium ${
                saveMsg.type === "success" ? "text-green-700" : "text-destructive"
              }`}
            >
              {saveMsg.text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mt-8 rounded-3xl border border-border bg-card/70 p-6 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-primary">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs ${
        checked ? "border-primary bg-primary/5 text-primary" : "border-border bg-background text-foreground"
      }`}
    >
      <span>{label}</span>
      <span className={`grid h-4 w-4 place-items-center rounded-full border ${checked ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
        {checked ? "✓" : ""}
      </span>
    </button>
  );
}
