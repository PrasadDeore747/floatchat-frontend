import { motion } from "framer-motion";
import { Telescope, Beaker, Zap, Anchor } from "lucide-react";

const Research = () => {
  const topics = [
    {
      icon: <Telescope size={36} className="text-violet-400 mb-3" />,
      title: "Coral Health Monitoring",
      desc: "AI-assisted thermal and spectral analysis for **coral reef resilience** assessment and trend analysis against ocean acidification.",
      gradient: "from-violet-500/20 to-cyan-500/10",
    },
    {
      icon: <Beaker size={36} className="text-emerald-400 mb-3" />,
      title: "Microplastics Mapping",
      desc: "Combining satellite imagery and hydrographic data to locate **plastic accumulation zones** and model impacts on migratory fish and ecosystems.",
      gradient: "from-emerald-500/20 to-teal-400/10",
    },
    {
      icon: <Zap size={36} className="text-amber-400 mb-3" />,
      title: "Deep-Sea Vent Discovery",
      desc: "Novel sonar and pressure data algorithms identify potential **hydrothermal vent sites** and unique biological habitats.",
      gradient: "from-amber-500/20 to-orange-400/10",
    },
    {
      icon: <Anchor size={36} className="text-rose-400 mb-3" />,
      title: "Coastal Erosion Forecasting",
      desc: "Predictive models using sea-level rise and storm surge data help **coastal communities prepare** for climate impacts.",
      gradient: "from-rose-500/20 to-pink-500/10",
    },
  ];

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        },
      }}
      className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-blue-950 text-white pt-24 pb-20 px-6 relative overflow-hidden"
    >
      {/* Background Light Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-violet-600/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/20 blur-[100px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-pink-500/20 blur-[100px] animate-pulse delay-300" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-14"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-300 mb-4">
          Research & Global Insights
        </h1>
        <p className="max-w-3xl mx-auto text-slate-300 text-lg sm:text-xl leading-relaxed">
          Harnessing **machine learning** and global datasets to reveal new patterns in marine health, sustainability, and climate change resilience.
        </p>
      </motion.div>

      {/* Research Topics Grid */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {topics.map((topic, i) => (
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
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className={`p-6 text-center rounded-2xl bg-gradient-to-br ${topic.gradient} backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300`}
          >
            {topic.icon}
            <h2 className="text-xl font-semibold text-cyan-200 mb-2">
              {topic.title}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              {topic.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-20 text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 mb-3">
          Ready to Dive Deeper?
        </h2>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">
          Explore interactive maps or chat with FloatChat AI for instant insights into global marine research.
        </p>
        <a
          href="/floatchatai"
          className="inline-block px-10 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 text-white shadow-xl hover:shadow-2xl hover:from-cyan-400 hover:to-pink-400 transform hover:scale-105 transition-all duration-300"
        >
          Start Chatting Now
        </a>
      </motion.section>
    </motion.main>
  );
};

export default Research;
