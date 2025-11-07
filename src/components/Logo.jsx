import { motion } from "framer-motion";
import { Waves } from "lucide-react";

/**
 * Logo component — modernized and colorfully animated.
 * Clean, responsive, and coordinates with Navbar + gradients sitewide.
 */

export default function Logo() {
  return (
    <motion.div
      className="flex items-center gap-3 cursor-pointer select-none"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* Icon with rotating gradient shimmer */}
      <motion.div
        animate={{
          rotate: [0, 8, -8, 0],
          scale: [1, 1.1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        className="p-2 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-500 shadow-lg shadow-cyan-500/30"
      >
        <Waves size={28} className="text-white" />
      </motion.div>

      {/* Text with animated gradient color */}
      <motion.h1
        className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent 
        bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 tracking-wide drop-shadow-sm"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      >
        FloatChat <span className="text-cyan-300">AI</span>
      </motion.h1>
    </motion.div>
  );
}
