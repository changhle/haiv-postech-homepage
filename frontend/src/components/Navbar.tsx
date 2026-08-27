"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroVantaFog from "./HeroVantaFog";

const links = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/members", label: "Members" },
  { href: "/events", label: "Events" },
  { href: "/join", label: "Join Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const content = document.getElementById("home-content");
      const threshold =
        pathname === "/"
          ? Math.max(0, (content?.offsetTop ?? window.innerHeight) - 64)
          : 24;
      setScrolled(window.scrollY >= threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const onHome = pathname === "/";
  const showHeroSurface = !onHome || scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div
        aria-hidden
        className={`hero-nav-surface absolute inset-0 overflow-hidden transition-opacity duration-500 ${
          showHeroSurface ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <HeroVantaFog active />
      </div>

      <nav className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="HAIV Lab home"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-85"
        >
          <Image
            src="/brand/postech-emblem-white.png"
            alt=""
            width={48}
            height={48}
            loading="eager"
            className="h-[1.9rem] w-[1.9rem]"
          />
          <span
            aria-hidden
            className="h-6 w-px bg-white/35"
          />
          <Image
            src="/brand/haiv-wordmark-light-white.png"
            alt=""
            width={116}
            height={40}
            loading="eager"
            className="h-[1.38rem] w-auto"
          />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`nav-menu-link nav-menu-link--hero relative rounded-md px-3 py-2 text-base font-semibold transition-colors ${
                  isActive(l.href)
                    ? "text-white"
                    : "text-white/75 hover:text-white"
                }`}
              >
                {l.label}
                {isActive(l.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-px h-px bg-white/80"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-5 bg-white transition-all ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-white transition-all ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 overflow-hidden border-t border-white/15 px-5 md:hidden"
          >
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`nav-menu-link nav-menu-link--hero block border-b border-white/15 py-3.5 text-base font-semibold last:border-b-0 ${
                    isActive(l.href) ? "text-white" : "text-white/75"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
