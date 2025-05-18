import React from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";

const Account = ({ user }) => {
  const navigate = useNavigate();

  const { setIsAuth, setUser } = UserData();

  const logouthandler = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER}/logout`, // or your full URL like 'http://localhost:5000/logout'
        {},
        { withCredentials: true }
      );

      setIsAuth(false);
      setUser([]);
      toast.success("Logged out");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };
  return (
    <div>
      {user && (
        <div className="min-h-screen px-6 py-10 bg-neutral-950 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Account Details</h1>

            <div className="bg-neutral-900 p-6 rounded-xl shadow-md space-y-4">
              <div>
                <span className="text-gray-400">Name:</span>
                <p className="text-lg font-medium">{user.name}</p>
              </div>

              <div>
                <span className="text-gray-400">Email:</span>
                <p className="text-lg font-medium">{user.email}</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                  onClick={() => navigate("/dashboard")} // Add your navigation logic
                >
                  Dashboard
                </button>

                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
                  onClick={logouthandler}
                  // Add your logout logic
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
