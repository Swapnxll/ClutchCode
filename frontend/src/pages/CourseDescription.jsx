import React, { useEffect, useState } from "react";
import { CourseData } from "../context/CourseContext";
import { UserData } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import image from "../assets/image.png";

const CourseDescription = ({ user }) => {
  const { fetchUser } = UserData();
  const { course, fetchCourse } = CourseData();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="course-description bg-gray-800 rounded-lg p-6 text-white max-w-3xl mx-auto">
              <div className="course-header flex items-center mb-6">
                <img
                  src={image}
                  alt={image}
                  className="course-image w-48 h-32 object-cover rounded-md mr-6"
                />
                <div className="course-info">
                  <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                  <p className="mb-1">Instructor: {course.createdBy}</p>
                  <p>Duration: {course.duration} hours</p>
                </div>
              </div>

              <p className="mb-4">{course.description}</p>

              {(user && user.subscription.includes(course._id)) ||
              user.role == "admin" ? (
                <>
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="common-btn bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
                  >
                    Study
                  </button>
                </>
              ) : (
                <>
                  <p className="mb-6 font-semibold">
                    Let's get started with course At ₹{course.price}
                  </p>
                  <button className="common-btn bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition">
                    Buy Now
                  </button>
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;
