import React from "react";
import { CourseData } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";
import { UserData } from "../context/UserContext";

const Courses = () => {
  const { courses } = CourseData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default Courses;
