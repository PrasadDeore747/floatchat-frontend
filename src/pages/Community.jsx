import React from "react";
import { motion } from "framer-motion";
import { Users, HeartHandshake, Share2, MessageCircle } from "lucide-react";

export default function Community() {
  const communityCards = [
    {
      icon: <Users size={36} className="text-cyan-400" />,
      title: "Marine Researchers",
      desc: "Join global oceanographers, data scientists, and biologists sharing real-time findings from deep-sea studies.",
      gradient: "from-cyan-500/20 to-blue-600/10",
    },
    {
      icon: <HeartHandshake size={36} className="text-pink-400" />,
      title: "Eco-Volunteers",
      desc: "Collaborate on local beach cleanups, coral restoration drives, and citizen-led marine conservation efforts.",
      gradient: "from-pink-500/20 to-rose-500/10",
    },
    {
      icon: <Share2 size={36} className="text-amber-400" />,
      title: "Open Data Contributors",
      desc: "Contribute datasets, field logs, or sensor readings to our open-source environmental intelligence pool.",
      gradient: "from-amber-500/20 to-orange-600/10",
    },
    {
      icon: <MessageCircle size={36} className="text-emerald-400" />,
      title: "Community Discussions",
      desc: "Engage in real-time debates and Q&A forums powered by FloatChat AI, bridging experts and enthusiasts worldwide.",
      gradient: "from-emerald-500/20 to-teal-500/10",
    },
  ];

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-950 via-sky-950 to-slate-900 text-white pt-24 pb-16 px-6">
      {/* Floating Gradient Backgrounds */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-amber-400/20 rounded-full blur-[130px] animate-pulse delay-300" />
      </div>

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-14"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-300 mb-4">
          The FloatChat Community
        </h1>
        <p className="text-slate-300 max-w-3xl mx-auto text-lg sm:text-xl">
          Connect with ocean lovers, sustainability experts, and global contributors making waves for a better planet.
        </p>
      </motion.div>

      {/* Community Role Cards */}
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
        {communityCards.map((card, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(255,255,255,0.15)",
            }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className={`p-6 rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-md border border-white/10 shadow-lg hover:shadow-xl hover:border-cyan-400/30 transition-all duration-300`}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              {card.icon}
              <h2 className="text-2xl font-semibold text-cyan-100">
                {card.title}
              </h2>
              <p className="text-slate-300 text-sm">{card.desc}</p>
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
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-pink-400 mb-4">
          Be Part of the Movement 🌎
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-6">
          Join our global network of innovators, divers, and conservationists.
          Share your knowledge and shape the future of sustainable oceans.
        </p>
        <a
          href="/signup"
          className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl hover:from-pink-400 hover:to-orange-400 transition-all transform hover:scale-105"
        >
          Join the Community
        </a>
      </motion.div>
    </main>
  );
}

