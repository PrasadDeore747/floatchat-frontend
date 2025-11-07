import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center pt-24">

      {/* Animated Background */}
      <style>{`
        @keyframes floatBubble {
          0% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-60px) scale(1.05); opacity: 0.8; }
          100% { transform: translateY(0) scale(1); opacity: 0.6; }
        }
        .bubble {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          animation: floatBubble ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-950 via-blue-900 to-teal-900">
        <div className="bubble left-10 bottom-[-10vh] w-60 h-60 bg-cyan-500/40 animate-[floatBubble_12s_infinite]" />
        <div className="bubble right-16 top-[-5vh] w-72 h-72 bg-fuchsia-500/40 animate-[floatBubble_16s_infinite_3s]" />
        <div className="bubble left-[40%] top-[20%] w-56 h-56 bg-amber-400/30 animate-[floatBubble_10s_infinite_1s]" />
        <div className="bubble right-[35%] bottom-[5%] w-48 h-48 bg-purple-500/30 animate-[floatBubble_14s_infinite_2s]" />
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 text-white z-10 w-full backdrop-blur-sm"
      >
        <h1 className="text-6xl sm:text-7xl font-extrabold mb-4 tracking-tight">
          🌊 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 animate-gradient-x">FloatChat AI</span>
        </h1>

        <p className="max-w-3xl text-lg sm:text-xl text-slate-200 mb-10 leading-relaxed">
          Dive deep into the world of <span className="text-cyan-300 font-semibold">oceans</span>, 
          <span className="text-pink-300 font-semibold"> ecosystems</span>, and 
          <span className="text-amber-300 font-semibold"> sustainability</span>.  
          Explore research, chat with our AI, and help protect our blue planet.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/floatchatai')}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-lg font-semibold shadow-xl hover:shadow-2xl text-white transition-all duration-300"
          >
            Start Chatting (Guest)
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/login')}
            className="px-8 py-4 rounded-full border border-white/30 text-lg font-semibold bg-white/10 text-gray-200 hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
          >
            <LogIn size={20} /> Sign In / Register
          </motion.button>
        </div>
      </motion.section>
    </main>
  );
}
