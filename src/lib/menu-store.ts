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

// Bumped key so existing Ardas Rasoi caches don't override House of Flavours defaults.
const STORAGE_KEY = "house-of-flavours-menu-v1";

const uid = () => Math.random().toString(36).slice(2, 10);

const emptyDay = (): DayMenu => ({ curries: [], combinations: [] });

export const defaultWeek = (): WeekMenu => {
  const week = {} as WeekMenu;
  for (const d of DAYS) week[d] = emptyDay();

  // Wednesday — Dinner Only
  week.Wednesday = {
    curries: [{ id: uid(), name: "Chole Curry" }],
    combinations: [
      {
        id: uid(),
        name: "Chole + Rice + 4 Roti (Dinner)",
        price: 15,
        curriesAllowed: 1,
        rotiIncluded: true,
        rotiCount: 4,
        riceIncluded: true,
        dahiRaitaIncluded: false,
      },
    ],
  };

  // Thursday — Lunch & Dinner
  week.Thursday = {
    curries: [
      { id: uid(), name: "Curd Tadka with Rice" },
      { id: uid(), name: "Aloo Gobhi Subzy" },
    ],
    combinations: [
      {
        id: uid(),
        name: "Curd Tadka Rice + Aloo Gobhi + 4 Roti",
        price: 15,
        curriesAllowed: 2,
        rotiIncluded: true,
        rotiCount: 4,
        riceIncluded: false,
        dahiRaitaIncluded: false,
      },
    ],
  };

  // Friday — Lunch & Dinner
  week.Friday = {
    curries: [{ id: uid(), name: "Rajma Curry" }],
    combinations: [
      {
        id: uid(),
        name: "Rajma + Rice + 4 Roti",
        price: 15,
        curriesAllowed: 1,
        rotiIncluded: true,
        rotiCount: 4,
        riceIncluded: true,
        dahiRaitaIncluded: false,
      },
    ],
  };

  // Saturday — Lunch & Dinner
  week.Saturday = {
    curries: [
      { id: uid(), name: "Drum Sticks Subzy" },
      { id: uid(), name: "Daal" },
    ],
    combinations: [
      {
        id: uid(),
        name: "Drum Sticks + Daal + Rice + 4 Roti",
        price: 15,
        curriesAllowed: 2,
        rotiIncluded: true,
        rotiCount: 4,
        riceIncluded: true,
        dahiRaitaIncluded: false,
      },
    ],
  };

  // Sunday — Special
  week.Sunday = {
    curries: [
      { id: uid(), name: "Dal Baati" },
      { id: uid(), name: "Garlic Chutney" },
    ],
    combinations: [
      {
        id: uid(),
        name: "Sunday Special · Dal Baati + Garlic Chutney + Rice",
        price: 22,
        curriesAllowed: 2,
        rotiIncluded: false,
        rotiCount: 0,
        riceIncluded: true,
        dahiRaitaIncluded: false,
      },
    ],
  };

  // Monday + Tuesday remain empty → shown as "Menu not available" on the site.
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
  window.dispatchEvent(new Event("hof-menu-updated"));
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
    setWeek(loadWeek());
    fetchWeekFromApi().then((remote) => {
      if (remote) {
        setWeek(remote);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(remote));
        } catch {}
      }
    });
    const handler = () => setWeek(loadWeek());
    window.addEventListener("hof-menu-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("hof-menu-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return [week, (w: WeekMenu) => { setWeek(w); saveWeek(w); }] as const;
};

export const newId = uid;

// WhatsApp business number — keep as a variable so the client can update later.
export const WHATSAPP_NUMBER = "61422931252";

// Placeholder — replace with House of Flavours WhatsApp group/channel invite link.
export const WHATSAPP_GROUP_LINK = "#";

export const todayName = (): Day => {
  const d = new Date().getDay();
  const map: Day[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return map[d];
};
