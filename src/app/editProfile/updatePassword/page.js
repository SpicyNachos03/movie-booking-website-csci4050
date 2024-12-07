'use client'

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

function updatePassword(){
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();    
    const [formState, setFormState] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = cookies.user; // Get user data from cookies
            if (userData) {
                try {
                    // Fetch user data from backend API
                    const response = await axios.get(`http://localhost:8000/api/users/${userData.data.email}`);
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

    const handlePasswordInputChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { oldPassword, newPassword, confirmPassword } = formState;

        //Client-side validation
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match!');
            return;
        }

        try{
            // Send password update request to the backend
            const response = await axios.put(`http://localhost:8000/api/users/${user.email}/updatePassword`, {
                oldPassword,
                newPassword
            });

            // Success message if the password was updated
            setSuccess('Password updated successfully.');
            setError('');
        } catch (err) {
            // Error handling for backend validation of request failure
            console.log(err.response);
            setError(err.response?.dat?.message || 'Failed to update password.');
            setSuccess('');
        }
    };

    return (
      <div>
        <Header></Header>

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
          <h1 className="text-4xl font-bold mb-6">Update Password</h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="w-full max-w-md">
            {/* Input field for old password */}
            <div className="mb-4">
              <label className="block text-lg" htmlFor="oldPassword">
                <strong>Original Password:</strong>
              </label>
              <input
                type="password"
                name="oldPassword"
                onChange={handlePasswordInputChange}
                className="w-full p-2 bg-gray-700 rounded-md text-white"
                required
              />
            </div>

            {/* Input field for new password */}
            <div className="mb-4">
              <label className="block text-lg" htmlFor="newPassword">
                <strong>New Password:</strong>
              </label>
              <input
                type="password"
                name="newPassword"
                onChange={handlePasswordInputChange}
                className="w-full p-2 bg-gray-700 rounded-md text-white"
                required
              />
            </div>

            {/* Input field for confirm password */}
            <div className="mb-4">
              <label className="block text-lg" htmlFor="confirmPassword">
                <strong>Confirm New Password:</strong>
              </label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handlePasswordInputChange}
                className="w-full p-2 bg-gray-700 rounded-md text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 w-full"
            >
              Submit
            </button>
          </form>
        </div>

        <Footer></Footer>
      </div>
    );
}

export default updatePassword;