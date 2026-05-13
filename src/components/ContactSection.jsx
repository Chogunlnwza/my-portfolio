import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaDiscord,
  FaCopy,
  FaCheck,
} from "react-icons/fa";

const EMAIL = "Chogunzaza8@gmail.com";

const SOCIALS = [
  { icon: <FaGithub size={20} />, label: "GitHub", url: "https://github.com/Chogunlnwza", color: "#6e7681" },
  { icon: <FaInstagram size={20} />, label: "Instagram", url: "https://www.instagram.com/chogunlnwza/", color: "#e1306c" },
  { icon: <FaDiscord size={20} />, label: "Discord", url: "https://discord.com/users/439012664627429377", color: "#5865f2" },
];

export default function ContactSection({ darkMode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`);
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="mt-20" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">📬 Get In Touch</h2>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.5), transparent)" }} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left — Info */}
          <div className="space-y-6">

            {/* Email card */}
            <div
              className={`flex items-center justify-between rounded-2xl p-5 border ${
                darkMode ? "bg-[#0d1424] border-white/5" : "bg-white border-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-cyan-400"
                  style={{ background: "rgba(6,182,212,0.1)" }}>
                  <FaEnvelope size={16} />
                </div>
                <div>
                  <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Email</p>
                  <p className={`font-mono text-sm font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {EMAIL}
                  </p>
                </div>
              </div>
              <button
                onClick={copyEmail}
                className="p-2 rounded-xl transition-all hover:scale-110"
                style={{ background: copied ? "rgba(34,197,94,0.1)" : "rgba(6,182,212,0.1)" }}
              >
                {copied
                  ? <FaCheck size={14} className="text-green-400" />
                  : <FaCopy size={14} className="text-cyan-400" />
                }
              </button>
            </div>

            {/* Socials */}
            <div className="space-y-3">
              <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Or find me on
              </p>
              <div className="flex gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    title={s.label}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all hover:scale-110 hover:shadow-lg ${
                      darkMode ? "bg-[#0d1424] border-white/5" : "bg-white border-gray-100"
                    }`}
                    style={{ "--hover-color": s.color }}
                  >
                    <span style={{ color: s.color }}>{s.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Status Card */}
            <div
              className="rounded-2xl p-5 border"
              style={{ background: "rgba(6,182,212,0.05)", borderColor: "rgba(6,182,212,0.2)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 status-online" />
                <span className="text-sm font-semibold text-green-400">Open to Work</span>
              </div>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Looking for internship or junior developer roles.
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <form
            onSubmit={handleSubmit}
            className={`rounded-3xl p-8 border shadow-xl space-y-5 ${
              darkMode ? "bg-[#0d1424] border-white/5" : "bg-white border-gray-100"
            }`}
          >
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Your Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your Name"
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium focus:ring-2 focus:ring-cyan-500/40 ${
                  darkMode
                    ? "bg-white/5 border-white/10 text-white placeholder-gray-600"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1.5 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="[EMAIL_ADDRESS]"
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium focus:ring-2 focus:ring-cyan-500/40 ${
                  darkMode
                    ? "bg-white/5 border-white/10 text-white placeholder-gray-600"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1.5 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Message
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="I'd like to talk about..."
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium resize-none focus:ring-2 focus:ring-cyan-500/40 ${
                  darkMode
                    ? "bg-white/5 border-white/10 text-white placeholder-gray-600"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{
                background: sent
                  ? "linear-gradient(135deg, #22c55e, #16a34a)"
                  : "linear-gradient(135deg, #06b6d4, #a855f7)",
                boxShadow: "0 8px 24px rgba(6,182,212,0.25)",
              }}
            >
              {sent ? "✅ Message Sent!" : "Send Message →"}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
