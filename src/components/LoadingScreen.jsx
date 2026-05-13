import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onDone, 300);
          return 100;
        }
        return p + 4;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050a14]"
      >
        {/* Orb decorations */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl orb" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl orb" style={{ animationDelay: "-4s" }} />

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center"
        >
          <span className="text-4xl font-bold gradient-text font-mono">
            &lt;Panuwit /&gt;
          </span>
          <p className="mt-2 text-gray-500 text-sm tracking-widest uppercase">
            Loading Portfolio
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #06b6d4, #a855f7)",
              width: `${progress}%`,
            }}
            transition={{ ease: "linear" }}
          />
        </div>
        <p className="mt-3 text-gray-600 text-xs font-mono">{progress}%</p>
      </motion.div>
    </AnimatePresence>
  );
}
