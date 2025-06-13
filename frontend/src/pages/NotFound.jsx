import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-[120px] font-bold text-blue-600 leading-none">
          404
        </h1>
        <p className="text-[40px] font-normal text-gray-600 mt-4">
          Oops! Page Not Found
        </p>
      </div>
    </div>
  );
};

export default NotFound;
