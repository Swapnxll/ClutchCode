import React, { useEffect, useState } from "react";
import { CourseData } from "../context/CourseContext";
import { UserData } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const CourseDescription = ({ user }) => {
  const { fetchUser } = UserData();
  const { course, fetchCourse, fetchCourses, fetchMyCourse } = CourseData();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async () => {
    setLoading(true);

    try {
      // Step 1: Create Order
      const {
        data: { order },
      } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/course/checkout/${params.id}`,
        {},
        {
          withCredentials: true,
        }
      );

      const options = {
        key: "rzp_test_VECqukFblJCm5H", // Razorpay key
        amount: order.amount, // Ensure it's the correct field (e.g., order.amount)
        currency: "INR",
        name: "Code Clutch",
        description: "CHOCO",
        order_id: order.id,

        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          try {
            // Step 2: Verify payment
            const { data } = await axios.post(
              `${import.meta.env.VITE_SERVER}/api/verification/${params.id}`,
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              },
              {
                withCredentials: true,
              }
            );

            await fetchUser();
            await fetchCourses();
            await fetchMyCourse();

            toast.success(data.message);
            setLoading(false);
            navigate(`/payment-success/${razorpay_payment_id}`);
          } catch (error) {
            toast.error(
              error?.response?.data?.message || "Verification failed"
            );
            setLoading(false);
          }
        },

        theme: {
          color: "#3b82f6",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Order creation failed");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className=" rounded-xl p-6 text-white max-w-4xl mx-auto shadow-lg">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full md:w-48 h-32 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {course.title}
                  </h2>
                  <p className="text-sm text-gray-300 mb-1">
                    <span className="font-medium">Instructor:</span>{" "}
                    {course.createdBy}
                  </p>
                  <p className="text-sm text-gray-300">
                    <span className="font-medium">Duration:</span>{" "}
                    {course.duration} hours
                  </p>
                </div>
              </div>

              <p className="text-gray-200 mb-6">{course.description}</p>

              {(user && user.subscription.includes(course._id)) ||
              user.role === "admin" ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md w-full md:w-auto transition"
                >
                  Start Studying
                </button>
              ) : (
                <>
                  <p className="mb-4 font-semibold text-green-400">
                    Let's get started with this course at ₹{course.price}
                  </p>
                  <button
                    onClick={checkoutHandler}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md w-full md:w-auto transition"
                  >
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

// Razorpay intentionally sends a signature (razorpay_signature) that you can independently re-create using their secret key. That’s how they prove the response is authentic and untampered.

// Because both sides use the same secret key, only Razorpay and your server can generate the same hash. So:

// ✅ If it matches → the response is authentic.

// ❌ If it doesn't → someone tampered with the data or used a wrong key.
