import { WHATSAPP_NUMBER } from "@/lib/menu-store";
import { WAIcon } from "./Hero";

export function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Ardas Rasoi!")}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-warm transition hover:scale-110"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp/40" />
      <WAIcon />
    </a>
  );
}
