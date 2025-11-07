import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";

const showMessage = (text, duration = 2000) => {
  const box = document.getElementById("app-message-box");
  const msg = document.getElementById("app-message");
  if (msg && box) {
    msg.innerText = text;
    box.classList.remove("hidden");
    setTimeout(() => box.classList.add("hidden"), duration);
  } else {
    console.log("Message system unavailable:", text);
  }
};

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showMessage("❌ Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { name: formData.name },
        },
      });

      if (error) throw error;

      showMessage("✅ Signup successful! Redirecting...");
      setTimeout(() => navigate("/floatchatai"), 2000);
    } catch (err) {
      showMessage(`Signup failed: ${err.message}`);
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
          <UserPlus size={26} /> Sign Up
        </h1>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-3 p-3 rounded-lg bg-slate-900/60 text-white placeholder-gray-400 border border-white/10 focus:ring-2 focus:ring-cyan-400 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-3 p-3 rounded-lg bg-slate-900/60 text-white placeholder-gray-400 border border-white/10 focus:ring-2 focus:ring-cyan-400 outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-3 p-3 rounded-lg bg-slate-900/60 text-white placeholder-gray-400 border border-white/10 focus:ring-2 focus:ring-cyan-400 outline-none"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full mb-5 p-3 rounded-lg bg-slate-900/60 text-white placeholder-gray-400 border border-white/10 focus:ring-2 focus:ring-pink-400 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full font-semibold text-white shadow-lg transition-all duration-300 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 via-emerald-400 to-pink-500 hover:scale-[1.02] hover:shadow-cyan-400/30"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-300 text-center mt-5 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-pink-400 hover:underline"
          >
            Log in
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
