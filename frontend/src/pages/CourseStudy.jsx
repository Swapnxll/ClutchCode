import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { CourseData } from "../context/CourseContext";
import img from "../assets/image.png";
const CourseStudy = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { fetchCourse, course } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return navigate("/");
  }

  return (
    <>
      {course && (
        <div className="flex flex-col items-center gap-4 bg-gray-700 text-white p-6 rounded-lg shadow-md max-w-xl mx-auto mt-8">
          <img
            src={img}
            alt={course.title}
            className="w-72 h-auto rounded-lg shadow"
          />
          <h2 className="text-2xl font-bold text-blue-400">{course.title}</h2>
          <h4 className="text-base text-gray-300">{course.description}</h4>
          <h5 className="text-sm text-gray-400">By - {course.createdBy}</h5>
          <h5 className="text-sm text-gray-400">
            Duration - {course.duration} weeks
          </h5>
          <Link
            to={`/lectures/${course._id}`}
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Lectures
          </Link>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
