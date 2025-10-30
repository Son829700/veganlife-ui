import React, { useState } from "react";
import API from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const convertTypeToVietnamese = (type) => {
    switch (type) {
        case "HEALTH":
            return "Sức khỏe";
        case "NUTRITION":
            return "Dinh dưỡng";
        case "RECIPES":
            return "Công thức";
        case "MINDSET":
            return "Tư duy";
        case "COOKING":
            return "Nấu ăn";
        default:
            return "Khác";
    }
};

const AddResourcePage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        resourcesName: "",
        img: "",
        description: "",
        content: "",
        resourcesType: "HEALTH",
        resourcesStatus: "DRAFT",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await API.post("/resources", formData);
            toast.success("Lưu tài nguyên thành công!");
            // reset form nếu cần
            setFormData({
                resourcesName: "",
                img: "",
                description: "",
                content: "",
                resourcesType: "HEALTH",
                resourcesStatus: "DRAFT",
            });
        } catch (error) {
            console.error(error);
            toast.error(
                "❌ Lỗi: " +
                (error.response?.data?.message || "Không thể lưu tài nguyên")
            );
        } finally {
            setLoading(false);
        }
    };

    const resourceTypes = ["HEALTH", "NUTRITION", "RECIPES", "MINDSET", "COOKING"];

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Thêm tài nguyên</h1>
                <button
                    onClick={() => navigate("/admin/resources")}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
                >
                    ← Trở về
                </button>
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6"
            >
                {/* resourcesName */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tiêu đề tài nguyên
                    </label>
                    <input
                        type="text"
                        name="resourcesName"
                        value={formData.resourcesName}
                        onChange={handleChange}
                        placeholder="Nhập tiêu đề"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                    />
                </div>

                {/* img */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ảnh (URL)
                    </label>
                    <input
                        type="text"
                        name="img"
                        value={formData.img}
                        onChange={handleChange}
                        placeholder="Nhập link ảnh"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>

                {/* description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mô tả ngắn
                    </label>
                    <textarea
                        rows="3"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Nhập mô tả"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    ></textarea>
                </div>

                {/* content */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nội dung chi tiết
                    </label>
                    <textarea
                        rows="6"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Nhập nội dung"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    ></textarea>
                </div>

                {/* resourcesType */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Danh mục
                    </label>
                    <select
                        name="resourcesType"
                        value={formData.resourcesType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        {resourceTypes.map((type) => (
                            <option key={type} value={type}>
                                {convertTypeToVietnamese(type)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* resourcesStatus */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Trạng thái
                    </label>
                    <select
                        name="resourcesStatus"
                        value={formData.resourcesStatus}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        <option value="DRAFT">Nháp</option>
                        <option value="PUBLISHED">Đã xuất bản</option>
                        <option value="ARCHIVED">Lưu trữ</option>
                    </select>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end space-x-3">
                    <button
                        type="reset"
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                        onClick={() =>
                            setFormData({
                                resourcesName: "",
                                img: "",
                                description: "",
                                content: "",
                                resourcesType: "HEALTH",
                                resourcesStatus: "DRAFT",
                            })
                        }
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {loading ? "Đang lưu..." : "Lưu tài nguyên"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddResourcePage;
