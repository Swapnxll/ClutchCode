import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const testimonials = [
    {
      text: "This platform helped me master DSA(Dosa-Sambhar Algorithm) in record time!",
      author: "Tumul Nigam",
      role: "Food Insspector at VTR",
    },
    {
      text: "The visualizations made learning so much easier.",
      author: "Yuvraj singh",
      role: "Student at BHU",
    },
    {
      text: "I cracked my interview thanks to this course.",
      author: "Kavay Gupta",
      role: "SDE at Valorant",
    },
    {
      text: "Helped me at Minecraft",
      author: "Jyoti Boral",
      role: "Developer at Minecraft",
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
        <section className="py-20 text-center text-white">
          <div className="container mx-auto px-5 max-w-4xl">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Master Data Structures &amp; Algorithms
            </h1>
            <p className="text-lg text-gray-400 mb-10">
              Learn the most important computer science fundamentals through
              interactive lessons, visualizations, and hands-on coding
              challenges.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="#"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded"
              >
                Start Learning
              </a>
              <button
                onClick={() => {
                  navigate("/courses");
                }}
                className="border border-gray-600 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Course Card 1 */}
              <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1">
                <div className="h-40 flex items-center justify-center text-3xl text-blue-400 bg-gray-700">
                  [ ]
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    Arrays &amp; Strings
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Master the fundamental building blocks of programming with
                    interactive exercises.
                  </p>
                  <span className="inline-block bg-green-900 text-green-300 text-xs font-semibold px-3 py-1 rounded-full">
                    Beginner
                  </span>
                </div>
              </div>

              {/* Course Card 2 */}
              <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1">
                <div className="h-40 flex items-center justify-center text-3xl text-blue-400 bg-gray-700">
                  [ ]
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    Binary Trees &amp; Graphs
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Learn hierarchical data structures with animated
                    walkthroughs.
                  </p>
                  <span className="inline-block bg-yellow-900 text-yellow-300 text-xs font-semibold px-3 py-1 rounded-full">
                    Intermediate
                  </span>
                </div>
              </div>

              {/* Course Card 3 */}
              <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1">
                <div className="h-40 flex items-center justify-center text-3xl text-blue-400 bg-gray-700">
                  [ ]
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    Dynamic Programming
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Solve complex problems by breaking them down into simpler
                    subproblems.
                  </p>
                  <span className="inline-block bg-red-900 text-red-300 text-xs font-semibold px-3 py-1 rounded-full">
                    Advanced
                  </span>
                </div>
              </div>
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
