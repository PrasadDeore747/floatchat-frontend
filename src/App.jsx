import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Research from "./pages/Research";
import Community from "./pages/Community";
import FloatChatAI from "./pages/FloatChatAI";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ProtectedRoute from "./utils/ProtectedRoute"; // ✅ imported only once

function App() {
  return (
    <Router>
      {/* Navbar appears on all pages */}
      <Navbar />

      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/research" element={<Research />} />
          <Route path="/community" element={<Community />} />
          <Route path="/explore" element={<Explore />} />

          {/* Protected Route for FloatChat */}
          <Route
            path="/floatchatai"
            element={
              <ProtectedRoute>
                <FloatChatAI />
              </ProtectedRoute>
            }
          />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global message box used by login/signup */}
        <div
          id="app-message-box"
          className="hidden fixed bottom-10 left-1/2 transform -translate-x-1/2 p-4 rounded-xl bg-cyan-600 text-white shadow-2xl z-50 transition-opacity duration-300"
        >
          <p id="app-message" className="font-semibold"></p>
        </div>
      </div>
    </Router>
  );
}

export default App;
