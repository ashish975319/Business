import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/apiClient";
import logo from "../assets/download.png"; // Importing the logo image
import Footer from "./Footer"; // Importing the Footer component

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    designation: "",
    phoneNumber: "",
    website: "",
    industryType: "",
    otherIndustryType: "",
    interested: "",
    otherInterested: "",
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.company) formErrors.company = "Company is required";
    if (!formData.designation)
      formErrors.designation = "Designation is required";
    if (!formData.phoneNumber)
      formErrors.phoneNumber = "Phone number is required";
    if (!formData.website) formErrors.website = "Website is required";
    if (!formData.industryType)
      formErrors.industryType = "Industry Type is required";
    if (formData.industryType === "Others" && !formData.otherIndustryType)
      formErrors.otherIndustryType = "Please specify your industry";
    if (!formData.interested)
      formErrors.interested = "Interested field is required";
    if (formData.interested === "Others" && !formData.otherInterested)
      formErrors.otherInterested = "Please specify your interest";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow w-full max-w-lg p-8 bg-white shadow-lg rounded-lg mt-5 mb-5 mx-auto">
        <img src={logo} alt="Company Logo" className="mx-auto mb-5" />
        <h1 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
          Please fill the following details
        </h1>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Name", name: "name" },
            { label: "Company", name: "company" },
            { label: "Designation", name: "designation" },
            { label: "Phone Number", name: "phoneNumber" },
            { label: "Website", name: "website" },
          ].map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                {field.label}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
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

          {/* Industry Type Field */}
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Industry Type
              <span className="text-red-500">*</span>
            </label>
            <select
              name="industryType"
              value={formData.industryType}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.industryType ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select Industry Type</option>
              <option value="Bank">Bank</option>
              <option value="Fintech">Fintech</option>
              <option value="Corporate BC">Corporate BC</option>
              <option value="Others">Others</option>
            </select>
            {errors.industryType && (
              <p className="text-red-500 text-sm mt-1 italic">
                {errors.industryType}
              </p>
            )}
            {formData.industryType === "Others" && (
              <div className="mt-2">
                <input
                  type="text"
                  name="otherIndustryType"
                  value={formData.otherIndustryType}
                  onChange={handleChange}
                  placeholder="Please specify your industry"
                  className={`w-full p-3 border ${
                    errors.otherIndustryType
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.otherIndustryType && (
                  <p className="text-red-500 text-sm mt-1 italic">
                    {errors.otherIndustryType}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Interested Field */}
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Interested
              <span className="text-red-500">*</span>
            </label>
            <select
              name="interested"
              value={formData.interested}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.interested ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select Interested</option>
              <option value="Technology">Technology</option>
              <option value="Both Technology and BC">
                Both Technology and BC
              </option>
              <option value="Others">Others</option>
            </select>
            {errors.interested && (
              <p className="text-red-500 text-sm mt-1 italic">
                {errors.interested}
              </p>
            )}
            {formData.interested === "Others" && (
              <div className="mt-2">
                <input
                  type="text"
                  name="otherInterested"
                  value={formData.otherInterested}
                  onChange={handleChange}
                  placeholder="Please specify your interest"
                  className={`w-full p-3 border ${
                    errors.otherInterested
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.otherInterested && (
                  <p className="text-red-500 text-sm mt-1 italic">
                    {errors.otherInterested}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Upload Field */}
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Upload Your Business Card (Optional)
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default FormComponent;
