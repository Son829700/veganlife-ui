import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const categories = ["Tất cả", "Sức khỏe", "Dinh dưỡng", "Công thức", "Tư duy", "Nấu ăn"];

// Hàm chuyển type sang tiếng Việt
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

export default function ResourcePage() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const { get: getBlogs } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBlogs(`http://localhost:8080/identity/resources`);
        console.log("API Response:", response); // sẽ ra mảng 9 item
        setResources(response); // ✅ response đã là array
      } catch (error) {
        console.error("Fetch error in ResourcePage:", error);
      }
    };

    fetchData();
  }, [getBlogs]);

  console.log(resources);
  // Lọc theo từ khóa và danh mục
  const filteredResources = resources.filter((res) => {
    const matchesSearch = res.resourcesName
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "Tất cả" ||
      convertTypeToVietnamese(res.resourcesType) === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Thư viện{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">
              Kiến Thức
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bài viết, video và hướng dẫn chuyên sâu hỗ trợ hành trình sống xanh của bạn với thông tin khoa học và lời khuyên thực tế.
          </p>
        </div>
      </section>

      {/* Bộ lọc & Tìm kiếm */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search box */}
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Tìm kiếm tài nguyên..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              <svg
                className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Danh sách tài nguyên */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            Tài Nguyên Nổi Bật
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.length > 0 ? (
              filteredResources.map((item) => (
                <Link
                  to={`/resources/${item.resourcesID}`}
                  key={item.resourcesID}
                >
                  <div className="bg-white rounded-2xl shadow hover:shadow-xl p-6 transition">
                    <img
                      src={item.imageUrl || "./Food.png"}
                      onError={(e) => { e.target.src = "/assets/no-image.png"; }}
                      alt="Resource"
                    />

                    <span className="inline-block bg-emerald-500 text-white text-xs px-3 py-1 rounded-full mb-4">
                      {convertTypeToVietnamese(item.resourcesType)}
                    </span>
                    <h3 className="text-lg font-bold mb-2 text-gray-900 hover:text-emerald-600">
                      {item.resourcesName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">
                      Tác giả: {item.user?.fullName ?? "Ẩn danh"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Thời lượng đọc: {item.readingTime} phút
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                Không có tài nguyên nào phù hợp.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
