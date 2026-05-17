import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { FaDiscord, FaSpotify } from "react-icons/fa";

const STATUS_CONFIG = {
  online: { label: "Online", color: "#22c55e", bgColor: "rgba(34,197,94,0.1)" },
  idle: { label: "Idle", color: "#eab308", bgColor: "rgba(234,179,8,0.1)" },
  dnd: { label: "Do Not Disturb", color: "#ef4444", bgColor: "rgba(239,68,68,0.1)" },
  offline: { label: "Offline", color: "#6b7280", bgColor: "rgba(107,114,128,0.1)" },
};

export default function DiscordCard({ discordData, discordLoading, darkMode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Show skeleton while loading
  if (discordLoading && !discordData) {
    return (
      <section className="mt-10" ref={ref}>
        <div className={`rounded-3xl p-8 border shadow-2xl animate-pulse ${darkMode ? "bg-[#0d1424] border-white/5" : "bg-white border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 rounded-full bg-gray-300/30" />
            <div className="h-7 w-40 rounded-xl bg-gray-300/30" />
          </div>
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gray-300/30 flex-shrink-0" />
            <div className="space-y-2">
              <div className="h-5 w-32 rounded-lg bg-gray-300/30" />
              <div className="h-4 w-24 rounded-lg bg-gray-300/20" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!discordData?.discord_user) return null;

  const status = STATUS_CONFIG[discordData.discord_status] || STATUS_CONFIG.offline;
  const user = discordData.discord_user;
  const spotify = discordData.spotify;
  const isSpotify = discordData.listening_to_spotify && spotify;
  const activities = (discordData.activities || []).filter((a) => a.name !== "Spotify");

  return (
    <section className="mt-10" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className={`rounded-3xl p-8 border shadow-2xl card-shine ${
          darkMode ? "bg-[#0d1424] border-white/5" : "bg-white border-gray-100"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FaDiscord size={22} style={{ color: "#5865f2" }} />
          <h2 className="text-2xl font-bold">Discord Status</h2>
          <span
            className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5"
            style={{ background: status.bgColor, color: status.color }}
          >
            <span
              className={`w-2 h-2 rounded-full ${discordData.discord_status === "online" ? "status-online" : ""}`}
              style={{ background: status.color }}
            />
            {status.label}
          </span>
        </div>

        {/* User info */}
        <div className="flex items-center gap-5">
          <div className="relative flex-shrink-0">
            <img
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`}
              alt="Discord avatar"
              className="w-20 h-20 rounded-2xl"
            />
            {/* Status dot */}
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center"
              style={{
                background: status.color,
                borderColor: darkMode ? "#0d1424" : "#ffffff",
              }}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold">{user.global_name || user.display_name || user.username}</h3>
            <p className={`text-sm font-mono ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              @{user.username}
            </p>
            {user.discriminator && user.discriminator !== "0" && (
              <p className={`text-xs ${darkMode ? "text-gray-600" : "text-gray-300"}`}>
                #{user.discriminator}
              </p>
            )}
          </div>
        </div>

        {/* Spotify */}
        {isSpotify && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 rounded-2xl p-4 flex items-center gap-4"
            style={{
              background: "linear-gradient(135deg, rgba(30,215,96,0.08), rgba(30,215,96,0.03))",
              border: "1px solid rgba(30,215,96,0.2)",
            }}
          >
            {spotify.album_art_url && (
              <img
                src={spotify.album_art_url}
                alt="Album art"
                className="w-14 h-14 rounded-xl shadow-lg flex-shrink-0"
              />
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <FaSpotify size={14} className="text-green-400" />
                <span className="text-xs font-semibold text-green-400 uppercase tracking-wide">
                  Listening Now
                </span>
              </div>
              <p className={`font-bold text-sm truncate ${darkMode ? "text-white" : "text-gray-900"}`}>
                {spotify.song}
              </p>
              <p className={`text-xs truncate ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                {spotify.artist} · {spotify.album}
              </p>
            </div>
          </motion.div>
        )}

        {/* Activities */}
        {activities.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className={`text-sm font-semibold uppercase tracking-wide ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              🎮 Current Activity
            </h3>
            {activities.map((activity, i) => (
              <div
                key={i}
                className={`rounded-2xl p-4 border ${
                  darkMode ? "bg-white/3 border-white/5" : "bg-gray-50 border-gray-100"
                }`}
              >
                <p className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {activity.name}
                </p>
                {activity.details && (
                  <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {activity.details}
                  </p>
                )}
                {activity.state && (
                  <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                    {activity.state}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}