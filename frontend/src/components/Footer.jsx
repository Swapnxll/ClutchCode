import React from "react";
import { FaGithub, FaBrain } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className=" bg-[hsl(240,5%,12%)]/90 backdrop-blur-md border-t border-gray-800 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
        {/* Left: Logo */}
        <div className="flex items-center mb-4 md:mb-0">
          <FaBrain className="text-blue-500 text-2xl mr-2" />
          <span className="text-xl font-semibold text-gray-100">
            Clutch-Code
          </span>
        </div>

        {/* Right: GitHub Link */}
        <a
          href="https://github.com/swapnxll"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-300 hover:text-blue-500 transition-colors duration-200"
        >
          <FaGithub className="text-xl mr-2" />
          <span>swapnxll</span>
        </a>
      </div>

      {/* Bottom: Copyright */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
