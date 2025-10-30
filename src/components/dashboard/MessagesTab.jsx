import { useState, useEffect, useRef } from "react";
import { CheckCheck, Send } from "lucide-react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import API from "../../api";

const SOCKET_URL = `${import.meta.env.VITE_API_URL}/identity/chat-websocket`;

export default function MessagesTabUser() {
  const { user } = useAuthContext();
  const coach = user?.coach || null;
  const { get } = useFetch();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const clientRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // 🧩 Chuẩn hóa tin nhắn
  const normalizeMessage = (msg) => {
    const timestamp = msg.timestamp || msg.createdAt || new Date().toISOString();
    let formattedTime;
    try {
      formattedTime = new Date(timestamp).toLocaleString("vi-VN", {
        dateStyle: "short",
        timeStyle: "short",
      });
    } catch {
      formattedTime = "Không xác định";
    }
    return { ...msg, timestamp, formattedTime };
  };

  // 📜 Lấy lịch sử chat
  useEffect(() => {
    if (!user?.userID || !coach?.userID) return;
    const fetchChatHistory = async () => {
      try {
        const res = await API.get(
          `/identity/chat/history?userID1=${user.userID}&userID2=${coach.userID}`
        );
        if (res) {
          setMessages(res.data.data.map(normalizeMessage));
        }
      } catch (err) {
        console.error("❌ Lỗi tải lịch sử chat:", err);
      }
    };
    fetchChatHistory();
  }, [user?.userID, coach?.userID, get]);

  // 🔌 Kết nối WebSocket
  useEffect(() => {
    if (!user?.userID) return;

    const client = Stomp.over(() => new SockJS(`${SOCKET_URL}?userID=${user.userID}`));

    client.reconnectDelay = 5000;
    client.debug = (str) => console.log("🧩 STOMP:", str);

    client.connect({ userID: user.userID }, () => {
      setConnected(true);

      client.subscribe("/user/queue/messages", (msg) => {
        try {
          const raw = JSON.parse(msg.body);
          const data = normalizeMessage(raw);

          // ✅ Chỉ thêm nếu liên quan tới cuộc trò chuyện với coach
          if (
            data.senderId === coach?.userID ||
            data.receiverId === coach?.userID
          ) {
            setMessages((prev) => {
              const exists = prev.some(
                (m) =>
                  m.senderId === data.senderId &&
                  m.receiverId === data.receiverId &&
                  m.timestamp === data.timestamp
              );
              return exists ? prev : [...prev, data];
            });
          }
        } catch (error) {
          console.error(" Error parsing message:", error);
        }
      });
    });

    clientRef.current = client;

    return () => {
      console.log(" Disconnecting WebSocket");
      client.deactivate();
    };
  }, [user?.userID, coach?.userID]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // 📨 Gửi tin nhắn
  const handleSendMessage = (e) => {
    e.preventDefault();
    const stompClient = clientRef.current;
    if (!stompClient || !stompClient.connected) {
      console.warn("⚠️ WebSocket chưa kết nối");
      return;
    }

    if (!message.trim()) return;

    const chatMessage = {
      senderId: user.userID,
      receiverId: coach.userID,
      message: message.trim(),
      type: "PRIVATE",
      timestamp: new Date().toISOString(),
    };

    stompClient.send("/app/chat.sendPrivate", {}, JSON.stringify(chatMessage));
    setMessage("");
  };

  if (!coach) {
    return (
      <div className="p-6 text-red-500">
        ❌ Không tìm thấy thông tin huấn luyện viên.
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Trò chuyện với huấn luyện viên
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={
                    coach.avatar ||
                    "/user.png"
                  }
                  alt={coach.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {coach.fullName}
                </h3>
                <p className="text-sm text-green-600">
                  {connected ? "Đang hoạt động" : "Ngoại tuyến"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tin nhắn */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-6 space-y-4 p-2" >
          {[...messages]
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
            .map((msg, index) =>
              msg.senderId === user.userID ? (
                <MessageRight
                  key={index}
                  text={msg.message}
                  time={msg.formattedTime}
                />
              ) : (
                <MessageLeft
                  key={index}
                  avatar={coach.avatar}
                  name={coach.fullName}
                  text={msg.message}
                  time={msg.formattedTime}
                />
              )
            )}
          <div ref={messagesEndRef} />
        </div>

        {/* Form gửi */}
        <div className="border-t border-gray-200 pt-4">
          <form className="flex items-end gap-3" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              disabled={!message.trim() || !connected}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-3 rounded-2xl hover:shadow-lg transition disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// 💬 Tin nhắn từ Coach
function MessageLeft({ avatar, name, text, time }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-xs lg:max-w-md order-1">
        <div className="flex items-center gap-2 mb-2">
          <img src={avatar || "/user.png"} alt={name} className="w-6 h-6 rounded-full" />
          <span className="text-xs text-gray-500">{name}</span>
        </div>
        <div className="rounded-2xl px-4 py-3 bg-gray-100 text-gray-900">
          <p className="text-sm">{text}</p>
        </div>
        <div className="text-xs text-gray-500 mt-1">{time}</div>
      </div>
    </div>
  );
}

// 💬 Tin nhắn của User
function MessageRight({ text, time }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-xs lg:max-w-md order-2">
        <div className="rounded-2xl px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white">
          <p className="text-sm">{text}</p>
        </div>
        <div className="flex justify-end gap-1 mt-1 items-center text-xs text-gray-500">
          <span>{time}</span>
          <CheckCheck className="h-3 w-3 text-emerald-500" />
        </div>
      </div>
    </div>
  );
}
