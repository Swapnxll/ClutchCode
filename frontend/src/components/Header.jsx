import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBrain } from "react-icons/fa";
const Header = ({ isAuth }) => {
  const navigate = useNavigate();
  return (
    <>
      <header className="top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 h-16 bg-[hsl(240,5%,12%)]/90 backdrop-blur-md border-b border-gray-800">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="flex items-center"
        >
          <FaBrain className="text-blue-500 text-2xl mr-2" />
          <span className="text-xl font-semibold text-gray-100 hidden sm:block">
            Code Clutch
          </span>
        </div>
        <nav className="flex items-center space-x-4 text-gray-300 text-lg font-medium">
          <Link
            to="/"
            className="px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors duration-200 hidden sm:block"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors duration-200 hidden sm:block"
          >
            Courses
          </Link>

          <Link
            to="/about"
            className="px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors duration-200 hidden sm:block"
          >
            About
          </Link>

          {isAuth ? (
            <>
              <Link
                to="/sheet"
                className="px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors duration-200 hidden sm:block"
              >
                Sheet
              </Link>
              <Link
                to="/account"
                className="px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Account
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-2 ml-2">
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
