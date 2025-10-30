import { useState, useEffect, useRef, useCallback } from "react";
import { Send, Search, CheckCheck } from "lucide-react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import API from "../../api";

const SOCKET_URL = `${import.meta.env.VITE_API_URL}/identity/chat-websocket`;

export default function MessagesTabCoach() {
    const { user } = useAuthContext();
    const [students, setStudents] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const clientRef = useRef(null);
    const messagesEndRef = useRef(null);
    const { get } = useFetch();
    const [connected, setConnected] = useState(false);
    const selectedUserRef = useRef(null);
    useEffect(() => {
        selectedUserRef.current = selectedUser;
    }, [selectedUser]);



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

    /** 🧠 1. Lấy danh sách học viên */
    useEffect(() => {
        if (!user?.userID) return;

        const fetchStudents = async () => {
            console.log("📡 Fetching students for coach:", user.userID);
            try {
                const res = await API.get(`/identity/users/coach_user/${user.userID}`);
                console.log("✅ Students loaded:", res);
                setStudents(res.data?.data || []);
            } catch (err) {
                console.error("❌ Lỗi tải học viên:", err);
            }
        };

        fetchStudents();
    }, [user?.userID, get]);

    /** 🔌 2. Kết nối WebSocket */
    useEffect(() => {
        if (!user?.userID) return;

        console.log("🔌 Connecting WebSocket for:", user.userID);
        const socket = new SockJS(`${SOCKET_URL}?userID=${user.userID}`);
        const client = Stomp.over(socket);
        client.debug = (str) => console.log("STOMP DEBUG:", str);
        client.reconnectDelay = 5000;

        client.connect({}, () => {
            console.log("✅ Connected as", user.userID);
            setConnected(true);

            // Nhận tin nhắn từ server
            client.subscribe("/user/queue/messages", (msg) => {
                try {
                    const raw = JSON.parse(msg.body);
                    const data = normalizeMessage(raw);

                    const currentSelected = selectedUserRef.current;

                    // Tin nhắn có liên quan đến cuộc trò chuyện hiện tại?
                    const isRelatedToCurrentChat =
                        data.senderId === currentSelected?.userID || data.receiverId === currentSelected?.userID;

                    // 🧠 Nếu không phải user đang mở -> đánh dấu có tin mới
                    if (!isRelatedToCurrentChat) {
                        setStudents((prev) =>
                            prev.map((s) =>
                                s.userID === data.senderId
                                    ? { ...s, hasNewMessage: true }
                                    : s
                            )
                        );
                        console.log("🔴 Gắn cờ tin nhắn mới cho:", data.senderId);
                        return;
                    }

                    // Nếu là chat hiện tại thì thêm tin nhắn vào khung
                    setMessages((prev) => {
                        const exists = prev.some(
                            (m) =>
                                m.senderId === data.senderId &&
                                m.receiverId === data.receiverId &&
                                m.timestamp === data.timestamp
                        );
                        return exists ? prev : [...prev, data];
                    });
                } catch (err) {
                    console.error("❌ Lỗi parse message:", err);
                }
            });

        });

        clientRef.current = client;

        return () => {
            console.log("🧹 Disconnecting WebSocket...");
            client.deactivate();
        };
    }, [user?.userID]);

    /** ⏬ 3. Tự động scroll xuống khi có tin nhắn mới */
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    /** 📨 4. Gửi tin nhắn — KHÔNG THÊM VÀO UI NGAY (chờ server gửi lại) */
    const handleSendMessage = useCallback(
        (e) => {
            e.preventDefault();
            const stompClient = clientRef.current;

            console.log("🧩 Trying to send message:", {
                from: user?.userID,
                to: selectedUser?.userID,
                text: message,
                connected: stompClient?.connected,
            });

            if (!selectedUser) {
                console.warn("⚠️ No student selected!");
                return;
            }

            if (!message.trim()) {
                console.warn("⚠️ Empty message!");
                return;
            }

            if (!stompClient?.connected) {
                console.error("❌ WebSocket not connected!");
                return;
            }

            const chatMessage = {
                senderId: user.userID,
                receiverId: selectedUser.userID,
                message: message.trim(),
                type: "PRIVATE",
                timestamp: new Date().toISOString(),
            };


            stompClient.send("/app/chat.sendPrivate", {}, JSON.stringify(chatMessage));
            console.log("📤 Sent message to server:", chatMessage);

            // ❌ Không thêm vào UI
            setMessage("");
        },
        [message, selectedUser, user]
    );

    useEffect(() => {
        if (!selectedUser || !user?.userID) return;

        const fetchChatHistory = async () => {
            try {
                console.log("📜 Fetching chat history for:", selectedUser.userID);
                const res = await API.get(
                    `/identity/chat/history?userID1=${user.userID}&userID2=${selectedUser.userID}`
                );
                console.log("📜 History response:", res);
                if (res) {
                    setMessages(res.data.data.map(normalizeMessage));

                } else {
                    console.warn("⚠️ No chat history found!");
                    setMessages([]);
                }
            } catch (err) {
                console.error("❌ Lỗi tải lịch sử chat:", err);
            }
        };

        fetchChatHistory();
    }, [selectedUser, user?.userID, get]);

    const filteredMessages = messages;


    return (
        <div className="flex h-[600px] border border-gray-200 rounded-xl overflow-hidden bg-white">
            {/* Sidebar học viên */}
            <aside className="w-64 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Học viên của bạn</h2>
                    <div className="flex items-center bg-gray-100 rounded-lg px-2">
                        <Search className="h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="w-full bg-transparent border-none focus:outline-none px-2 py-1 text-sm"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {students.length === 0 ? (
                        <p className="p-4 text-sm text-gray-500">Không có học viên nào.</p>
                    ) : (
                        students.map((s) => (
                            <button
                                key={s.userID}
                                onClick={() => {
                                    console.log("👤 Selected student:", s);
                                    setSelectedUser(s);

                                    // 🔵 Xóa cờ khi mở chat
                                    setStudents((prev) =>
                                        prev.map((stu) =>
                                            stu.userID === s.userID ? { ...stu, hasNewMessage: false } : stu
                                        )
                                    );
                                }}

                                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${selectedUser?.userID === s.userID ? "bg-green-50" : "hover:bg-gray-50"
                                    }`}
                            >
                                <img
                                    src={s.img || "/user.png"}
                                    alt={s.fullName || s.username}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1 flex justify-between items-center">
                                    <p className="font-medium text-gray-900">{s.fullName || s.username}</p>
                                    {s.hasNewMessage && (
                                        <span className="w-2 h-2 bg-red-500 rounded-full ml-2"></span>
                                    )}
                                </div>

                            </button>
                        ))
                    )}
                </div>
            </aside>

            {/* Chat area */}
            <section className="flex-1 flex flex-col bg-gray-50">
                {!selectedUser ? (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        <p>Chọn học viên để trò chuyện</p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="flex items-center gap-3 bg-white border-b border-gray-200 px-6 py-4">
                            <img
                                src={selectedUser.img || "/user.png"}
                                alt={selectedUser.fullName || selectedUser.username}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    {selectedUser.fullName || selectedUser.username}
                                </h3>
                                <p className="text-sm text-green-600">Đang hoạt động</p>
                            </div>
                        </div>

                        {/* Tin nhắn */}
                        <div className="flex-1 overflow-y-auto mb-6 space-y-4 p-4">
                            {[...filteredMessages]
                                .sort((a, b) => new Date(a.timestamp || a.createdAt) - new Date(b.timestamp || b.createdAt))
                                .map((msg, i) => {
                                    const time =
                                        msg.formattedTime ||
                                        new Date(msg.timestamp || msg.createdAt || Date.now()).toLocaleString("vi-VN", {
                                            dateStyle: "short",
                                            timeStyle: "short",
                                        });

                                    return msg.senderId === user.userID ? (
                                        <MessageRight key={i} text={msg.message} time={time} />
                                    ) : (
                                        <MessageLeft
                                            key={i}
                                            name={selectedUser.fullName || selectedUser.username}
                                            text={msg.message}
                                            avatar={selectedUser.img}
                                            time={time}
                                        />
                                    );
                                })}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Nhập tin nhắn */}
                        <form
                            className="flex items-end gap-3 border-t border-gray-200 bg-white px-4 py-3"
                            onSubmit={handleSendMessage}
                        >
                            <input
                                type="text"
                                placeholder="Nhập tin nhắn..."
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 resize-none"
                                rows="1"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={!message.trim() || !connected}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-2xl hover:shadow-lg transition disabled:opacity-50"
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </form>
                    </>
                )}
            </section>
        </div>
    );
}

function MessageLeft({ avatar, name, text, time }) {
    return (
        <div className="flex items-start gap-2">
            <img
                src={avatar || "/user.png"}
                alt={name}
                className="w-8 h-8 rounded-full object-cover"
            />
            <div>
                <div className="bg-gray-100 px-4 py-2 rounded-2xl text-gray-900">{text}</div>
                <div className="text-xs text-gray-400 mt-1">{time}</div>
            </div>
        </div>
    );
}

function MessageRight({ text, time }) {
    return (
        <div className="flex justify-end">
            <div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-2xl text-white">
                    {text}
                </div>
                <div className="flex justify-end items-center gap-1 mt-1 text-xs text-gray-300">
                    <CheckCheck className="h-3 w-3 text-green-300" />
                    <span>{time}</span>
                </div>
            </div>
        </div>
    );
}
