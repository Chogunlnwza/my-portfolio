import { useState } from "react";
import { AnimatePresence } from "framer-motion";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import LoadingScreen from "./components/LoadingScreen";

// Sections
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ContactSection from "./components/ContactSection";

// Cards / Dynamic
import GithubCard from "./components/GithubCard";
import DiscordCard from "./components/DiscordCard";
import SocialTabs from "./components/SocialTabs";
import ProjectCard from "./components/ProjectCard";
import GithubProjects from "./components/GithubProjects";
import AdminPanel from "./components/AdminPanel";

// Hooks & Context
import useGithub from "./hooks/useGithub";
import useDiscord from "./hooks/useDiscord";
import { useTheme } from "./context/ThemeContext";

const INITIAL_PROJECTS = [
  {
    title: "Sport Booking App",
    description:
      "A Flutter application for sport court booking and membership management with real-time availability tracking.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format",
    tech: ["Flutter", "Firebase", "REST API", "Dart"],
    github: "https://github.com/Chogunlnwza/sport",
    demo: "https://github.com/Chogunlnwza",
  },
  {
    title: "AI Supercomputer Simulation",
    description:
      "Distributed AI simulation system with FastAPI backend, real-time satellite data integration, and computer vision models.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format",
    tech: ["Python", "FastAPI", "OpenCV", "AI"],
    github: "https://github.com/Chogunlnwza/super-computer-PJ-main",
    demo: "https://github.com/Chogunlnwza",
  },
];

export default function App() {
  const { darkMode } = useTheme();
  const { repos, githubProfile } = useGithub();
  const { discordData } = useDiscord();
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div
          className={`min-h-screen transition-colors duration-300 ${
            darkMode ? "bg-[#050a14] text-white" : "bg-[#f8fafc] text-gray-900"
          }`}
        >
          <ScrollProgress />
          <Navbar />

          {/* ── Hero ── */}
          <HeroSection darkMode={darkMode} />

          {/* ── Main Content ── */}
          <main className="max-w-5xl mx-auto px-6 pb-10">

            {/* About */}
            <AboutSection darkMode={darkMode} />

            {/* Skills */}
            <SkillsSection darkMode={darkMode} />

            {/* GitHub Profile */}
            <GithubCard githubProfile={githubProfile} darkMode={darkMode} />

            {/* Discord Status */}
            <DiscordCard discordData={discordData} darkMode={darkMode} />

            {/* Social Links */}
            <SocialTabs darkMode={darkMode} />

            {/* Experience */}
            <ExperienceTimeline darkMode={darkMode} />

            {/* Featured Projects */}
            <section id="projects" className="mt-20">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold">🚀 Featured Projects</h2>
                <div
                  className="flex-1 h-px"
                  style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.5), transparent)" }}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} darkMode={darkMode} />
                ))}
              </div>
            </section>

            {/* GitHub Projects */}
            <GithubProjects repos={repos} darkMode={darkMode} />

            {/* Contact */}
            <ContactSection darkMode={darkMode} />

            {/* Admin Panel */}
            <AdminPanel darkMode={darkMode} projects={projects} setProjects={setProjects} />

          </main>

          <Footer darkMode={darkMode} />
        </div>
      )}
    </>
  );
}