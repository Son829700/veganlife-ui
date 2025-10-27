import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

export default function SettingsTab() {
    const { user, logout } = useAuthContext();
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteInput, setDeleteInput] = useState("");

    // State để edit
    const [name, setName] = useState(user?.fullName || "" || user?.username);
    const [email, setEmail] = useState(user?.email || "");
    const [goal, setGoal] = useState(user?.personalGoal || "health");

    console.log("User in SettingsTab:", user);
    // 👉 xử lý lưu thông tin
    const handleSaveProfile = () => {
        // TODO: call API update profile
        console.log("Update profile:", { name, email, goal });
    };

    // 👉 xử lý đổi mật khẩu
    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        // TODO: call API đổi mật khẩu
        console.log("Update password");
        setShowPasswordForm(false);
    };

    // 👉 xử lý xoá tài khoản
    const handleDeleteAccount = () => {
        if (deleteInput === "DELETE") {
            // TODO: call API xoá tài khoản
            console.log("Deleting account...");
        } else {
            alert("Bạn cần nhập đúng DELETE để xác nhận.");
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Cài đặt tài khoản
                </h2>
                <p className="text-gray-600">
                    Quản lý thông tin và bảo mật tài khoản của bạn.
                </p>
            </div>

            {/* Thông tin tài khoản */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    👤 Thông tin tài khoản
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Ảnh đại diện
                        </label>
                        <div className="flex items-center gap-4">
                            <img
                                src={
                                    user?.avatar ||
                                    "./user.png"
                                }
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover shadow-lg"
                            />
                            <div>
                                <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-600 transition">
                                    Tải ảnh mới
                                </button>
                                <p className="text-xs text-gray-500">
                                    JPG, PNG hoặc GIF. Tối đa 2MB.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Họ tên
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mục tiêu cá nhân
                        </label>
                        <select
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                        >
                            <option value="energy">Tăng năng lượng</option>
                            <option value="weight">Giảm cân</option>
                            <option value="sustainability">Bền vững</option>
                            <option value="performance">Tăng hiệu suất</option>
                            <option value="health">Cải thiện sức khỏe</option>
                            <option value="ethics">Lý do đạo đức</option>
                        </select>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between">
                    <button
                        onClick={handleSaveProfile}
                        className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition"
                    >
                        Lưu thay đổi
                    </button>

                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:shadow-lg transition"
                    >
                        Đăng xuất
                    </button>
                </div>

            </div>

            {/* Đổi mật khẩu */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    🔒 Đổi mật khẩu
                </h3>

                {showPasswordForm ? (
                    <form className="space-y-4" onSubmit={handlePasswordUpdate}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mật khẩu hiện tại
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mật khẩu mới
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Xác nhận mật khẩu mới
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                            >
                                Cập nhật mật khẩu
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowPasswordForm(false)}
                                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                ) : (
                    <button
                        onClick={() => setShowPasswordForm(true)}
                        className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors duration-200"
                    >
                        Đổi mật khẩu
                    </button>
                )}
            </div>

            {/* Xóa tài khoản */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-200">
                <h3 className="text-xl font-bold text-red-900 mb-6 flex items-center gap-2">
                    ⚠️ Khu vực nguy hiểm
                </h3>

                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2">Xóa tài khoản</h4>
                    <p className="text-sm text-red-700 mb-4">
                        Hành động này sẽ xóa vĩnh viễn tài khoản của bạn. Không thể khôi
                        phục lại!
                    </p>

                    {showDeleteConfirm ? (
                        <div className="space-y-4">
                            <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                                <p className="text-red-800 font-semibold mb-2">
                                    Bạn có chắc chắn không?
                                </p>
                                <p className="text-red-700 text-sm">
                                    Nhập <strong>DELETE</strong> bên dưới để xác nhận.
                                </p>
                                <input
                                    type="text"
                                    value={deleteInput}
                                    onChange={(e) => setDeleteInput(e.target.value)}
                                    placeholder='Nhập "DELETE" để xác nhận'
                                    className="w-full mt-3 px-3 py-2 border border-red-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleDeleteAccount}
                                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
                                >
                                    Đồng ý xóa tài khoản
                                </button>
                                <button
                                    onClick={() => {
                                        setDeleteInput("");
                                        setShowDeleteConfirm(false);
                                    }}
                                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                        >
                            Xóa tài khoản
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
