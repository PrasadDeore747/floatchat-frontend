import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // 🌈 Handle scroll background animation
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔐 Check Supabase session and listen for changes
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 🚪 Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Explore", path: "/explore" },
    { label: "Research", path: "/research" },
    { label: "Community", path: "/community" },
    { label: "About", path: "/about" },
    { label: "FloatChatAI", path: "/floatchatai" },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 14 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-md border-b border-white/10 ${
        scrolled
          ? "bg-gradient-to-r from-slate-900/80 via-indigo-900/70 to-cyan-900/70 shadow-lg shadow-cyan-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 sm:px-10">
        {/* 🌀 Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        {/* 🌐 Navigation Links */}
        <ul className="hidden md:flex gap-8 text-sm font-semibold tracking-wide">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="relative group text-gray-200 hover:text-white transition-all duration-300"
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="active-underline"
                      className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-fuchsia-400 rounded-full"
                    />
                  ) : (
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-cyan-300 to-pink-400 rounded-full group-hover:w-full transition-all duration-500" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 👤 User Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm text-gray-300">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 sm:px-6 rounded-full text-sm font-semibold 
                  bg-gradient-to-r from-pink-500 via-cyan-500 to-blue-500 
                  hover:from-pink-400 hover:to-blue-400 text-white 
                  shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-cyan-400 hover:text-pink-400 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 sm:px-6 rounded-full text-sm font-semibold 
                  bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 
                  hover:from-cyan-400 hover:to-pink-400 text-white 
                  shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
