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
            const userData = cookies.user;
            if (userData) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/users/${userData.email}`);
                    setUser(response.data);
                } catch (err) {
                    console.error(err);
                    setError("Failed to fetch user data.");
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
            await axios.put(`http://localhost:8000/api/users/${user.email}`, user); // Send request with email
            alert('Profile updated successfully');
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
                            <div className="mb-4">
                                <label className="block text-lg" htmlFor="phoneNumber"><strong>Phone Number:</strong></label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={user.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full p-2 bg-gray-700 rounded-md text-white"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg" htmlFor="billingAddress"><strong>Billing Address:</strong></label>
                                <input
                                    type="text"
                                    name="billingAddress"
                                    value={user.billingAddress}
                                    onChange={handleInputChange}
                                    className="w-full p-2 bg-gray-700 rounded-md text-white"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg"><strong>Promotions:</strong></label>
                                <select
                                    name="promotions"
                                    value={user.promotions ? 'yes' : 'no'}
                                    onChange={(e) => setUser({ ...user, promotions: e.target.value === 'yes' })}
                                    className="w-full p-2 bg-gray-700 rounded-md text-white"
                                >
                                    <option value="yes">Subscribe</option>
                                    <option value="no">Unsubscribe</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-lg"><strong>Cards:</strong></h2>
                                {user.cards.map((card, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <input
                                            type="text"
                                            value={card}
                                            onChange={(e) => handleCardChange(index, e.target.value)}
                                            className="w-full p-2 bg-gray-700 rounded-md text-white"
                                            placeholder={`Card ${index + 1}`}
                                        />
                                        {user.cards.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeCard(index)}
                                                className="ml-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-md"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {user.cards.length < 4 && (
                                    <button
                                        type="button"
                                        onClick={addCard}
                                        className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 mt-2"
                                    >
                                        Add Card
                                    </button>
                                )}
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
