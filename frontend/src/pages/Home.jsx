import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";
const Home = ({ user }) => {
  const navigate = useNavigate();
  const { courses } = CourseData();

  const testimonials = [
    {
      text: "This platform helped me master DSA(Dosa-Sambhar Algorithm)",
      author: "Tumul Nigam",
      role: "Food Inspector at VTR",
    },
    {
      text: "The visualizations made learning so much easier.",
      author: "Yuvraj singh",
      role: "Student and Cat Whisperer at BHU",
    },
    {
      text: "I cracked my interview thanks to this course.",
      author: "Kavay Gupta",
      role: "SDE at Valorant (Mazak se hatt ke)",
    },
    {
      text: "This course helped me mining in Minecraft and debugging at life.",
      author: "Jyoti Boral",
      role: "Developer & Minecraft Builder",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <>
      <>
        {/* Hero Section */}
        <section className="py-20  text-center text-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Master Data Structures, Algorithms & Development
            </h1>
            <p className="text-base md:text-lg text-gray-400 mb-10 px-2">
              Learn core computer science fundamentals and modern web
              development through interactive lessons, visualizations,
              real-world projects, and hands-on coding challenges.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() =>
                  user ? navigate(`${user._id}/dashboard`) : navigate("/")
                }
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded w-full sm:w-auto"
              >
                Start Learning
              </button>
              <button
                onClick={() => navigate("/courses")}
                className="border border-gray-600 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded w-full sm:w-auto"
              >
                Explore Courses
              </button>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-16 text-white">
          <div className="container mx-auto px-5 max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-10">
              Our Courses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 3).map((course) => (
                <div
                  key={course._id}
                  className="transform transition duration-300 hover:scale-105"
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-5 bg-[hsl(240,5%,15%)] overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              What Our Students Say
            </h2>
            <div className="relative">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentTestimonial * 100}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-[hsl(240,4%,22%)] p-8 rounded-lg text-center">
                      <p className="italic text-lg mb-6 relative">
                        <span className="text-[hsl(216,100%,65%)] text-2xl">
                          "
                        </span>
                        {testimonial.text}
                        <span className="text-[hsl(216,100%,65%)] text-2xl">
                          "
                        </span>
                      </p>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-[hsl(240,5%,65%)] text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial
                        ? "bg-[hsl(216,100%,65%)]"
                        : "bg-[hsl(240,5%,25%)]"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  );
};

export default Home;
