import React from "react";
import { motion } from "framer-motion";
import { Compass, Globe, Users, Heart } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <Compass className="text-cyan-400" size={36} />,
      title: "Our Mission",
      desc: "To bridge science and technology — empowering global communities to protect, restore, and understand marine ecosystems.",
      color: "from-cyan-500/20 to-blue-500/10",
    },
    {
      icon: <Globe className="text-amber-400" size={36} />,
      title: "Global Reach",
      desc: "Our AI integrates research from across the planet — mapping coral health, ocean temperatures, and biodiversity hotspots.",
      color: "from-amber-500/20 to-orange-500/10",
    },
    {
      icon: <Users className="text-pink-400" size={36} />,
      title: "Community Collaboration",
      desc: "Scientists, students, and explorers come together here — sharing insights to inspire action for a cleaner, safer ocean.",
      color: "from-pink-500/20 to-fuchsia-500/10",
    },
    {
      icon: <Heart className="text-green-400" size={36} />,
      title: "Sustainability First",
      desc: "We promote sustainable marine practices and conservation awareness to ensure oceans thrive for generations to come.",
      color: "from-green-500/20 to-emerald-500/10",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-900 to-blue-950 text-white py-24 px-6 overflow-hidden">
      {/* Floating Color Orbs for Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-32 left-16 w-64 h-64 bg-cyan-500/30 blur-[90px] rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-fuchsia-500/20 blur-[100px] rounded-full animate-pulse delay-500" />
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-amber-400/10 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-300 mb-6">
          About FloatChat
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
          FloatChat connects marine science and artificial intelligence — creating a space where data meets discovery, and knowledge floats freely.
        </p>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
      >
        {features.map((f, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className={`p-6 rounded-2xl bg-gradient-to-br ${f.color} backdrop-blur-md border border-white/10 shadow-lg hover:shadow-cyan-500/20 transition-all`}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              {f.icon}
              <h2 className="text-2xl font-semibold text-cyan-100">{f.title}</h2>
              <p className="text-slate-300 text-sm">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Closing Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="mt-24 text-center"
      >
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 mb-4">
          Together, We Make Waves 🌊
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Every conversation and discovery you make contributes to global ocean awareness. 
          FloatChat is not just an AI — it’s a movement for the future of our planet’s blue heart.
        </p>
      </motion.div>
    </main>
  );
}
