'use client';

import Image from "next/image";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./forgotpw.css"

function ForgotPassword() {
    //const email = "johndoe123@email.com";
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    // function handleSubmit(e) {
    //     const emailInput = e.target.querySelector(
    //         'input[type="email"]'
    //     ).value;
    //     const auth = emailInput == email;
    //     setAuthourized(auth);
    // };
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form reload on submit

        if (!email) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/forgot-password', { email });
            console.log(response.data); 
            if (response.data.success) {
                alert('A password reset link has been sent to your email.');
            } else {
                setError("Error sending reset link. Please try again.");
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="forgotPwBox">
            <Header/>
            <div className="forgotPass">
                <h1>Forgot your password?</h1>
                <p>
                    Enter your email associated with an account to be sent a link to reset your password.
                </p>
                <form onSubmit={handleSubmit} id="emailBox">
                    <input 
                    type = "email" 
                    placeholder = "Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button variant="primary" type="submit">Submit</Button>
                </form>
                {error && <p className="errorMessage">{error}</p>}
            </div>
            <Footer/>
    </div>
    );
}
export default ForgotPassword;