import { useState } from "react";
import { motion } from "framer-motion";
import { FaLock, FaUnlock, FaPlus, FaTrash } from "react-icons/fa";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin";

export default function AdminPanel({ darkMode, projects, setProjects }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "",
    github: "",
    demo: "",
    tech: "",
  });

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const addProject = () => {
    if (!newProject.title.trim()) return;
    const projectToAdd = {
      ...newProject,
      tech:
        typeof newProject.tech === "string"
          ? newProject.tech.split(",").map((t) => t.trim()).filter(Boolean)
          : newProject.tech,
    };
    setProjects([projectToAdd, ...projects]);
    setNewProject({ title: "", description: "", image: "", github: "", demo: "", tech: "" });
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium focus:ring-2 focus:ring-cyan-500/40 ${
    darkMode
      ? "bg-white/5 border-white/10 text-white placeholder-gray-600"
      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
  }`;

  return (
    <section className="mt-20">
      {!isAdmin ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl p-8 border shadow-xl max-w-md mx-auto ${
            darkMode ? "bg-[#0d1424] border-white/5" : "bg-white border-gray-100"
          }`}
        >
          <div className="text-center mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(6,182,212,0.1)" }}
            >
              <FaLock size={22} className="text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold">Admin Login</h2>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Manage your featured projects
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className={inputClass}
            />
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
            <button
              onClick={handleLogin}
              className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #06b6d4, #a855f7)" }}
            >
              Login
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl p-8 border shadow-xl ${
            darkMode ? "bg-[#0d1424] border-white/5" : "bg-white border-gray-100"
          }`}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(6,182,212,0.1)" }}
            >
              <FaUnlock size={16} className="text-cyan-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Admin Dashboard</h2>
              <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                Add or remove featured projects
              </p>
            </div>
            <button
              onClick={() => setIsAdmin(false)}
              className={`ml-auto text-xs px-3 py-1.5 rounded-lg border ${
                darkMode ? "border-white/10 text-gray-400 hover:bg-white/5" : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              Logout
            </button>
          </div>

          {/* Add project form */}
          <div className="space-y-4 mb-8">
            <h3 className={`text-sm font-semibold uppercase tracking-wide ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Add New Project
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input className={inputClass} type="text" placeholder="Project Title *" value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
              <input className={inputClass} type="text" placeholder="Tech Stack (comma separated)" value={newProject.tech}
                onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })} />
              <input className={inputClass} type="text" placeholder="Image URL" value={newProject.image}
                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })} />
              <input className={inputClass} type="text" placeholder="GitHub URL" value={newProject.github}
                onChange={(e) => setNewProject({ ...newProject, github: e.target.value })} />
              <input className={inputClass} type="text" placeholder="Live Demo URL" value={newProject.demo}
                onChange={(e) => setNewProject({ ...newProject, demo: e.target.value })} />
            </div>
            <textarea
              className={`${inputClass} min-h-[80px] resize-none`}
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <button
              onClick={addProject}
              disabled={!newProject.title.trim()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #06b6d4, #a855f7)" }}
            >
              <FaPlus size={14} />
              Add Project
            </button>
          </div>

          {/* Existing projects */}
          {projects.length > 0 && (
            <div>
              <h3 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Current Projects ({projects.length})
              </h3>
              <div className="space-y-3">
                {projects.map((p, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between rounded-xl p-4 border ${
                      darkMode ? "border-white/5 bg-white/3" : "border-gray-100 bg-gray-50"
                    }`}
                  >
                    <div>
                      <p className={`font-semibold text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>{p.title}</p>
                      <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                        {Array.isArray(p.tech) ? p.tech.join(", ") : p.tech}
                      </p>
                    </div>
                    <button
                      onClick={() => removeProject(i)}
                      className="p-2 rounded-xl text-red-400 hover:bg-red-400/10 transition-all"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
}