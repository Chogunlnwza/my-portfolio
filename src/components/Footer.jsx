import { FaGithub, FaHeart, FaArrowUp } from "react-icons/fa";

const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export default function Footer({ darkMode }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`mt-24 border-t ${
        darkMode ? "border-white/5 bg-[#050a14]" : "border-gray-100 bg-gray-50"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="text-center md:text-left">
          <p className="font-bold gradient-text text-lg">Panuwit.dev</p>
          <p className={`text-sm mt-1 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
            © {year} Panuwit Thanyadee — All rights reserved.
          </p>
        </div>

        {/* Center */}
        <p className={`text-sm flex items-center gap-1.5 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
          Built with{" "}
          <FaHeart className="text-red-500" size={12} />
          {" "}using{" "}
          <span className="text-cyan-400 font-medium">React + Vite + Tailwind</span>
          {" "}& hosted on{" "}
          <span className="text-white font-medium">▲ Vercel</span>
        </p>

        {/* Right */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Chogunlnwza"
            target="_blank"
            rel="noreferrer"
            className={`p-2.5 rounded-xl transition-all hover:scale-110 ${
              darkMode ? "bg-white/5 text-gray-400 hover:text-white" : "bg-gray-200 text-gray-600 hover:text-gray-900"
            }`}
          >
            <FaGithub size={18} />
          </a>
          <button
            onClick={scrollTop}
            className="p-2.5 rounded-xl text-white transition-all hover:scale-110"
            style={{ background: "linear-gradient(135deg, #06b6d4, #a855f7)" }}
            title="Back to top"
          >
            <FaArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
