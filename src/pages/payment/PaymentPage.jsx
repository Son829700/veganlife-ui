import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";
import { useAuthContext } from "../../context/AuthContext";
import { useRef } from "react";


export default function PaymentPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user, fetchUser } = useAuthContext();
    const { post, get, loading } = useFetch();
    const [qrUrl, setQrUrl] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("pending");
    const intervalRef = useRef(null);
    const [countdown, setCountdown] = useState(10);
    const [qrLoading, setQrLoading] = useState(false);

//Tajo max qr
    useEffect(() => {
        if (!state || !user?.userID) {
            navigate("/onboarding");
            return;
        }

        const fetchQR = async () => {
            setQrLoading(true);
            try {
                const body = {
                    accountNumber: "32195877",
                    amount: state.amount,
                };
                const apiUrl = `http://localhost:8080/identity/sepay/qr/userID/${user.userID}/coachID/${state.coachId}`;
                const data = await post(body, {}, apiUrl);

                if (data?.qrUrl) setQrUrl(data.qrUrl);
                else toast.warning("Không nhận được QR từ API!");
            } catch (err) {
                console.error("QR Error:", err);
                toast.error("Không thể tạo mã QR, vui lòng thử lại!");
            }
            finally {
                setQrLoading(false);
            }
        };

        fetchQR();
    }, [state, user, post, navigate]);
    // Kiểm tra trạng thái thanh toán
    useEffect(() => {
        if (!user?.userID || !state?.coachId || paymentStatus !== "pending") return;

        const checkUrl = `http://localhost:8080/identity/sepay/status/userID/${user.userID}/coachID/${state.coachId}`;

        intervalRef.current = setInterval(async () => {
            try {
                const res = await get(checkUrl);
                console.log("📦 RES:", res);

                const status = res?.status;
                console.log("✅ Trạng thái:", status);

                if (status === "SUCCESS") {
                    clearInterval(intervalRef.current);
                    setPaymentStatus("success");
                    toast.success("Thanh toán thành công!");
                    clearInterval(intervalRef.current);
                } else if (status === "FAILED") {
                    setPaymentStatus("failed");
                    toast.error("Thanh toán thất bại!");
                    clearInterval(intervalRef.current);
                }
            } catch (err) {
                console.warn("Không thể kiểm tra trạng thái:", err);
            }
        }, 3000);

        return () => clearInterval(intervalRef.current);
    }, [user?.userID, state?.coachId, paymentStatus]);
    // Sau khi thanh toán thành công, fetch lại user và đếm ngược chuyển về trang chủ
    useEffect(() => {
        if (paymentStatus !== "success") return;

        const updateUser = async () => {
            try {
                await fetchUser(); // ✅ gọi từ AuthContext → sẽ tự setUser
                console.log("✅ Đã cập nhật lại thông tin user từ context.");
            } catch (err) {
                console.error("❌ Lỗi khi fetch lại user:", err);
            }
        };

        updateUser();

        const timeout = setTimeout(() => {
            navigate("/");
        }, 10000); // 10s đếm ngược rồi chuyển về trang chủ

        return () => clearTimeout(timeout);
    }, [paymentStatus, fetchUser, navigate]);

    // Đếm ngược hiển thị trên UI
    useEffect(() => {
        if (paymentStatus !== "success") return;

        const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownInterval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [paymentStatus]);


    if (!state || !user) return null;

    //Thông tin thanh toán
    const paymentInfo = {
        accountName: "PHAN THANH DUY",
        accountNumber: "32195877",
        bank: "ACB",
        amount: state.amount,
        transferNote: `UserID${user.userID}CoachID${state.coachId}`,
        qrUrl:
            qrUrl ||
            `https://qr.sepay.vn/img?acc=32195877&bank=ACB&amount=${state.amount}&des=UserID%3A${user.userID}CoachID%3A${state.coachId}`,
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Đã sao chép!");
    };

    // Hiển thị trạng thái thanh toán
    const renderStatus = () => {
        switch (paymentStatus) {
            case "pending":
                return (
                    <div className="flex flex-col items-center gap-2 text-gray-600 mt-6">
                        <div className="w-6 h-6 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                        <p>Đang chờ thanh toán...</p>
                    </div>
                );
            case "success":
                return (
                    <div className="flex flex-col items-center gap-2 text-emerald-600 mt-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <p>Thanh toán thành công!</p>
                        <p className="text-sm text-gray-500">
                            Bạn sẽ được chuyển về trang chủ sau <span className="font-semibold">{countdown}</span> giây...
                        </p>
                    </div>
                );
            case "failed":
                return (
                    <div className="flex flex-col items-center gap-2 text-red-500 mt-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <p>Thanh toán thất bại. Vui lòng thử lại.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 text-gray-800 py-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Thông tin thanh toán */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-emerald-600 mb-6">
                        Thông tin tài khoản
                    </h2>

                    <div className="space-y-4">
                        <InfoRow label="Chủ tài khoản" value={paymentInfo.accountName} onCopy={() => copyToClipboard(paymentInfo.accountName)} />
                        <InfoRow label="Số tài khoản" value={paymentInfo.accountNumber} onCopy={() => copyToClipboard(paymentInfo.accountNumber)} />
                        <InfoRow label="Ngân hàng" value={paymentInfo.bank} onCopy={() => copyToClipboard(paymentInfo.bank)} />
                        <InfoRow label="Số tiền" value={`${paymentInfo.amount.toLocaleString()} VNĐ`} onCopy={() => copyToClipboard(`${paymentInfo.amount.toLocaleString()}`)} />
                        <InfoRow label="Nội dung chuyển khoản" value={paymentInfo.transferNote} onCopy={() => copyToClipboard(paymentInfo.transferNote)} />
                    </div>
                </div>

                {/* QR + Trạng thái */}
                <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
                    <h3 className="text-lg font-semibold text-emerald-600 mb-6">
                        Quét mã QR để nạp tiền
                    </h3>

                    <div className="relative w-64 h-64 p-1 bg-white rounded-lg overflow-visible mb-4">
                        {qrLoading ? (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                Đang tạo mã QR...
                            </div>
                        ) : (
                            <div className="w-full h-full rounded-md overflow-hidden">
                                <img src={paymentInfo.qrUrl} alt="QR Code" className="w-full h-full object-cover" />
                            </div>
                        )}

                        {/* Góc QR */}
                        <div className="absolute z-20 top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-emerald-500 -translate-x-2 -translate-y-2 rounded-tl-sm"></div>
                        <div className="absolute z-20 top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-emerald-500 translate-x-2 -translate-y-2 rounded-tr-sm"></div>
                        <div className="absolute z-20 bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-emerald-500 -translate-x-2 translate-y-2 rounded-bl-sm"></div>
                        <div className="absolute z-20 bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-emerald-500 translate-x-2 translate-y-2 rounded-br-sm"></div>

                        {!loading && (
                            <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-10 overflow-hidden">
                                <div className="absolute w-full h-[2px] bg-emerald-400 animate-scan opacity-80 shadow-md shadow-emerald-300"></div>
                            </div>
                        )}
                    </div>

                    <p className="text-sm text-gray-500 flex items-center gap-2">
                        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                            <path d="M12 18h.01"></path>
                        </svg>
                        Dùng ứng dụng ngân hàng để quét mã
                    </p>

                    {renderStatus()}
                </div>
            </div>
        </div>
    );
}

// ✅ Component hiển thị dòng thông tin
const InfoRow = ({ label, value, onCopy }) => (
    <div className="flex justify-between items-center bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg">
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-medium text-gray-800">{value}</p>
        </div>
        <button onClick={onCopy} className="text-emerald-600 hover:text-emerald-800 text-sm">
            Sao chép
        </button>
    </div>
);
