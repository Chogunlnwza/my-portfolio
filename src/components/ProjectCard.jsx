import { motion } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectCard({ project, darkMode }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`group overflow-hidden rounded-3xl border shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl card-shine ${
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

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur text-white text-sm font-semibold hover:bg-white/20 transition-all"
            >
              <FaGithub size={14} />
              Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all"
              style={{ background: "linear-gradient(135deg, #06b6d4, #a855f7)" }}
            >
              <FaExternalLinkAlt size={12} />
              Demo
            </a>
          )}
        </div>

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
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
          {project.title}
        </h3>
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

        {/* Buttons */}
        <div className="flex gap-3 mt-5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #a855f7)",
                color: "white",
                boxShadow: "0 4px 12px rgba(6,182,212,0.2)",
              }}
            >
              <FaGithub size={14} />
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm border transition-all hover:scale-105 ${
                darkMode
                  ? "border-white/10 text-gray-300 hover:bg-white/5"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FaExternalLinkAlt size={12} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}