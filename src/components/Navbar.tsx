"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navItems = [
  { label: "About", id: "about" },
  { label: "Work", id: "work" },
  { label: "Toolkit", id: "toolkit" },
  { label: "Proof", id: "proof" },
  { label: "Profiles", id: "profiles" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 24);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    const sections = ["home", ...navItems.map((item) => item.id), "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.15, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", updateScrolled);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="nav-inner site-container">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Satya Sai, home">
          <span className="brand-mark">S<span>.</span></span>
          <span className="brand-name">Satya Sai</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? "nav-link is-active" : "nav-link"}
              aria-current={activeSection === item.id ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="nav-contact" href="#contact">
          Let’s talk <ArrowUpRight size={15} strokeWidth={2.2} />
        </a>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <a key={item.id} href={`#${item.id}`} onClick={closeMenu}>
              <span>0{index + 1}</span>{item.label}<ArrowUpRight size={16} />
            </a>
          ))}
          <a className="mobile-contact-link" href="#contact" onClick={closeMenu}>
            <span>06</span>Contact<ArrowUpRight size={16} />
          </a>
        </nav>
      )}
    </header>
  );
}
