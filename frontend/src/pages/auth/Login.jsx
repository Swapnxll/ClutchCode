import React from "react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate);
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ backgroundColor: "hsl(240, 5%, 12%)" }}
      >
        <div
          className="rounded-lg shadow-xl w-full max-w-sm p-8"
          style={{ backgroundColor: "hsl(240, 4%, 22%)" }}
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">
            Sign in to your account
          </h2>
          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                className="block w-full rounded-md px-3 py-2.5 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[hsl(240,5%,18%)] border border-[hsl(240,5%,25%)]"
                placeholder="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                  className="block w-full rounded-md px-3 py-2.5 pr-10 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[hsl(240,5%,18%)] border border-[hsl(240,5%,25%)]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              disabled={btnLoading}
              type="submit"
              className="w-full bg-blue-600 text-gray-50 font-medium rounded-md py-2.5 hover:bg-blue-700 transition-colors shadow-sm"
            >
              {btnLoading ? "please wait..." : "SignIn"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
