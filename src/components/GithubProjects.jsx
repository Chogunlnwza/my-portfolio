import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt } from "react-icons/fa";

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
};

export default function GithubProjects({ repos, darkMode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  // Get unique languages
  const languages = ["All", ...new Set(repos.map((r) => r.language).filter(Boolean))];

  const filtered = repos
    .filter((r) => filter === "All" || r.language === filter)
    .sort((a, b) => b.stargazers_count - a.stargazers_count);

  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="repos" className="mt-20" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            <FaGithub className="inline mr-2 align-middle" size={28} />
            GitHub Projects
          </h2>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.5), transparent)" }} />
          <span className={`text-sm font-mono px-3 py-1 rounded-lg ${darkMode ? "bg-white/5 text-gray-400" : "bg-gray-100 text-gray-500"}`}>
            {filtered.length} repos
          </span>
        </div>

        {/* Language filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {languages.slice(0, 8).map((lang) => (
            <button
              key={lang}
              onClick={() => { setFilter(lang); setShowAll(false); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === lang
                  ? "text-white"
                  : darkMode
                  ? "text-gray-400 hover:text-white bg-white/5"
                  : "text-gray-600 hover:text-gray-900 bg-gray-100"
              }`}
              style={
                filter === lang
                  ? { background: "linear-gradient(135deg, #06b6d4, #a855f7)" }
                  : {}
              }
            >
              {lang !== "All" && LANG_COLORS[lang] && (
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: LANG_COLORS[lang] }}
                />
              )}
              {lang}
            </button>
          ))}
        </div>

        {/* Repos grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {visible.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`rounded-2xl p-5 border transition-all hover:scale-[1.02] hover:shadow-xl card-shine group ${
                darkMode
                  ? "bg-[#0d1424] border-white/5 hover:border-cyan-500/30"
                  : "bg-white border-gray-100 hover:border-cyan-500/30"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <FaGithub size={14} className={darkMode ? "text-gray-500" : "text-gray-400"} />
                    <h3 className={`font-bold text-base truncate group-hover:text-cyan-400 transition-colors ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {repo.name}
                    </h3>
                  </div>
                  <p className={`mt-2 text-sm leading-relaxed line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {repo.description || "No description provided."}
                  </p>
                </div>
                <FaExternalLinkAlt
                  size={12}
                  className={`flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                    darkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 mt-4 text-xs">
                {repo.language && (
                  <span className="flex items-center gap-1.5 font-medium" style={{ color: LANG_COLORS[repo.language] || "#6b7280" }}>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: LANG_COLORS[repo.language] || "#6b7280" }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className={`flex items-center gap-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  <FaStar size={10} className="text-yellow-400" />
                  {repo.stargazers_count}
                </span>
                <span className={`flex items-center gap-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  <FaCodeBranch size={10} />
                  {repo.forks_count}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Show more / less */}
        {filtered.length > 6 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:scale-105 ${
                darkMode
                  ? "border-white/10 text-gray-300 hover:bg-white/5"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {showAll ? "Show Less ↑" : `Show All ${filtered.length} Repos ↓`}
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}