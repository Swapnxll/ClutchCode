import React from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import image from "../assets/image.png";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();

  return (
    <div className="bg-gray-800  rounded-lg overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1 flex flex-col justify-between">
      <img src={image} alt="Course" className=" w-auto max-w-full" />

      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Title and Duration */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-white">{course.title}</h3>
            <span className="text-sm text-blue-400 bg-gray-700 px-2 py-1 rounded">
              [{course.duration} hrs]
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 mb-4">{course.description}</p>

          {/* Instructor and Price */}
          <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
            <span>By: {course.createdBy}</span>
            <span>₹{course.price}</span>
          </div>

          {/* Category and Button */}
          <div className="flex items-center justify-between">
            <span className="inline-block bg-red-900 text-red-300 text-xs font-semibold px-3 py-1 rounded-full">
              {course.category}
            </span>

            {isAuth ? (
              user && user.role !== "admin" ? (
                user.subscription.includes(course._id) ? (
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    Study
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/courses/${course._id}`)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                  >
                    Get Started
                  </button>
                )
              ) : (
                <button
                  onClick={() => navigate(`/courses/${course._id}`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  Study
                </button>
              )
            ) : (
              <button
                onClick={() => navigate(`/courses/${course._id}`)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

/*
  📌 Description:
  This component displays all courses in a responsive grid layout.
  For each course, it conditionally renders a button based on:
  
  1. If the user is **not authenticated**, shows a "Get Started" button linking to login.
  2. If the user **is authenticated**:
     - If user is **not an admin**:
         - If subscribed to the course → show "Study"
         - Else → show "Get Started"
     - If user is **admin**, always show "Study"

  🔐 Ensures role-based and subscription-based access to course actions.
*/
