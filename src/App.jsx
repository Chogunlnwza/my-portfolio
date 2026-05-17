import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

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
import ProjectDetailPage from "./components/ProjectDetailPage";

// Hooks & Context
import useGithub from "./hooks/useGithub";
import useDiscord from "./hooks/useDiscord";
import { useTheme } from "./context/ThemeContext";

// ─────────────────────────────────────────────────────────────
// PROJECT DATA — แก้ไขรายละเอียดโปรเจกต์ได้ที่นี่เลยครับ
// ─────────────────────────────────────────────────────────────
const INITIAL_PROJECTS = [
  {
    title: "Sport Booking App",
    category: "Mobile App",
    description:
      "A Flutter application for sport court booking and membership management with real-time availability tracking.",
    image: "/Photos/sport-app.png",
    tech: ["Flutter", "Firebase", "Dart", "REST API"],
    github: "https://github.com/Chogunlnwza/sport",
    demo: "https://sport-pi-six.vercel.app/",
    screenshots: [
      { src: "/Photos/sport-app.png", caption: "Login Page" },
    ],
    sections: [
      {
        title: "About This Project",
        content:
          "Sport Booking App is a cross-platform mobile application built with Flutter that allows users to book sports facilities and manage memberships seamlessly. The app features real-time court availability, booking management, and an intuitive user interface designed for sports enthusiasts.",
      },
      {
        title: "Key Features",
        bullets: [
          "Real-time court availability tracking",
          "User authentication and profile management",
          "Booking history and management",
          "Membership plan selection and management",
          "Push notifications for booking confirmations",
          "Responsive design for both Android and iOS",
        ],
      },
      {
        title: "Technical Details",
        content:
          "Built with Flutter for cross-platform compatibility, the app leverages Firebase for real-time database updates, user authentication, and cloud storage. REST APIs are used for additional backend integration.",
      },
    ],
  },
  {
    title: "AI Supercomputer Simulation",
    category: "AI / Backend",
    description:
      "Distributed AI simulation system with FastAPI backend, real-time satellite data integration, and computer vision models.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format",
    tech: ["Python", "FastAPI", "OpenCV", "AI"],
    github: "https://github.com/Chogunlnwza/super-computer-PJ-main",
    demo: null,
    screenshots: [],
    sections: [
      {
        title: "About This Project",
        content:
          "A distributed AI simulation platform designed to mimic the behaviour of a supercomputer processing pipeline. The system integrates real-time satellite data feeds and applies computer vision models to analyse and process the incoming data streams.",
      },
      {
        title: "Key Features",
        bullets: [
          "Real-time satellite data integration",
          "Computer vision processing pipeline",
          "FastAPI REST backend with async support",
          "Distributed task execution simulation",
          "Interactive data visualisation dashboard",
        ],
      },
      {
        title: "Technical Details",
        content:
          "The backend is built with FastAPI for high-performance asynchronous request handling. OpenCV powers the computer vision modules, while the simulation layer distributes workloads across processing nodes to replicate a supercomputer environment.",
      },
    ],
  },
  {
    title: "Student Performance Tracker",
    category: "Web App",
    description:
      "A full-stack web application for tracking and evaluating student performance with teacher dashboards and real-time analytics.",
    image: "/Photos/student-tracker.png",
    tech: ["React", "Vite", "Tailwind CSS", "Node.js"],
    github: "https://github.com/Chogunlnwza/student-performance-tracker",
    demo: "https://student-performance-tracker-pearl.vercel.app/",
    screenshots: [
      { src: "/Photos/student-tracker.png", caption: "Login Page" },
      { src: "/Photos/student-tracker-teacher-dashboard.png", caption: "Teacher Dashboard" },
      { src: "/Photos/student-tracker-add-task.png", caption: "Create Assignment Form" },
      { src: "/Photos/student-tracker-student-dashboard.png", caption: "Student Dashboard" },
    ],
    sections: [
      {
        title: "About This Project",
        content:
          "Student Performance Tracker is a web-based platform that enables teachers to monitor, evaluate, and analyse student performance data. The system provides an intuitive dashboard with real-time analytics and reporting tools.",
      },
      {
        title: "Key Features",
        bullets: [
          "Teacher dashboard with performance analytics",
          "Student submission management",
          "Real-time grade tracking and reporting",
          "Role-based access control (Teacher / Student)",
          "Data visualisation with charts and graphs",
          "Responsive design optimised for desktop and mobile",
        ],
      },
      {
        title: "Technical Details",
        content:
          "Built with React and Vite for a fast development experience, styled with Tailwind CSS for a clean modern UI. The backend is powered by Node.js, handling API requests and database interactions efficiently.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Main Portfolio Page
// ─────────────────────────────────────────────────────────────
function PortfolioHome({ projects, setProjects }) {
  const { darkMode } = useTheme();
  const { repos, githubProfile, githubLoading } = useGithub();
  const { discordData, discordLoading } = useDiscord();

  return (
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
        <GithubCard githubProfile={githubProfile} githubLoading={githubLoading} darkMode={darkMode} />

        {/* Discord Status */}
        <DiscordCard discordData={discordData} discordLoading={discordLoading} darkMode={darkMode} />

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
              <ProjectCard key={index} project={project} darkMode={darkMode} index={index} />
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
  );
}

// ─────────────────────────────────────────────────────────────
// App Root with Router
// ─────────────────────────────────────────────────────────────
function AppContent() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <Routes>
          <Route
            path="/"
            element={<PortfolioHome projects={projects} setProjects={setProjects} />}
          />
          <Route
            path="/projects/:id"
            element={<ProjectDetailPage projects={projects} />}
          />
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}