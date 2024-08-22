import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/apiClient";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    designation: "",
    landline: "",
    mobile: "",
    email: "",
    website: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.company) formErrors.company = "Company is required";
    if (!formData.designation)
      formErrors.designation = "Designation is required";
    if (!formData.landline) formErrors.landline = "Landline number is required";
    if (!formData.mobile) formErrors.mobile = "Mobile number is required";
    if (!formData.email) formErrors.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = "Email address is invalid";
    if (!formData.website) formErrors.website = "Website is required";
    if (!formData.address) formErrors.address = "Address is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await createUser(formData);

        navigate("/success");
        setErrors({});
      } catch (error) {
        alert("Failed to submit form.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg mt-5 mb-5">
        <h1 className="text-2xl font-bold mb-6 underline text-gray-700 text-center">
          IRIX Business Info
        </h1>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Name", name: "name" },
            { label: "Company", name: "company" },
            { label: "Designation", name: "designation" },
            { label: "Landline Number", name: "landline" },
            { label: "Mobile Number", name: "mobile" },
            { label: "Email Address", name: "email", type: "email" },
            { label: "Website", name: "website" },
            { label: "Address", name: "address" },
          ].map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                {field.label}
                <span className="text-red-500">*</span>
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={`w-full p-3 border ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1 italic">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
