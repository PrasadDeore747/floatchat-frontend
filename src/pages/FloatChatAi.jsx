import { useEffect, useRef, useState } from "react";
import { Send, Bot, User, Loader2, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

// --- Individual message bubble component ---
const MessageBubble = ({ role, content }) => {
  const isUser = role === "user";
  const bubbleStyle = isUser
    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg"
    : "bg-white/10 backdrop-blur-md text-white border border-white/10 shadow-md";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"} px-3`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 flex items-start gap-3 ${bubbleStyle}`}
      >
        {isUser ? (
          <User size={18} className="mt-1 text-pink-200 flex-none hidden sm:block" />
        ) : (
          <Bot size={18} className="mt-1 text-cyan-300 flex-none hidden sm:block" />
        )}
        <div className="flex flex-col flex-1 min-w-0">
          {!isUser && (
            <div className="text-xs text-cyan-300 mb-1 font-semibold">FloatChat AI</div>
          )}
          <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
            {content}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Loading Indicator (AI Thinking) ---
const LoadingIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="self-start bg-white/10 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl flex items-center gap-3 ml-4"
  >
    <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
    <div className="ml-1 text-sm text-gray-200">Thinking...</div>
  </motion.div>
);

export default function FloatChatAI() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "🌊 Hello! I'm FloatChat AI — your ocean & ecology assistant. Ask me about marine life, sustainability, or research topics!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://floatchat-backend-ig0f.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      const assistantText =
        data.reply ||
        "🤖 (No valid 'reply' received — please check your backend response.)";
      setMessages((prev) => [...prev, { role: "assistant", content: assistantText }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Connection issue — ensure your backend is running and CORS is configured.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center pt-24 pb-10 px-4 sm:px-6 relative text-white font-['Inter'] overflow-hidden"
    >
      {/* 🌈 Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-950 via-blue-900 via-purple- to-cyan-900 animate-gradient-x"></div>

      {/* Floating orbs for color depth */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500/30 blur-[100px] rounded-full animate-pulse -z-10"></div>
      <div className="absolute bottom-0 right-20 w-96 h-96 bg-cyan-400/30 blur-[100px] rounded-full animate-pulse -z-10"></div>
      <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-amber-400/20 blur-[120px] rounded-full -z-10"></div>

      {/* 🌊 Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center mb-8 sm:mb-12"
      >
        <Bot size={48} className="text-cyan-300 mx-auto mb-3 drop-shadow-lg" />
        <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-pink-300 to-amber-200 mb-3 tracking-wide">
          FloatChat AI
        </h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto border-t border-b border-white/10 py-3">
          Explore oceanic knowledge, environmental sustainability, and deep-sea
          mysteries — through intelligent conversation.
        </p>
      </motion.div>

      {/* 💬 Chat Container */}
      <div className="w-full max-w-4xl h-[75vh] flex flex-col rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl">
        {/* Messages Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 custom-scrollbar">
          {messages.map((m, i) => (
            <MessageBubble key={i} role={m.role} content={m.content} />
          ))}
          {loading && <LoadingIndicator />}
          <div ref={endRef} />
        </main>

        {/* Input Area */}
        <footer className="p-4 border-t border-white/10 bg-white/5 flex-none">
          <div className="flex gap-3 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about marine life, ecology, or sustainability..."
              disabled={loading}
              className="flex-1 p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all duration-200 text-base"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="flex items-center justify-center px-6 py-4 rounded-xl bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 text-white font-semibold hover:from-pink-400 hover:to-cyan-400 transition-all duration-300 hover:scale-[1.03] shadow-lg disabled:opacity-40"
            >
              <Send size={20} className="mr-2" />
              Send
            </button>
          </div>
        </footer>
      </div>

      {/* Footer Text */}
      <p className="mt-8 text-sm text-gray-400 flex items-center gap-2">
        <MessageSquare size={16} /> Conversations are logged for model
        improvement.
      </p>

      {/* Scrollbar Customization */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #a855f7, #f59e0b);
          border-radius: 4px;
        }
      `}</style>
    </motion.div>
  );
}
