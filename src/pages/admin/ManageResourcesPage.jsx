import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";

// Convert Type enum → Tiếng Việt
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

// Convert Status enum → Tiếng Việt
const convertStatusToVietnamese = (status) => {
  switch (status) {
    case "DRAFT":
      return "Nháp";
    case "PUBLISHED":
      return "Xuất bản";
    case "ARCHIVED":
      return "Lưu trữ";
    default:
      return "Khác";
  }
};

const ManageResourcesPage = () => {
  const navigate = useNavigate();
  const { get, put } = useFetch();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // Bộ lọc
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [categoryFilter, setCategoryFilter] = useState("Tất cả");

  const fetchResources = async () => {
    try {
      const res = await get("http://localhost:8080/identity/resources");
      if (res && Array.isArray(res)) {
        const formatted = res.map((item) => ({
          id: item.resourcesID,
          title: item.resourcesName,
          category: convertTypeToVietnamese(item.resourcesType),
          status: convertStatusToVietnamese(item.resourcesStatus),
          author: item.user?.fullName || "Không rõ",
          date: new Date(item.createdAt).toLocaleDateString("vi-VN"),
          excerpt: item.description,
          raw: item, // lưu lại để gọi API PUT khi cần
        }));
        setResources(formatted);
      }
    } catch (err) {
      console.error("Error fetching resources:", err);
      toast.error("Không thể tải danh sách tài nguyên");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Lọc realtime
  const filteredResources = resources.filter((res) => {
    const matchesSearch = res.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "Tất cả" || res.status === statusFilter;
    const matchesCategory = categoryFilter === "Tất cả" || res.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Hàm xoá bài viết
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xoá bài viết này?");
    if (!confirmed) return;

    try {
      await fetch(`http://localhost:8080/identity/resources/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Đã xoá tài nguyên thành công!");
      fetchResources();
    } catch (err) {
      console.error(err);
      toast.error("Xoá thất bại!");
    }
  };

  // Hàm cập nhật trạng thái bài viết
  const handleToggleStatus = async (item) => {
    const currentStatus = item.raw.resourcesStatus;
    const nextStatus = currentStatus === "DRAFT" ? "PUBLISHED" : "DRAFT";

    try {
      await put(
        {
          resourceName: item.raw.resourcesName,
          image: item.raw.image,
          description: item.raw.description,
          content: item.raw.content,
          resourcesType: item.raw.resourcesType,
          resourcesStatus: nextStatus,
        },
        {},
        `http://localhost:8080/identity/resources/s`
      );

      toast.success(
        nextStatus === "PUBLISHED"
          ? "Đã xuất bản bài viết!"
          : "Đã chuyển bài viết về nháp!"
      );
      fetchResources();
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật trạng thái thất bại!");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Tài nguyên</h1>
        <button
          onClick={() => navigate("/admin/resources/add")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Thêm tài nguyên
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Tìm kiếm tài nguyên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <svg
              className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
          </div>

          {/* Bộ lọc */}
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="Tất cả">Tất cả trạng thái</option>
              <option value="Nháp">Nháp</option>
              <option value="Xuất bản">Xuất bản</option>
              <option value="Lưu trữ">Lưu trữ</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="Tất cả">Tất cả danh mục</option>
              <option value="Sức khỏe">Sức khỏe</option>
              <option value="Dinh dưỡng">Dinh dưỡng</option>
              <option value="Công thức">Công thức</option>
              <option value="Tư duy">Tư duy</option>
              <option value="Nấu ăn">Nấu ăn</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danh sách */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
        {loading ? (
          <p className="p-6">Đang tải...</p>
        ) : filteredResources.length === 0 ? (
          <p className="p-6 text-gray-500">Không có tài nguyên nào</p>
        ) : (
          filteredResources.map((item) => (
            <ResourceItem
              key={item.id}
              {...item}
              onDelete={() => handleDelete(item.id)}
              onToggleStatus={() => handleToggleStatus(item)}
            />
          ))
        )}
      </div>

      <div className="text-sm text-gray-500">
        Hiển thị {filteredResources.length} tài nguyên
      </div>
    </div>
  );
};

// Item component
const ResourceItem = ({ title, status, category, author, date, excerpt, onDelete, onToggleStatus }) => {
  const statusColors = {
    Nháp: "bg-gray-100 text-gray-800",
    "Xuất bản": "bg-green-100 text-green-800",
    "Lưu trữ": "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="p-6 flex justify-between items-start">
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status] || "bg-gray-100 text-gray-800"}`}
          >
            {status}
          </span>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {category}
          </span>
        </div>
        <p className="text-gray-600 mb-3 line-clamp-2">{excerpt}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>Bởi {author}</span>
          <span>•</span>
          <span>Ngày {date}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 ml-4">
        {/* <button
          onClick={onToggleStatus}
          className="p-2 text-green-600 hover:text-green-700 hover:bg-green-100 rounded-lg transition-colors"
          title="Chuyển trạng thái bài viết"
        >
          <ToggleIcon />
        </button> */}
        <button
          onClick={onDelete}
          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          title="Xoá bài viết"
        >
          <XIcon />
        </button>
      </div>
    </div>
  );
};

const ToggleIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

export default ManageResourcesPage;
