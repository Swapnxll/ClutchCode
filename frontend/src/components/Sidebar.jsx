import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const links = [
    { name: "Create Course", path: "/admin/create" },
    { name: "Edit Course", path: "/admin/edit" },
    { name: "User Details", path: "/admin/users" },
  ];

  return (
    <div
      className={`bg-neutral-900 text-white h-screen transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } p-4 shadow-lg`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white mb-6 focus:outline-none"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar Content */}
      {isOpen && (
        <>
          <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="block px-4 py-2 rounded-lg bg-neutral-800 hover:bg-blue-600 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;
