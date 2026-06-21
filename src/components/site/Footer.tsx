import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { WHATSAPP_NUMBER, WHATSAPP_GROUP_LINK } from "@/lib/menu-store";

export function Footer() {
  return (
    <footer className="border-t border-saffron/20 bg-cream py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-12 w-12 rounded-full object-cover ring-2 ring-saffron/40" />
            <div>
              <div className="font-display text-lg font-bold text-primary">House of Flavours</div>
              <div className="font-script text-saffron">Fresh Homemade Meals Delivered</div>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Pure vegetarian homemade tiffin service in Marayong / Blacktown, NSW. Pickup &amp; delivery within 5 km.
          </p>
          {/* TODO: replace WHATSAPP_GROUP_LINK in src/lib/menu-store.ts with the client's WhatsApp group/channel link */}
          <a
            href={WHATSAPP_GROUP_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-xs font-semibold text-whatsapp-foreground shadow-soft hover:-translate-y-0.5 transition"
          >
            💬 Join WhatsApp Group
          </a>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-saffron">Explore</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="/#about" className="hover:text-primary">About</a></li>
            <li><a href="/#menu" className="hover:text-primary">Weekly Menu</a></li>
            <li><a href="/#faq" className="hover:text-primary">FAQ</a></li>
            <li><Link to="/order" className="hover:text-primary">Order</Link></li>
            <li><Link to="/admin" className="hover:text-primary">Admin Login</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-saffron">Contact</div>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            <li>WhatsApp: {WHATSAPP_NUMBER}</li>
            <li>Marayong 2148 / Blacktown, NSW</li>
            <li>Pickup near Marayong Train Station</li>
            <li>Delivery within 5 km radius</li>
            <li>Please order at least 2 hours prior.</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-saffron/10 px-4 pt-6 text-center text-xs text-muted-foreground md:px-8">
        © {new Date().getFullYear()} House of Flavours. Made with ♥ in Marayong, NSW.
      </div>
    </footer>
  );
}
