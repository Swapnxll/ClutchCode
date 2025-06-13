import React from "react";
import { Link, useParams } from "react-router-dom";
const PaymentSuccess = ({ user }) => {
  const params = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {user ? (
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-4">Payment Successful</h2>
          <p className="mb-2 text-lg">
            Your course subscription has been activated
          </p>
          <p className="mb-6 text-sm text-gray-400">
            Reference no - <span className="font-mono">{params.id}</span>
          </p>
          <Link
            to={`/${user._id}/dashboard`}
            className="inline-block bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-md font-semibold"
          >
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <p className="text-white text-center">
          Please login to view this page.
        </p>
      )}
    </div>
  );
};

export default PaymentSuccess;
