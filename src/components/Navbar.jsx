import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuRef = useRef(null);

  // Detect scroll for glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={menuRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? "glass-dark shadow-xl shadow-black/20"
            : "glass-light shadow-xl shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-black text-xl gradient-text font-mono tracking-tight"
        >
          &lt;Panuwit /&gt;
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeSection === link.href.slice(1)
                  ? "text-cyan-400"
                  : darkMode
                  ? "text-gray-400 hover:text-white hover:bg-white/5"
                  : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
              }`}
              style={
                activeSection === link.href.slice(1)
                  ? { background: "rgba(6,182,212,0.1)" }
                  : {}
              }
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 ${
              darkMode
                ? "bg-white/10 text-yellow-400 hover:bg-white/15"
                : "bg-black/5 text-gray-700 hover:bg-black/10"
            }`}
            title="Toggle theme"
          >
            {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              darkMode ? "bg-white/10 text-white" : "bg-black/5 text-gray-700"
            }`}
          >
            {menuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={`md:hidden mx-4 mb-4 rounded-2xl p-4 border ${
            darkMode ? "glass-dark border-white/10" : "glass-light border-black/5"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all mb-1 ${
                activeSection === link.href.slice(1)
                  ? "text-cyan-400 bg-cyan-500/10"
                  : darkMode
                  ? "text-gray-300 hover:bg-white/5"
                  : "text-gray-700 hover:bg-black/5"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}