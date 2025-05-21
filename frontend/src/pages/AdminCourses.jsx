import React, { useState } from "react";
import axios from "axios";

const AdminCourses = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    duration: "",
    price: "",
    image: null,
  });

  const [preview, setPreview] = useState(null); // image preview URL
  const [loading, setLoading] = useState(false);

  // Handle input changes including file input
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));

      if (file) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload an image");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("createdBy", formData.createdBy);
      data.append("duration", formData.duration);
      data.append("price", formData.price);
      data.append("file", formData.image);
      // key must match backend multer config

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/course/new`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);

      // reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        duration: "",
        price: "",
        image: null,
      });
      setPreview(null);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-neutral-900 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Create New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-3 rounded bg-neutral-800"
          required
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 rounded bg-neutral-800"
          required
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-3 rounded bg-neutral-800"
          required
        />
        <input
          name="createdBy"
          value={formData.createdBy}
          onChange={handleChange}
          placeholder="Created By"
          className="w-full p-3 rounded bg-neutral-800"
          required
        />
        <input
          name="duration"
          type="number"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration (hours)"
          className="w-full p-3 rounded bg-neutral-800"
          required
          min={1}
        />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-3 rounded bg-neutral-800"
          required
          min={0}
          step="0.01"
        />

        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-3 bg-neutral-800 rounded"
          required
        />

        {preview && (
          <img
            src={preview}
            alt="Course Preview"
            className="w-full h-64 object-cover rounded border border-neutral-700"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded text-white font-semibold"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
};

export default AdminCourses;
