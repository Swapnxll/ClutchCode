import React from "react";
import { CourseData } from "../context/CourseContext";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useEffect } from "react";

const Admin = ({ user }) => {
  const { courses, fetchCourses } = CourseData();
  const navigate = useNavigate();

  // Handle Delete Course
  const handleDelete = async (id) => {
    if (!id) return;

    try {
      await axios.delete(`http://localhost:8080/api/course/${id}`, {
        withCredentials: true,
      });
      await fetchCourses();

      // Instantly remove the course from local state
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };

  // useEffect(() => {
  //   fetchCourses();
  // }, [handleDelete]);

  return (
    <div className="flex bg-neutral-900 min-h-screen text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 space-y-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">
          All Courses
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-neutral-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* Course Image */}
              {course.image && (
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-44 object-cover"
                />
              )}

              {/* Course Details */}
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p className="text-sm text-gray-300 line-clamp-3">
                  {course.description}
                </p>
                <p className="text-sm">
                  <strong>Price:</strong> ₹{course.price}
                </p>
                <p className="text-sm">
                  <strong>Duration:</strong> {course.duration} hours
                </p>
                <p className="text-sm">
                  <strong>Category:</strong> {course.category}
                </p>

                {/* Buttons */}
                <div className="flex justify-between items-center pt-3">
                  <button
                    onClick={() => navigate(`/admin/edit/${course._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
