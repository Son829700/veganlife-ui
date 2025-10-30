import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { format } from "date-fns";
import axios from "axios";
import API from "../../api";

export default function ReadingPage() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await API.get(`/resources/${id}`);
        setResource(res.data.data);
      } catch (err) {
        console.error("Error fetching resource:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!resource) {
    return <div className="text-center py-20 text-gray-500">Không tìm thấy bài viết.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Ảnh bìa */}
      <div className="relative w-full h-72 md:h-96 overflow-hidden">
        <img
          src={"/Food.png" || resource.img} 
          alt={resource.resourcesName}
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center px-6 leading-tight">
            {resource.resourcesName}
          </h1>
        </div>
      </div>

      {/* Thông tin tác giả */}
      <div className="max-w-3xl mx-auto px-5 mt-8 text-center">
        <p className="text-gray-600 text-sm">
          🕒 {resource.readingTime} phút đọc ·{" "}
        </p>
        <span className="inline-block bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full mt-3">
          {resource.resourcesType}
        </span>
      </div>

      {/* Mô tả ngắn */}
      <div className="max-w-3xl mx-auto px-5 mt-6 text-center text-gray-700 italic">
        {resource.description}
      </div>

      {/* Nội dung bài viết */}
      <div
        className="prose prose-lg md:prose-xl max-w-3xl mx-auto px-5 mt-10 mb-20 prose-headings:text-gray-900 prose-p:text-gray-700 prose-img:rounded-2xl"
        dangerouslySetInnerHTML={{ __html: resource.content }}
      />
    </div>
  );
}
