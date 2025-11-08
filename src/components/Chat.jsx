import { useEffect, useRef, useState } from "react";
import { Send, Bot, User, Loader2, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Chat component — improved, debugged, and enhanced visually.
 * - Exported as Chat (so pages import it correctly).
 * - Keeps behavior: sends POST to https://floatchat-backend-ig0f.onrender.com/chat expecting { reply }.
 * - Preserves helpful error messages for connection issues.
 */

/* Color palette to cycle through for bubbles (keeps UI colorful) */
const BUBBLE_PALETTE = [
  "from-cyan-500 to-blue-600",   // cyan -> blue
  "from-indigo-500 to-purple-600", // indigo -> purple
  "from-emerald-400 to-teal-500", // green -> teal
  "from-rose-400 to-pink-500",    // rose -> pink
  "from-yellow-400 to-amber-500", // yellow -> amber
];

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm FloatChat AI. I can help you with questions about the ocean, ecology, or the biosphere. Ask me anything!"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef();

  // Auto-scroll on new messages or loading changes
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Helper: select palette class based on index to avoid monotony
  const paletteClassForIndex = (index) => {
    return BUBBLE_PALETTE[index % BUBBLE_PALETTE.length];
  };

  // Send message to backend
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
        body: JSON.stringify({ message: input })
      });

      if (!res.ok) {
        // backend returned non-2xx
        const text = await res.text().catch(() => "");
        throw new Error(`Server responded ${res.status} ${res.statusText} ${text ? `: ${text}` : ""}`);
      }

      const data = await res.json();
      const reply = data.reply ?? "Sorry — no reply returned from backend.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Error connecting to the backend. Make sure server is running at https://floatchat-backend-ig0f.onrender.com and CORS is enabled."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Message bubble component (kept inline to avoid extra file)
  const MessageBubble = ({ role, content, index }) => {
    const isUser = role === "user";
    const palette = paletteClassForIndex(index);
    const bubbleGradient = isUser
      ? `bg-gradient-to-r ${palette} text-white shadow-2xl`
      : "bg-gray-700 text-gray-100 border border-gray-600 shadow-md";

    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className={`w-full max-w-full px-3 py-1 flex items-start ${isUser ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-[85%] px-4 py-3 rounded-2xl transition-all duration-300 ${bubbleGradient} ${
            isUser ? "rounded-bl-2xl" : "rounded-br-2xl"
          } flex items-start gap-3`}
        >
          {/* Icon */}
          {isUser ? (
            <User size={18} className="mt-0.5 text-white/90 hidden sm:block flex-none" />
          ) : (
            <Bot size={18} className="mt-0.5 text-cyan-300 hidden sm:block flex-none" />
          )}

          {/* Content */}
          <div className="flex flex-col flex-1 min-w-0">
            {!isUser && (
              <div className="text-xs text-cyan-300 mb-1 font-semibold flex items-center">🤖 FloatChat AI</div>
            )}
            <div className="whitespace-pre-wrap text-base leading-relaxed break-words">{content}</div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Loading indicator component
  const LoadingIndicator = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="self-start bg-gray-700/80 px-4 py-3 rounded-2xl flex items-center gap-3 w-fit transition-opacity duration-300 ml-4"
    >
      <Loader2 className="h-5 w-5 animate-spin text-white/80" />
      <div className="ml-1 text-sm text-gray-300 font-medium">FloatChat AI is thinking...</div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 font-['Inter']">
      {/* Inline CSS for custom scrollbar — kept from your original for aesthetics */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f1722; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4b5563; }
      `}</style>

      <div className="w-full max-w-4xl h-[90vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-slate-800/80 via-gray-800 to-slate-900 border border-slate-700 transition-all duration-500">
        {/* Header */}
        <header className="p-4 border-b border-gray-700 flex items-center justify-between bg-gradient-to-r from-slate-900/40 to-transparent backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Bot size={28} className="text-cyan-400" />
            <h1 className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-400">
              FloatChat AI
            </h1>
          </div>
          <div className="text-sm text-gray-300 hidden sm:block border border-cyan-500/20 px-3 py-1 rounded-full">
            Ecology & Biosphere Explorer
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role} content={m.content} index={i} />
            ))}
            {loading && <LoadingIndicator key="loader" />}
          </AnimatePresence>
          <div ref={endRef} />
        </main>

        {/* Footer / Input */}
        <footer className="p-4 border-t border-gray-700 bg-gradient-to-r from-slate-900/40 to-transparent flex-none">
          <div className="flex gap-3 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about ocean, ecology, or the biosphere..."
              disabled={loading}
              className="flex-1 p-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none transition duration-200 text-base"
              aria-label="Chat input"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold transition-all duration-300 hover:scale-[1.03] disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
              aria-disabled={loading || !input.trim()}
            >
              <Send size={18} className="mr-2" />
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
