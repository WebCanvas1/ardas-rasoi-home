import { useEffect, useState } from "react";

export type Curry = { id: string; name: string };
export type Combination = {
  id: string;
  name: string;
  price: number;
  curriesAllowed: number;
  rotiIncluded: boolean;
  rotiCount: number;
  riceIncluded: boolean;
  dahiRaitaIncluded: boolean;
};
export type DayMenu = {
  curries: Curry[];
  combinations: Combination[];
};
export type WeekMenu = Record<string, DayMenu>;

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;
export type Day = (typeof DAYS)[number];

const STORAGE_KEY = "ardas-rasoi-menu-v1";

const uid = () => Math.random().toString(36).slice(2, 10);

const baseCurries = (): Curry[] => [
  { id: uid(), name: "Baingan Bharta" },
  { id: uid(), name: "Mix Dal" },
  { id: uid(), name: "Aloo Jeera" },
  { id: uid(), name: "Black Channe" },
];

const baseCombos = (): Combination[] => [
  {
    id: uid(),
    name: "Any 2 Curries + 4 Roti",
    price: 15,
    curriesAllowed: 2,
    rotiIncluded: true,
    rotiCount: 4,
    riceIncluded: false,
    dahiRaitaIncluded: false,
  },
  {
    id: uid(),
    name: "1 Curry + Dahi Raita + 4 Roti",
    price: 15,
    curriesAllowed: 1,
    rotiIncluded: true,
    rotiCount: 4,
    riceIncluded: false,
    dahiRaitaIncluded: true,
  },
  {
    id: uid(),
    name: "1 Curry + Rice + Dahi Raita",
    price: 15,
    curriesAllowed: 1,
    rotiIncluded: false,
    rotiCount: 0,
    riceIncluded: true,
    dahiRaitaIncluded: true,
  },
  {
    id: uid(),
    name: "Any 2 Curries + Rice",
    price: 15,
    curriesAllowed: 2,
    rotiIncluded: false,
    rotiCount: 0,
    riceIncluded: true,
    dahiRaitaIncluded: false,
  },
];

export const defaultWeek = (): WeekMenu => {
  const week = {} as WeekMenu;
  for (const d of DAYS) {
    week[d] = { curries: baseCurries(), combinations: baseCombos() };
  }
  return week;
};

export const loadWeek = (): WeekMenu => {
  if (typeof window === "undefined") return defaultWeek();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultWeek();
    return JSON.parse(raw);
  } catch {
    return defaultWeek();
  }
};

export const saveWeek = (w: WeekMenu) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(w));
  window.dispatchEvent(new Event("ardas-menu-updated"));
};

export const fetchWeekFromApi = async (): Promise<WeekMenu | null> => {
  try {
    const res = await fetch("/api/menu", { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.menu as WeekMenu) ?? null;
  } catch {
    return null;
  }
};

export const saveWeekToApi = async (w: WeekMenu): Promise<boolean> => {
  try {
    const res = await fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(w),
    });
    return res.ok;
  } catch {
    return false;
  }
};

export const useWeekMenu = () => {
  const [week, setWeek] = useState<WeekMenu>(() => defaultWeek());
  useEffect(() => {
    // Local first for instant UI
    setWeek(loadWeek());
    // Then refresh from API (KV) if available
    fetchWeekFromApi().then((remote) => {
      if (remote) {
        setWeek(remote);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(remote));
        } catch {}
      }
    });
    const handler = () => setWeek(loadWeek());
    window.addEventListener("ardas-menu-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("ardas-menu-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return [week, (w: WeekMenu) => { setWeek(w); saveWeek(w); }] as const;
};


export const newId = uid;

export const WHATSAPP_NUMBER = "61422931252";

export const todayName = (): Day => {
  const d = new Date().getDay();
  // 0=Sun
  const map: Day[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return map[d];
};
