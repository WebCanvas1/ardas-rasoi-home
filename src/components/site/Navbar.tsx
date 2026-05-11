import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/ardas-logo.jpg";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Ardas Rasoi" className="h-11 w-11 rounded-full object-cover ring-2 ring-saffron/40" />
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold text-primary">Ardas Rasoi</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Homemade Tiffin</div>
          </div>
        </Link>
        <div className="hidden items-center gap-7 text-sm font-medium text-foreground/80 md:flex">
          <a href="/#about" className="hover:text-primary transition">About</a>
          <a href="/#menu" className="hover:text-primary transition">Menu</a>
          <a href="/#testimonials" className="hover:text-primary transition">Reviews</a>
          <a href="/#faq" className="hover:text-primary transition">FAQ</a>
          <a href="/#contact" className="hover:text-primary transition">Contact</a>
        </div>
        <Link
          to="/order"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:scale-[1.03] hover:bg-primary/90"
        >
          Order Now
        </Link>
      </nav>
    </header>
  );
}
