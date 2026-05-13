import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaSteam,
  FaTiktok,
  FaYoutube,
  FaTwitter,
  FaLinkedin
} from "react-icons/fa";
import { SiTwitch } from "react-icons/si";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    name: "Developer",
    emoji: "💻",
    items: [
      {
        title: "GitHub",
        icon: <FaGithub size={20} />,
        url: "https://github.com/Chogunlnwza",
        description: "Check out my open source projects",
        color: "#6e7681",
        username: "@Chogunlnwza",
      },
    ],
  },
  {
    name: "Social",
    emoji: "📱",
    items: [
      {
        title: "Instagram",
        icon: <FaInstagram size={20} />,
        url: "https://www.instagram.com/chogunlnwza/",
        description: "Daily life & photography",
        color: "#e1306c",
        username: "@chogunlnwza",
      },
      {
        title: "Facebook",
        icon: <FaFacebook size={20} />,
        url: "https://www.facebook.com/chogun.lnwza",
        description: "Connect with me",
        color: "#1877f2",
        username: "chogun.lnwza",
      },
      {
        title: "Linkedin",
        icon: <FaLinkedin size={20} />,
        url: "https://www.linkedin.com/in/panuwit-thanyadee",
        description: "Connect with me",
        color: "#1877f2",
        username: "@chogunlnwza",
      },
      {
        title: "TikTok",
        icon: <FaTiktok size={20} />,
        url: "https://www.tiktok.com/@chogunlnwza",
        description: "Short videos & clips",
        color: "#ff0050",
        username: "@chogunlnwza",
      },
    ],
  },
  {
    name: "Gaming",
    emoji: "🎮",
    items: [
      {
        title: "Discord",
        icon: <FaDiscord size={20} />,
        url: "https://discord.com/users/439012664627429377",
        description: "Let's play together",
        color: "#5865f2",
        username: "Chogun",
      },
      {
        title: "Steam",
        icon: <FaSteam size={20} />,
        url: "https://steamcommunity.com/profiles/76561198410275543/",
        description: "View my game library",
        color: "#c7d5e0",
        username: "Chogunlnwza",
      },
    ],
  },
  /*{
    name: "Streaming",
    emoji: "📺",
    items: [
      {
        title: "YouTube",
        icon: <FaYoutube size={20} />,
        url: "https://www.youtube.com/@chogunlnwza",
        description: "Videos & streams",
        color: "#ff0000",
        username: "@chogunlnwza",
      },
      {
        title: "Twitch",
        icon: <SiTwitch size={20} />,
        url: "https://www.twitch.tv/chogunlnwza",
        description: "Live gaming streams",
        color: "#9146ff",
        username: "chogunlnwza",
      },
    ],
  },*/
];

export default function SocialTabs({ darkMode }) {
  const [activeTab, setActiveTab] = useState("Developer");

  const activeCategory = categories.find((c) => c.name === activeTab);

  return (
    <section id="social" className="mt-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">🔗 Find Me Online</h2>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.5), transparent)" }} />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveTab(category.name)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === category.name
                ? "text-white shadow-lg"
                : darkMode
                ? "text-gray-400 hover:text-white bg-white/5"
                : "text-gray-600 hover:text-gray-900 bg-gray-100"
            }`}
            style={
              activeTab === category.name
                ? {
                    background: "linear-gradient(135deg, #06b6d4, #a855f7)",
                    boxShadow: "0 4px 16px rgba(6,182,212,0.25)",
                  }
                : {}
            }
          >
            {category.emoji} {category.name}
          </button>
        ))}
      </div>

      {/* Links */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          {activeCategory.items.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className={`group flex items-center gap-4 rounded-2xl px-5 py-4 border transition-all hover:scale-[1.02] hover:shadow-xl card-shine ${
                darkMode
                  ? "bg-[#0d1424] border-white/5 hover:border-opacity-50"
                  : "bg-white border-gray-100"
              }`}
              style={{ "--hover-border": item.color }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                style={{
                  background: `${item.color}18`,
                  color: item.color,
                }}
              >
                {item.icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className={`font-bold text-base ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {item.title}
                </h3>
                <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  {item.description}
                </p>
                <p
                  className="text-xs font-mono mt-1 font-semibold"
                  style={{ color: item.color }}
                >
                  {item.username}
                </p>
              </div>

              <span className={`text-lg transition-transform group-hover:translate-x-1 ${darkMode ? "text-gray-600" : "text-gray-300"}`}>
                →
              </span>
            </a>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}