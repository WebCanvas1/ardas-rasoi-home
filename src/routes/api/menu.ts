import { createFileRoute } from "@tanstack/react-router";

const KEY = "weekly-menu";

type KVNamespace = {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
};

function getKV(): KVNamespace | null {
  const env = (globalThis as unknown as { __CF_ENV__?: Record<string, unknown> }).__CF_ENV__;
  if (!env) return null;
  const kv = env["ARDAS_MENU"] as KVNamespace | undefined;
  return kv ?? null;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const Route = createFileRoute("/api/menu")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),
      GET: async () => {
        const kv = getKV();
        if (!kv) {
          return new Response(JSON.stringify({ error: "KV not bound", menu: null }), {
            status: 503,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
        try {
          const raw = await kv.get(KEY);
          return new Response(JSON.stringify({ menu: raw ? JSON.parse(raw) : null }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: String(e), menu: null }), {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
      },
      POST: async ({ request }) => {
        const kv = getKV();
        if (!kv) {
          return new Response(JSON.stringify({ error: "KV not bound" }), {
            status: 503,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
        try {
          const body = await request.json();
          await kv.put(KEY, JSON.stringify(body));
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: String(e) }), {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
      },
    },
  },
});
