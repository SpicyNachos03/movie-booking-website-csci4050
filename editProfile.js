import React, { useState } from 'react';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation and submit data to the backend
    console.log('Profile Updated', formData);
  };

  return (
    <div className="edit-profile-container">
      <h2 className="text-charcoal text-2xl font-semibold mb-4">Edit Profile</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sageGreen font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tealBlue"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sageGreen font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tealBlue"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sageGreen font-medium mb-2">
            New Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tealBlue"
            placeholder="Enter new password"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sageGreen font-medium mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tealBlue"
            placeholder="Confirm new password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-tealBlue text-lightCyan py-2 rounded-md font-medium hover:bg-sageGreen transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
