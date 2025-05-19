import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1">
      <div className="h-40 flex items-center justify-center text-3xl text-blue-400 bg-gray-700">
        [ {course.duration} hrs ]
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-blue-400">
          {course.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4">{course.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
          <span>By: {course.createdBy}</span>
          <span>${course.price}</span>
        </div>
        <div className="flex space-x-2">
          <span className="inline-block bg-blue-700 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full">
            {course.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
