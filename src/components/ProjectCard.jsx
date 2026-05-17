import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function ProjectCard({ project, darkMode, index }) {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => navigate(`/projects/${index}`)}
      className={`group overflow-hidden rounded-3xl border shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl card-shine cursor-pointer ${
        darkMode
          ? "bg-[#0d1424] border-white/5 hover:border-cyan-500/30"
          : "bg-white border-gray-100 hover:border-cyan-500/30"
      }`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {!imgError ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-5xl"
            style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(168,85,247,0.1))" }}
          >
            🚀
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, rgba(5,10,20,0.7) 0%, transparent 60%)" }} />

        {/* Tech badge overlay */}
        {project.tech && project.tech[0] && (
          <div className="absolute top-3 left-3">
            <span
              className="text-xs px-2.5 py-1 rounded-lg font-semibold backdrop-blur"
              style={{
                background: "rgba(6,182,212,0.2)",
                color: "#22d3ee",
                border: "1px solid rgba(6,182,212,0.3)",
              }}
            >
              {project.tech[0]}
            </span>
          </div>
        )}

        {/* Category badge */}
        {project.category && (
          <div className="absolute top-3 right-3">
            <span
              className="text-xs px-2.5 py-1 rounded-lg font-semibold backdrop-blur"
              style={{
                background: "rgba(168,85,247,0.2)",
                color: "#c084fc",
                border: "1px solid rgba(168,85,247,0.3)",
              }}
            >
              {project.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            {project.title}
          </h3>
          <motion.div
            className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0"
            style={{ background: "linear-gradient(135deg, #06b6d4, #a855f7)" }}
          >
            <FaArrowRight size={12} className="text-white" />
          </motion.div>
        </div>

        <p className={`mt-3 text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-4">
          {Array.isArray(project.tech) &&
            project.tech.map((tech, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  darkMode
                    ? "bg-white/5 text-gray-400"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tech}
              </span>
            ))}
        </div>

        {/* "View Details" hint */}
        <div className={`mt-4 flex items-center gap-1 text-xs font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100 ${darkMode ? "text-cyan-400" : "text-cyan-600"}`}>
          View Details <FaArrowRight size={10} />
        </div>
      </div>
    </motion.div>
  );
}