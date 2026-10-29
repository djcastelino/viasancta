"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Cross, Menu, X, ArrowUpRight } from "lucide-react";
import SettingsMenu from "./SettingsMenu";
const links = [
  ["/", "Home"],
  ["/#promise", "Today’s Promise"],
  ["/#tours", "Pilgrimages"],
  ["/#challenge", "Scripture"],
  ["/#spiritual-warfare", "Prayer"],
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
                href === "/" && pathname === "/" ? "page" : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="pilgrim-nav-actions">
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
            ["/#memory-verses", "Memory Verses"],
            ["/#salvation-history", "Salvation History"],
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
