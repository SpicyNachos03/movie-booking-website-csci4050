'use client'

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation'; 
import axios from 'axios';
import './forgotPassword.css';

function forgotPassword() {
    //const email = "johndoe123@email.com";
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form reload on submit
    
        // Validate required fields
        if (email === '' || phoneNumber === '' || newPass === '' || confirmPass === '') {
            setError("Please fill out all the fields.");
            return; // Exit early to prevent making the API call
        }
    
        // Validate passwords match
        if (newPass !== confirmPass) {
            setError("Passwords do not match.");
            return;
        }
    
        try {
            // Make the API call
            const response = await axios.put("http://localhost:8000/api/users/forgotPassword", { email, phoneNumber, newPass });
    
            // Handle successful response
            if (response.status === 200) {
                setError(false); // Clear any previous error
                alert("Password reset successfully!"); // Show success message
                router.push('/login');
            } else {
                console.log(response.status);
                setError("Unexpected response from the server. Please try again.");
            }
        } catch (error) {
            console.error("Error details:", error); // Log the error for debugging
        }
    };

    return (
        <div className="forgotPwBox">
            <Header/>
            <div className="forgotPass">
                <h1>Forgot your Password?</h1>
                <p>
                    Please enter your email address and phone number accordingly, as well as your new password:
                </p>
                <form onSubmit={handleSubmit} id="emailBox">
                    <label>Email:</label>
                    <input 
                    type = "email" 
                    placeholder = "example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Phone Number:</label>
                    <input
                        type = "text"
                        placeholder = "###-###-####"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />

                    <label>New Password:</label>
                    <input 
                        type ="password"
                        placeholder="New Password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                    />

                    <label>Confirm New Password:</label>
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                    />

                    <Button variant="primary" type="submit">Submit</Button>
                </form>
                {error && <p className="errorMessage">{error}</p>}
            </div>
            <Footer/>
    </div>
    );
}
export default forgotPassword;