import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";

const SKILLS = {
  "Frontend": [
    { name: "React", level: 80, icon: "⚛️" },
    { name: "JavaScript", level: 85, icon: "🟨" },
    { name: "TypeScript", level: 65, icon: "🔷" },
    { name: "TailwindCSS", level: 90, icon: "🎨" },
    { name: "HTML / CSS", level: 92, icon: "🌐" },
  ],
  "Backend": [
    { name: "Java", level: 70, icon: "🍵" },
    { name: "Python", level: 88, icon: "🐍" },
    { name: "FastAPI", level: 75, icon: "⚡" },
    { name: "Node.js", level: 65, icon: "🟢" },
    { name: "REST APIs", level: 85, icon: "🔌" },
  ],
  "Mobile": [
    { name: "Flutter", level: 85, icon: "📱" },
    { name: "Dart", level: 82, icon: "🎯" },
    { name: "Firebase", level: 78, icon: "🔥" },
  ],
  "AI / Data": [
    { name: "OpenCV", level: 75, icon: "👁️" },
    { name: "TensorFlow", level: 60, icon: "🧠" },
    { name: "Data Analytics", level: 78, icon: "📊" },
    { name: "Pandas / NumPy", level: 80, icon: "🐼" },
  ],
  "Tools": [
    { name: "Git / GitHub", level: 90, icon: "🐙" },
    { name: "Docker", level: 60, icon: "🐳" },
    { name: "Vercel", level: 85, icon: "▲" },
  ],
};

function SkillBar({ name, level, icon, darkMode, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className={`font-medium flex items-center gap-1.5 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
          <span>{icon}</span> {name}
        </span>
        <span className="text-cyan-400 font-mono font-semibold text-xs">{level}%</span>
      </div>
      <div className={`h-1.5 rounded-full overflow-hidden ${darkMode ? "bg-white/5" : "bg-gray-100"}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay * 0.1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #06b6d4, #a855f7)" }}
        />
      </div>
    </div>
  );
}

const TABS = Object.keys(SKILLS);

export default function SkillsSection({ darkMode }) {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="mt-20" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            🛠️ Skills &amp; Technologies
          </h2>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.5), transparent)" }} />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "text-white shadow-lg"
                  : darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              style={
                activeTab === tab
                  ? { background: "linear-gradient(135deg, #06b6d4, #a855f7)", boxShadow: "0 4px 16px rgba(6,182,212,0.3)" }
                  : { background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" }
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`rounded-3xl p-8 border shadow-xl ${
            darkMode
              ? "bg-[#0d1424] border-white/5"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-5">
            {SKILLS[activeTab].map((skill, i) => (
              <SkillBar
                key={skill.name}
                {...skill}
                darkMode={darkMode}
                delay={i}
              />
            ))}
          </div>
        </motion.div>

        {/* Tech Tag Cloud */}
        <div className="mt-6 flex flex-wrap gap-2">
          {Object.values(SKILLS).flat().map((skill) => (
            <span
              key={skill.name}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all hover:scale-105 cursor-default ${
                darkMode
                  ? "bg-white/5 text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-400"
                  : "bg-gray-100 text-gray-600 hover:bg-cyan-50 hover:text-cyan-600"
              }`}
            >
              {skill.icon} {skill.name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
