import React, { useState, useEffect } from "react";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";

const showMessage = (text, duration = 1500) => {
  const box = document.getElementById("app-message-box");
  const msg = document.getElementById("app-message");
  if (msg && box) {
    msg.innerText = text;
    box.classList.remove("hidden");
    setTimeout(() => box.classList.add("hidden"), duration);
  }
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🟢 Redirect if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) navigate("/floatchatai");
    };
    checkSession();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      showMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/floatchatai"), 1500);
    } catch (err) {
      showMessage(`Login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-cyan-700 px-6 py-10 relative overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-pink-500/30 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400/30 rounded-full blur-[100px] -z-10" />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl"
      >
        <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-300 bg-clip-text text-transparent flex items-center justify-center gap-2">
          <LogIn size={26} /> Sign In
        </h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-3 rounded-lg bg-slate-900/60 text-white placeholder-gray-400 border border-white/10 focus:ring-2 focus:ring-cyan-400 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-5 p-3 rounded-lg bg-slate-900/60 text-white placeholder-gray-400 border border-white/10 focus:ring-2 focus:ring-cyan-400 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full font-semibold text-white shadow-lg transition-all duration-300 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 via-emerald-400 to-blue-500 hover:scale-[1.02] hover:shadow-cyan-400/30"
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-gray-300 text-center mt-5 text-sm">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-pink-400 hover:underline"
          >
            Sign up
          </button>
        </p>

        <div className="text-center mt-6 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-cyan-300 text-sm transition"
          >
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </motion.main>
  );
}
