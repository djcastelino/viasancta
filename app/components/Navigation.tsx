"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Cross, Menu, X, ArrowUpRight } from "lucide-react";
import SettingsMenu from "./SettingsMenu";
import PraiseChainBadge from "./PraiseChainBadge";
import { showPrayerSection } from "../lib/sectionVisibility";
const links = [
  ["/", "Home"],
  ["/discover", "Discover"],
  ["/#tours", "Pilgrimages"],
  ["/#challenge", "Scripture"],
  ...(showPrayerSection ? [["/#spiritual-warfare", "Prayer"]] : []),
  ["/ask-the-doctors", "Doctors"],
];
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="pilgrim-nav">
      <div className="pilgrim-nav-inner">
        <Link
          href="/"
          className="pilgrim-brand"
          aria-label="Divine Pilgrim home"
          onClick={() => setOpen(false)}
        >
          <span className="pilgrim-brand-mark">
            <Cross size={26} strokeWidth={1.1} />
          </span>
          <span>
            Divine Pilgrim<small>SACRED JOURNEYS · EVERYDAY GRACE</small>
          </span>
        </Link>
        <nav className="pilgrim-desktop-nav" aria-label="Main navigation">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                (href === "/" && pathname === "/") ||
                (href === "/ask-the-doctors" && pathname.startsWith("/ask-the-doctors")) ||
                (href === "/#tours" &&
                  [
                    "/tours/",
                    "/miracles/",
                    "/sacred-mountains",
                    "/sacred-architecture",
                    "/sacred-trails",
                    "/stations-of-the-cross",
                    "/biblical-timeline",
                    "/jesus-in-ot",
                  ].some((path) => pathname.startsWith(path))) ||
                (href === "/#challenge" &&
                  (pathname.startsWith("/challenge") ||
                    pathname.startsWith("/memory-verses")))
                  ? "page"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="pilgrim-nav-actions">
          {showPrayerSection && <PraiseChainBadge />}
          <Link href="/about" className="pilgrim-about-link">
            Our story <ArrowUpRight size={14} />
          </Link>
          <SettingsMenu />
          <button
            className="pilgrim-menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="pilgrim-mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          className="pilgrim-mobile-nav"
          id="pilgrim-mobile-nav"
          aria-label="Mobile navigation"
        >
          {[
            ...links,
            ["/about", "Our story"],
          ].map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
