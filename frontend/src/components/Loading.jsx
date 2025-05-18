import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          {/* Loading Text */}
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
