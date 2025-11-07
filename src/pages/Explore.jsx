import React from "react";
import { motion } from "framer-motion";
import { Map, Waves, Compass, Fish } from "lucide-react";

export default function Explore() {
  const exploreItems = [
    {
      icon: <Map size={36} className="text-cyan-400" />,
      title: "Global Ocean Map",
      desc: "Explore interactive visualizations of ocean currents, temperature layers, and salinity data across the planet.",
      gradient: "from-cyan-500/20 to-blue-600/10",
    },
    {
      icon: <Waves size={36} className="text-emerald-400" />,
      title: "Tide & Wave Analysis",
      desc: "Access live and historical tide charts, surf reports, and wave strength indicators powered by AI pattern recognition.",
      gradient: "from-emerald-500/20 to-teal-500/10",
    },
    {
      icon: <Compass size={36} className="text-amber-400" />,
      title: "Marine Exploration Routes",
      desc: "Trace research expeditions, submarine routes, and autonomous drone paths in real-time visualized 3D motion paths.",
      gradient: "from-amber-500/20 to-orange-600/10",
    },
    {
      icon: <Fish size={36} className="text-pink-400" />,
      title: "Biodiversity Hotspots",
      desc: "Dive into rich data layers highlighting endangered species zones and coral restoration efforts worldwide.",
      gradient: "from-pink-500/20 to-fuchsia-500/10",
    },
  ];

  return (
    <main className="min-h-screen relative bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-900 text-white overflow-hidden pt-24 pb-16 px-6">
      {/* Background Orbs and Waves */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 blur-[90px] rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-pink-500/20 blur-[100px] rounded-full animate-pulse delay-700" />
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-amber-400/10 blur-[120px] rounded-full animate-pulse delay-300" />
      </div>

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-14"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-amber-300 mb-4">
          Explore the Deep
        </h1>
        <p className="text-slate-300 max-w-3xl mx-auto text-lg sm:text-xl">
          Navigate the world’s oceans through live data layers, visuals, and AI-driven insights — an exploration like never before.
        </p>
      </motion.div>

      {/* Exploration Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
      >
        {exploreItems.map((item, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(0, 200, 255, 0.3)",
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className={`p-6 rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-md border border-white/10 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300`}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              {item.icon}
              <h2 className="text-2xl font-semibold text-cyan-100">
                {item.title}
              </h2>
              <p className="text-slate-300 text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="mt-20 text-center"
      >
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 mb-4">
          Begin Your Expedition 🌐
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-6">
          Every layer of data reveals a new story about our planet’s oceans.
          Join the FloatChat AI and start your digital dive into discovery.
        </p>
        <a
          href="/floatchatai"
          className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105"
        >
          Launch Ocean AI
        </a>
      </motion.div>
    </main>
  );
}
