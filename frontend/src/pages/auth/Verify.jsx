import React, { useState } from "react";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { verifyOtp, btnLoading } = UserData();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
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
            Verify OTP
          </h2>
          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Enter OTP
              </label>
              <input
                type="number"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                className="block w-full rounded-md px-3 py-2.5 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[hsl(240,5%,18%)] border border-[hsl(240,5%,25%)]"
                placeholder="OTP"
              />
            </div>

            <button
              type="submit"
              disabled={btnLoading}
              className="w-full bg-blue-600 text-gray-50 font-medium rounded-md py-2.5 hover:bg-blue-700 transition-colors shadow-sm"
            >
              {btnLoading ? "please wait..." : "verify"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Verify;
