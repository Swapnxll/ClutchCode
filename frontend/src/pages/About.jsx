import React from "react";
import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaLock,
  FaCode,
  FaMobileAlt,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 text-white relative bg-gray-900 rounded-lg shadow-lg">
      {/* Glow removed, so no background blur div */}

      <div className="relative z-10">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          About This Platform
        </h1>

        <div className="space-y-5 mb-10">
          {[
            {
              icon: (
                <FaGraduationCap className="text-blue-400 text-2xl mt-1 flex-shrink-0" />
              ),
              title: "Premium Courses",
              desc: "Access high-quality courses with structured learning paths and expert instructors.",
            },
            {
              icon: (
                <FaChalkboardTeacher className="text-blue-400 text-2xl mt-1 flex-shrink-0" />
              ),
              title: "Create Content",
              desc: "Share your knowledge by creating and publishing your own courses with our intuitive tools.",
            },
            {
              icon: (
                <FaLock className="text-blue-400 text-2xl mt-1 flex-shrink-0" />
              ),
              title: "Secure Payments",
              desc: "Enjoy seamless and secure transactions with our trusted payment gateway.",
            },
            {
              icon: (
                <FaCode className="text-blue-400 text-2xl mt-1 flex-shrink-0" />
              ),
              title: "DSA Practice",
              desc: "Master algorithms with our comprehensive Data Structures & Algorithms practice sheet.",
            },
            {
              icon: (
                <FaMobileAlt className="text-blue-400 text-2xl mt-1 flex-shrink-0" />
              ),
              title: "OTP Authentication",
              desc: "Secure login with one-time passwords for enhanced account protection.",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-400 transition-all"
            >
              {icon}
              <div>
                <h3 className="text-xl font-semibold mb-1 text-blue-100">
                  {title}
                </h3>
                <p className="text-gray-300">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-700 mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-100">
            Future Goals
          </h2>
          <div className="space-y-5">
            <div className="flex items-start gap-4 p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-400 transition-all">
              <FaCode className="text-blue-400 text-2xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-1 text-blue-100">
                  In-Built Code Editor
                </h3>
                <p className="text-gray-300">
                  Integrate an interactive coding environment directly within
                  the platform to practice Data Structures & Algorithms
                  problems.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-400 transition-all">
              <FaChalkboardTeacher className="text-blue-400 text-2xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-1 text-blue-100">
                  AI-Powered Interview Preparation
                </h3>
                <p className="text-gray-300">
                  Launch AI-driven mock interviews tailored to your skill level,
                  offering feedback and improving your confidence for technical
                  interviews.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-blue-100">
            Get In Touch
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <a
                href="https://github.com/swapnxll"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                github.com/swapnxll
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
