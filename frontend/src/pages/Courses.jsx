import React from "react";
import { CourseData } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";
import { UserData } from "../context/UserContext";

const Courses = () => {
  const { courses } = CourseData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Our Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="transform transition duration-300 hover:scale-105"
          >
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
