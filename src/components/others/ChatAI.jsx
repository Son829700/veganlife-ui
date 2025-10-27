import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const ChatAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", text: "Xin chào! Bạn cần hỗ trợ gì?" },
  ]);
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Gửi tin nhắn của người dùng
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8080/identity/ask-ai?prompt=${encodeURIComponent(input)}`
      );
      const data = await res.text(); // 👈 Đúng định dạng bạn đã cấu hình
      const botMsg = { role: "ai", text: data };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Có lỗi khi gọi trợ lý AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {/* Nút nổi */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="lucide lucide-message-circle h-6 w-6 group-hover:scale-110 transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
      </button>

      {/* Chat box */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-3 font-semibold flex justify-between items-center">
            <span>Trợ lý AI</span>
            <button onClick={toggleChat} className="text-white hover:opacity-80">
              ×
            </button>
          </div>

          {/* Nội dung chat */}
          <div className="p-4 flex-1 overflow-y-auto max-h-96 text-sm text-gray-800 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-lg w-fit max-w-[90%] whitespace-pre-wrap ${msg.role === "user"
                    ? "bg-emerald-100 text-right ml-auto"
                    : msg.role === "ai"
                      ? "bg-gray-100"
                      : "text-gray-500 italic"
                  }`}
              >
                {msg.role === "ai" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown> 
                ) : (
                  msg.text
                )}
              </div>
            ))}

            {loading && (
              <div className="text-gray-500 italic text-sm">Đang trả lời...</div>
            )}
          </div>

          {/* Input */}
          <div className="border-t px-4 py-2 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Nhập câu hỏi..."
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              onClick={sendMessage}
              className="text-emerald-600 font-semibold hover:text-emerald-700"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAI;
