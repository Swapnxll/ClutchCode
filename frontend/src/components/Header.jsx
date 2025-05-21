import { useState } from "react";
import { FaBars, FaTimes, FaBrain } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Header({ isAuth }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 h-16 bg-[hsl(240,5%,12%)]/90 backdrop-blur-md border-b border-gray-800">
        <div onClick={() => navigate("/")} className="flex items-center">
          <FaBrain className="text-blue-500 text-2xl mr-2" />
          <span className="text-xl font-semibold text-gray-100 hidden sm:block">
            Code Clutch
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center space-x-4 text-gray-300 text-lg font-medium">
          <Link to="/" className="px-3 py-1.5 rounded-md hover:bg-blue-700">
            Home
          </Link>
          <Link
            to="/courses"
            className="px-3 py-1.5 rounded-md hover:bg-blue-700"
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="px-3 py-1.5 rounded-md hover:bg-blue-700"
          >
            About
          </Link>
          {isAuth ? (
            <>
              <Link
                to="/sheet"
                className="px-3 py-1.5 rounded-md hover:bg-blue-700"
              >
                Sheet
              </Link>
              <Link
                to="/account"
                className="px-3 py-1.5 rounded-md hover:bg-blue-700"
              >
                Account
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-md hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 rounded-md hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Hamburger Icon (Mobile Only) */}
        <div
          className="sm:hidden text-white text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </header>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="sm:hidden bg-[hsl(240,5%,12%)] border-b border-gray-800 text-white text-lg px-6 py-4 space-y-2">
          <Link to="/" onClick={() => setIsOpen(false)} className="block">
            Home
          </Link>
          <Link
            to="/courses"
            onClick={() => setIsOpen(false)}
            className="block"
          >
            Courses
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block">
            About
          </Link>
          {isAuth ? (
            <>
              <Link
                to="/sheet"
                onClick={() => setIsOpen(false)}
                className="block"
              >
                Sheet
              </Link>
              <Link
                to="/account"
                onClick={() => setIsOpen(false)}
                className="block"
              >
                Account
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Header;
