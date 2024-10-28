'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCookies } from 'react-cookie';

function EditProfile() {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = cookies.user; // Get user data from cookies
            if (userData) {
                try {
                    // Fetch user data from backend API
                    const response = await axios.get(`http://localhost:8000/api/users/${userData.email}`);
                    setUser(response.data); // Set user data in state
                } catch (err) {
                    console.error(err);
                    setError("Failed to fetch user data."); // Set error if fetching fails
                }
            } else {
                router.push('/login'); // Redirect to login if no user data found
            }
        };

        fetchUserData();
    }, [cookies.user, router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleCardChange = (index, value) => {
        const newCards = [...user.cards];
        newCards[index] = value;
        setUser({ ...user, cards: newCards });
    };

    const addCard = () => {
        if (user.cards.length < 4) {
            setUser({ ...user, cards: [...user.cards, ''] });
        }
    };

    const removeCard = (index) => {
        const newCards = user.cards.filter((_, i) => i !== index);
        setUser({ ...user, cards: newCards });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send PUT request using user ID
            await axios.put(`http://localhost:8000/api/users/${user._id}`, user); // Use user._id
            alert('Profile updated successfully');
            router.push('/profile');
        } catch (err) {
            console.error(err);
            setError("Failed to update profile.");
        }
    };

    if (error) {
        return <p className="errorMessage">{error}</p>;
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-container flex flex-col min-h-screen bg-gray-900 text-white">
            <Header />
            <div className="profile-content flex-grow flex justify-center items-center">
                <div className="profile-box max-w-lg w-full mx-4 p-6 bg-gray-800 rounded-lg shadow-xl">
                    <h1 className="text-4xl font-bold text-center mb-6">Edit Profile</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="profile-details">
                            {/* Input fields for first name and last name */}
                            <div className="mb-4">
                                <label className="block text-lg" htmlFor="firstName"><strong>First Name:</strong></label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={user.firstName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 bg-gray-700 rounded-md text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg" htmlFor="lastName"><strong>Last Name:</strong></label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={user.lastName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 bg-gray-700 rounded-md text-white"
                                    required
                                />
                            </div>

                            {/* Input field for billing address */}
                            <div className="mb-4">
                                <label className="block text-lg" htmlFor="billingAddress"><strong>Billing Address:</strong></label>
                                <input
                                    type="text"
                                    name="billingAddress"
                                    value={user.billingAddress}
                                    onChange={handleInputChange}
                                    className="w-full p-2 bg-gray-700 rounded-md text-white"
                                    required
                                />
                            </div>

                            {/* Input field for password */}
                            <div className="mb-4">
                                <label className="block text-lg" htmlFor="password"><strong>Password:</strong></label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleInputChange}
                                    className="w-full p-2 bg-gray-700 rounded-md text-white"
                                />
                                <small className="text-gray-400">Leave blank to keep current password.</small>
                            </div>

                            {/* Payment cards */}
                            <div className="mb-4">
                                <label className="block text-lg"><strong>Payment Cards:</strong></label>
                                {user.cards.map((card, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <input
                                            type="text"
                                            value={card}
                                            onChange={(e) => handleCardChange(index, e.target.value)}
                                            className="w-full p-2 bg-gray-700 rounded-md text-white"
                                            placeholder={`Card ${index + 1}`}
                                        />
                                        <button type="button" onClick={() => removeCard(index)} className="ml-2 text-red-500">Remove</button>
                                    </div>
                                ))}
                                <button type="button" onClick={addCard} className="text-teal-500 hover:underline">Add Card</button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 w-full mt-6"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EditProfile;
