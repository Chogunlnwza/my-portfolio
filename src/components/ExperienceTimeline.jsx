import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const TIMELINE = [
  {
    year: "2023 – Present",
    icon: "🎓",
    title: "Bachelor of Science — Software Engineering",
    organization: "Rajamangala University of Technology Isan (RMUTI)",
    description:
      "Studying software engineering with focus on mobile development, AI/ML, and distributed systems. GPA: 3.xx",
    tags: ["Software Engineering", "AI", "Mobile Dev"],
    type: "education",
  },
  {
    year: "2024",
    icon: "🚀",
    title: "AI Supercomputer Simulation Project",
    organization: "Personal Project",
    description:
      "Built a distributed AI simulation system using FastAPI backend, real-time satellite data integration, and computer vision models.",
    tags: ["Python", "FastAPI", "AI", "OpenCV"],
    type: "project",
  },
  {
    year: "2024",
    icon: "📱",
    title: "Sport Court Booking App",
    organization: "Team Project",
    description:
      "Developed a full-featured Flutter mobile application for sport court booking and membership management with Firebase backend.",
    tags: ["Flutter", "Firebase", "REST API"],
    type: "project",
  },
  {
    year: "2023",
    icon: "💻",
    title: "Started Programming Journey",
    organization: "Self-Taught",
    description:
      "Began exploring software development with Python and web technologies. Fell in love with building things from scratch.",
    tags: ["Python", "HTML/CSS", "JavaScript"],
    type: "milestone",
  },
];

const TYPE_COLORS = {
  education: { bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.4)", dot: "#a855f7" },
  project: { bg: "rgba(6,182,212,0.1)", border: "rgba(6,182,212,0.4)", dot: "#06b6d4" },
  milestone: { bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.4)", dot: "#fbbf24" },
};

function TimelineItem({ item, index, darkMode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const colors = TYPE_COLORS[item.type];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-8"
    >
      {/* Dot */}
      <div
        className="absolute left-0 top-5 w-4 h-4 rounded-full border-2 z-10"
        style={{
          backgroundColor: colors.dot,
          borderColor: colors.dot,
          boxShadow: `0 0 12px ${colors.dot}50`,
        }}
      />

      <div
        className={`rounded-2xl p-6 border transition-all hover:scale-[1.01] card-shine ${
          darkMode ? "bg-[#0d1424]" : "bg-white"
        }`}
        style={{ borderColor: colors.border }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{item.icon}</span>
            <h3 className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
              {item.title}
            </h3>
          </div>
          <span
            className="text-xs font-mono px-3 py-1 rounded-full font-semibold"
            style={{ background: colors.bg, color: colors.dot }}
          >
            {item.year}
          </span>
        </div>

        <p className="text-cyan-400 text-sm font-medium mb-2">{item.organization}</p>
        <p className={`text-sm leading-relaxed mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2 py-1 rounded-lg ${
                darkMode ? "bg-white/5 text-gray-400" : "bg-gray-100 text-gray-600"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceTimeline({ darkMode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="mt-20" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">📚 Experience &amp; Education</h2>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(168,85,247,0.5), transparent)" }} />
        </div>

        {/* Timeline */}
        <div className="relative space-y-6">
          {/* Vertical line */}
          <div
            className="absolute left-[7px] top-0 bottom-0 w-0.5 timeline-line rounded-full"
            style={{ opacity: 0.3 }}
          />

          {TIMELINE.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} darkMode={darkMode} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
