// import React from "react";

// const SuccessPage = () => {
//   return (
//     <div className="flex items-center  justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg mt-5 mb-5">
//         <h1 className="text-2xl font-bold mb-6 underline text-gray-700 text-center">
//           Success
//         </h1>
//         <div className="mb-4 p-4 bg-green-200 text-green-800 border border-green-300 rounded-lg">
//           Your Record Saved Successfully
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuccessPage;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to FormComponent after a short delay
    const timer = setTimeout(() => {
      navigate("/"); // Assumes the FormComponent is at the root path
    }, 6000); // Redirects after 3 seconds

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg mt-5 mb-5">
        <h1 className="text-2xl font-bold mb-6 underline text-gray-700 text-center">
          Success
        </h1>
        <div className="mb-4 p-4 bg-green-200 text-green-800 border border-green-300 rounded-lg">
          Your Record Saved Successfully
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
