import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { FaCode, FaRobot, FaDatabase, FaGamepad } from "react-icons/fa";

const HIGHLIGHTS = [
  { icon: <FaCode size={18} />, label: "Software Dev", color: "#06b6d4" },
  { icon: <FaRobot size={18} />, label: "AI / ML", color: "#a855f7" },
  { icon: <FaDatabase size={18} />, label: "Data Analytics", color: "#f59e0b" },
  { icon: <FaGamepad size={18} />, label: "Streamer", color: "#ec4899" },
];

export default function AboutSection({ darkMode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="mt-8" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className={`rounded-3xl p-8 shadow-2xl border card-shine ${darkMode
            ? "bg-[#0d1424] border-white/5"
            : "bg-white border-gray-100"
          }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-3xl font-bold">About Me</h2>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.4), transparent)" }} />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Text */}
          <div className="md:col-span-2 space-y-4">
            <p className={`leading-8 text-base md:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              I'm <span className="text-cyan-400 font-semibold">Panuwit Thanyadee</span>, a
              software engineering student from Thailand 🇹🇭. I'm passionate about building
              elegant, high-performance software — from sleek mobile apps to intelligent AI systems.
            </p>
            <p className={`leading-8 text-base md:text-lg ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              I specialize in{" "}
              <span className="text-purple-400 font-medium">cross-platform mobile development</span>{" "}
              with Flutter, and love diving deep into{" "}
              <span className="text-cyan-400 font-medium">AI & computer vision</span> projects.
              When I'm not coding, I'm likely gaming.
            </p>

            {/* Quick facts */}
            <div className={`grid grid-cols-2 gap-3 pt-2`}>
              {[
                { label: "📍 Location", value: "Thailand" },
                { label: "🎓 Degree", value: "Software Engineering" },
                { label: "💼 Status", value: "Open to Work" },
                { label: "🗣️ Languages", value: "Thai, English" },
              ].map((fact) => (
                <div
                  key={fact.label}
                  className={`rounded-xl p-3 ${darkMode ? "bg-white/3" : "bg-gray-50"
                    }`}
                >
                  <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{fact.label}</p>
                  <p className={`text-sm font-semibold mt-0.5 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>{fact.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.label}
                className={`rounded-2xl p-4 flex flex-col items-center text-center gap-2 border transition-all hover:scale-105 ${darkMode ? "border-white/5 bg-white/3" : "border-gray-100 bg-gray-50"
                  }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${h.color}15`, color: h.color }}
                >
                  {h.icon}
                </div>
                <span className={`text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {h.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}