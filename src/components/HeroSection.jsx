import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FaGithub, FaDownload, FaArrowDown } from "react-icons/fa";

const ROLES = [
  "Software Developer",
  "Flutter Engineer",
  "AI Enthusiast",
  "Full-Stack Developer",
  "Data Analyst",
  "Live Streamer",
];

function useTypingEffect(words, speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let delay = deleting ? speed / 2 : speed;

    if (!deleting && charIdx === current.length) {
      delay = pause;
      const t = setTimeout(() => setDeleting(true), delay);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      setDisplayed(current.slice(0, deleting ? charIdx - 1 : charIdx + 1));
      setCharIdx((i) => i + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

export default function HeroSection({ darkMode }) {
  const typedRole = useTypingEffect(ROLES);
  const containerRef = useRef(null);

  const scrollDown = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        darkMode ? "animated-gradient" : "bg-gradient-to-br from-slate-50 via-cyan-50 to-purple-50"
      }`}
    >
      {/* Background Orbs */}
      {darkMode && (
        <>
          <div className="absolute top-1/4 -left-16 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl orb" />
          <div
            className="absolute bottom-1/4 -right-16 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl orb"
            style={{ animationDelay: "-4s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl orb"
            style={{ animationDelay: "-2s" }}
          />
        </>
      )}

      {/* Grid overlay */}
      {darkMode && (
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 text-sm font-medium"
          style={{
            borderColor: "rgba(6,182,212,0.4)",
            background: "rgba(6,182,212,0.1)",
            color: "#22d3ee",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 status-online" />
          Available for opportunities
        </motion.div>

        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            {/* Animated ring */}
            <div
              className="absolute -inset-1 rounded-full opacity-70"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #a855f7)",
                padding: "3px",
              }}
            />
            <div
              className="absolute -inset-1 rounded-full pulse-ring opacity-30"
              style={{ background: "linear-gradient(135deg, #06b6d4, #a855f7)" }}
            />
            <img
              src="/Photos/Panuwit.jpg"
              alt="Panuwit Thanyadee"
              className="relative w-32 h-32 rounded-full object-cover object-top border-4"
              style={{ borderColor: darkMode ? "#050a14" : "#ffffff" }}
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black tracking-tight"
        >
          <span className={darkMode ? "text-white" : "text-gray-900"}>
            Panuwit{" "}
          </span>
          <span className="gradient-text">Thanyadee</span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 h-10 flex items-center justify-center gap-1"
        >
          <span
            className="text-xl md:text-2xl font-semibold font-mono"
            style={{ color: "#22d3ee" }}
          >
            {typedRole}
          </span>
          <span
            className="text-xl md:text-2xl font-semibold cursor-blink"
            style={{ color: "#22d3ee" }}
          >
            |
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`mt-6 text-lg max-w-2xl mx-auto leading-relaxed ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Passionate about crafting elegant digital experiences — from{" "}
          <span className="text-cyan-400 font-medium">mobile apps</span> and{" "}
          <span className="text-purple-400 font-medium">AI systems</span> to
          full-stack web solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <a
            href="https://github.com/Chogunlnwza"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #06b6d4, #a855f7)",
              boxShadow: "0 8px 32px rgba(6,182,212,0.25)",
            }}
          >
            <FaGithub size={18} />
            View GitHub
          </a>

          <button
            onClick={scrollDown}
            className={`flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold border transition-all hover:scale-105 ${
              darkMode
                ? "border-white/10 text-white hover:bg-white/5"
                : "border-gray-200 text-gray-800 hover:bg-gray-100"
            }`}
          >
            <FaArrowDown size={16} />
            Explore
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-sm mx-auto"
        >
          {[
            { value: "3+", label: "Years Coding" },
            { value: "10+", label: "Projects Built" },
            { value: "∞", label: "Cups of Coffee" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-black gradient-text">{stat.value}</div>
              <div className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-6 h-10 rounded-full border-2 flex justify-center pt-2 cursor-pointer ${
              darkMode ? "border-white/20" : "border-gray-300"
            }`}
            onClick={scrollDown}
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{ background: "#06b6d4" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
