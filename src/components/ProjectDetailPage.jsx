import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaTag, FaLayerGroup, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

// ─── Lightbox Modal ───────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
      >
        <FaTimes size={16} />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
        {current + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
        >
          <FaChevronLeft size={14} />
        </button>
      )}

      {/* Image */}
      <motion.img
        key={current}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        src={images[current].src}
        alt={images[current].caption}
        className="max-w-[85vw] max-h-[80vh] rounded-2xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
        >
          <FaChevronRight size={14} />
        </button>
      )}

      {/* Caption */}
      {images[current].caption && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/40 px-4 py-2 rounded-full backdrop-blur">
          {images[current].caption}
        </div>
      )}
    </motion.div>
  );
}

// ─── Screenshot Gallery ────────────────────────────────────────
function ScreenshotGallery({ screenshots, darkMode }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`rounded-3xl p-6 border ${darkMode ? "bg-[#0d1424] border-white/5" : "bg-white border-gray-100"} shadow-xl`}
      >
        <h2 className="text-xl font-bold mb-4">📸 Screenshots</h2>
        <div className={`grid gap-3 ${screenshots.length === 1 ? "grid-cols-1" : screenshots.length === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}>
          {screenshots.map((shot, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={shot.src}
                alt={shot.caption}
                className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs font-semibold bg-white/10 backdrop-blur px-3 py-1.5 rounded-full">
                  🔍 ขยาย
                </span>
              </div>
              {/* Caption badge */}
              {shot.caption && (
                <div className={`absolute bottom-0 left-0 right-0 px-3 py-2 text-xs font-medium text-white ${darkMode ? "bg-gradient-to-t from-black/70" : "bg-gradient-to-t from-black/60"}`}>
                  {shot.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={screenshots}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Main Detail Page ──────────────────────────────────────────
export default function ProjectDetailPage({ projects }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const project = projects[parseInt(id)];

  if (!project) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-[#050a14] text-white" : "bg-[#f8fafc] text-gray-900"}`}>
        <div className="text-center">
          <p className="text-6xl mb-4">🚀</p>
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <button onClick={() => navigate("/")} className="mt-4 px-6 py-3 rounded-xl text-white font-semibold" style={{ background: "linear-gradient(135deg, #06b6d4, #a855f7)" }}>
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#050a14] text-white" : "bg-[#f8fafc] text-gray-900"}`}>
      {/* Top Bar */}
      <div className={`sticky top-0 z-50 backdrop-blur-md border-b ${darkMode ? "bg-[#050a14]/80 border-white/10" : "bg-white/80 border-gray-200"}`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/#projects")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all hover:scale-105 ${
              darkMode ? "bg-white/5 hover:bg-white/10 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <FaArrowLeft size={13} />
            Back to Projects
          </button>
          <span className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>/ {project.title}</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,10,20,0.2) 0%, rgba(5,10,20,0.85) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {project.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
                style={{ background: "rgba(6,182,212,0.2)", color: "#22d3ee", border: "1px solid rgba(6,182,212,0.4)" }}>
                <FaTag size={10} />
                {project.category}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-black text-white">{project.title}</h1>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-10">

          {/* Left: Description + Sections + Gallery */}
          <div className="md:col-span-2 space-y-8">
            {/* Short description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`rounded-3xl p-6 border ${darkMode ? "bg-[#0d1424] border-white/5" : "bg-white border-gray-100"} shadow-xl`}
            >
              <h2 className="text-xl font-bold mb-3">Overview</h2>
              <p className={`leading-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {project.description}
              </p>
            </motion.div>

            {/* Long Description Sections */}
            {project.sections && project.sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                className={`rounded-3xl p-6 border ${darkMode ? "bg-[#0d1424] border-white/5" : "bg-white border-gray-100"} shadow-xl`}
              >
                <h2 className="text-xl font-bold mb-3">{section.title}</h2>
                {section.content && (
                  <p className={`leading-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {section.content}
                  </p>
                )}
                {section.bullets && (
                  <ul className={`mt-3 space-y-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {section.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#06b6d4" }} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}

            {/* Screenshots Gallery */}
            <ScreenshotGallery screenshots={project.screenshots} darkMode={darkMode} />

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
                  style={{ background: "linear-gradient(135deg, #06b6d4, #a855f7)", boxShadow: "0 8px 24px rgba(6,182,212,0.25)" }}
                >
                  <FaGithub size={18} />
                  Source Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold border transition-all hover:scale-105 ${
                    darkMode ? "border-white/10 text-white hover:bg-white/5" : "border-gray-200 text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <FaExternalLinkAlt size={14} />
                  Live Demo
                </a>
              )}
            </motion.div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`rounded-3xl p-6 border ${darkMode ? "bg-[#0d1424] border-white/5" : "bg-white border-gray-100"} shadow-xl sticky top-24`}
            >
              {/* Category */}
              {project.category && (
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <FaTag size={12} style={{ color: "#22d3ee" }} />
                    <span className={`text-xs uppercase tracking-widest font-semibold ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Category</span>
                  </div>
                  <span className={`text-sm font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>{project.category}</span>
                </div>
              )}

              <div className={`h-px mb-5 ${darkMode ? "bg-white/5" : "bg-gray-100"}`} />

              {/* Tech Stack */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FaLayerGroup size={12} style={{ color: "#a855f7" }} />
                  <span className={`text-xs uppercase tracking-widest font-semibold ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(project.tech) && project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                        darkMode ? "bg-white/5 text-gray-300" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`h-px my-5 ${darkMode ? "bg-white/5" : "bg-gray-100"}`} />

              {/* Quick links */}
              <div className="space-y-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-2 text-sm font-medium transition-all hover:opacity-80 ${darkMode ? "text-cyan-400" : "text-cyan-600"}`}
                  >
                    <FaGithub size={14} />
                    View on GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-2 text-sm font-medium transition-all hover:opacity-80 ${darkMode ? "text-purple-400" : "text-purple-600"}`}
                  >
                    <FaExternalLinkAlt size={12} />
                    Live Website
                  </a>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
