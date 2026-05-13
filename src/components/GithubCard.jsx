import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  FaGithub,
  FaUsers,
  FaUserFriends,
  FaStar,
  FaCode,
} from "react-icons/fa";

const GITHUB_USERNAME = "Chogunlnwza";

export default function GithubCard({ githubProfile, darkMode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (!githubProfile) return null;

  const stats = [
    { icon: <FaCode />, label: "Repositories", value: githubProfile.public_repos, color: "#06b6d4" },
    { icon: <FaUsers />, label: "Followers", value: githubProfile.followers, color: "#a855f7" },
    { icon: <FaUserFriends />, label: "Following", value: githubProfile.following, color: "#f59e0b" },
    { icon: <FaStar />, label: "Gists", value: githubProfile.public_gists, color: "#ec4899" },
  ];

  return (
    <section id="github-profile" className="mt-10" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className={`rounded-3xl p-8 border shadow-2xl card-shine ${darkMode ? "bg-[#0d1424] border-white/5" : "bg-white border-gray-100"
          }`}
      >
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Avatar + info */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={githubProfile.avatar_url}
                alt="GitHub avatar"
                className="w-20 h-20 rounded-2xl border-2"
                style={{ borderColor: "rgba(6,182,212,0.5)" }}
              />
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0d1117] border-2 flex items-center justify-center"
                style={{ borderColor: "rgba(6,182,212,0.5)" }}
              >
                <FaGithub size={12} className="text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{githubProfile.name || GITHUB_USERNAME}</h2>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 text-sm font-mono hover:underline"
              >
                @{githubProfile.login}
              </a>
              {githubProfile.bio && (
                <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {githubProfile.bio}
                </p>
              )}
              {githubProfile.location && (
                <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  📍 {githubProfile.location}
                </p>
              )}
            </div>
          </div>

          {/* Open profile link */}
          <div className="md:ml-auto">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #a855f7)",
                boxShadow: "0 4px 16px rgba(6,182,212,0.2)",
              }}
            >
              <FaGithub size={14} />
              View Profile
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl p-4 text-center border transition-all hover:scale-105 ${darkMode ? "border-white/5 bg-white/3" : "border-gray-100 bg-gray-50"
                }`}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2"
                style={{ background: `${stat.color}15`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <h3 className="text-2xl font-black">{stat.value}</h3>
              <p className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* GitHub contribution graph */}
        {/*
        <div className="mt-6">
          <p className={`text-xs mb-2 font-medium ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            Contribution Graph
          </p>
          <div className={`rounded-2xl overflow-hidden border ${darkMode ? "border-white/5" : "border-gray-100"}`}>
            <img
              src={`https://ghchart.ondras.cz/${GITHUB_USERNAME}`}
              alt="GitHub contribution chart"
              className="w-full"
              style={{ filter: darkMode ? "invert(1) hue-rotate(180deg) brightness(0.85)" : "none" }}
            />
          </div>
        </div>
        */}
      </motion.div>
    </section>
  );
}