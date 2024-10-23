'use client';

import React, { useState, useEffect } from 'react';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    billingAddress: '',
    password: '',
    phoneNumber: '',
    promotions: false,
    cards: [], // Manage cards here
  });
  const [newCard, setNewCard] = useState(''); // State for adding new cards
  const [loading, setLoading] = useState(true);
  const userId = '67180a4a179c89087faf6286'; // Replace with actual user ID

  // Fetch user data from the database
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user data');

        const user = await response.json();
        setFormData({
          ...user,
          promotions: user.promotions === 1,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCardChange = (e) => setNewCard(e.target.value);

  const addCard = () => {
    if (newCard) {
      setFormData((prev) => ({
        ...prev,
        cards: [...prev.cards, newCard],
      }));
      setNewCard('');
    }
  };

  const removeCard = (index) => {
    setFormData((prev) => ({
      ...prev,
      cards: prev.cards.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      promotions: formData.promotions ? 1 : 0,
    };

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Failed to update user');

      const updatedUser = await response.json();
      console.log('Profile Updated:', updatedUser);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="edit-profile-container min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block font-medium mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label htmlFor="lastName" className="block font-medium mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none"
            />
          </div>

          {/* Billing Address */}
          <div className="mb-4">
            <label htmlFor="billingAddress" className="block font-medium mb-2">Billing Address</label>
            <input
              type="text"
              id="billingAddress"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full p-2 border rounded-md bg-gray-700 text-gray-400"
            />
          </div>

          {/* Promotions */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="promotions"
              name="promotions"
              checked={formData.promotions}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="promotions" className="font-medium">Receive Promotions</label>
          </div>

          {/* Cards */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Cards</label>
            <ul className="mb-2">
              {formData.cards.map((card, index) => (
                <li key={index} className="flex items-center justify-between mb-1">
                  <span>{card}</span>
                  <button
                    type="button"
                    onClick={() => removeCard(index)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex">
              <input
                type="text"
                value={newCard}
                onChange={handleCardChange}
                className="w-full p-2 border rounded-md focus:outline-none mr-2"
                placeholder="Add new card"
              />
              <button
                type="button"
                onClick={addCard}
                className="bg-tealBlue py-2 px-4 rounded-md hover:bg-sageGreen transition"
              >
                Add
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-tealBlue py-2 rounded-md hover:bg-sageGreen transition">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

