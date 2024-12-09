'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Cookies from 'js-cookie'; // Import js-cookie

function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = JSON.parse(Cookies.get('user')); // Get user data from cookies
            console.log(userData);
            if (userData) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/users/${userData.data.email}`);
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
    }, [router]);

    if (error) {
        return <p className="errorMessage">{error}</p>;
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    const handleEditProfile = () => {
        router.push('/editProfile'); // Navigate to Edit Profile page
    };

    return (
        <div className="profile-container flex flex-col min-h-screen bg-gray-900 text-white">
            <Header />
            <div className="profile-content flex-grow flex justify-center items-center">
                <div className="profile-box max-w-lg w-full mx-4 p-6 bg-gray-800 rounded-lg shadow-xl">
                    <h1 className="text-4xl font-bold text-center mb-6">User Profile</h1>
                    <div className="profile-details">
                        <p className="text-lg mb-2"><strong>First Name:</strong> {user.firstName}</p>
                        <p className="text-lg mb-2"><strong>Last Name:</strong> {user.lastName}</p>
                        <p className="text-lg mb-2"><strong>Email:</strong> {user.email}</p>
                        <p className="text-lg mb-2"><strong>Phone Number:</strong> {user.phoneNumber}</p>
                        <p className="text-lg mb-2"><strong>Billing Address:</strong> {user.billingAddress || 'N/A'}</p>
                        <p className="text-lg mb-2"><strong>Promotions:</strong> {user.promotions ? 'Subscribed' : 'Not Subscribed'}</p>
                        <p className="text-lg mb-2">
                            <strong>Cards:</strong>
                            {user.cards.length > 0
                                ? user.cards.map(card => `**** **** **** ${card.lastFourDigits}`).join(', ')
                                : 'No cards added'}
                        </p>                </div>
                    <button onClick={handleEditProfile} className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 w-full mt-6">
                        Edit Profile
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
