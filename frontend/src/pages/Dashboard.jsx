import React from "react";
import { CourseData } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";

const Dashboard = () => {
  const { mycourse } = CourseData();
  return (
    <div className="min-h-screen  p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        All Enrolled Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mycourse && mycourse.length > 0 ? (
          mycourse.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No course Enrolled Yet
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
