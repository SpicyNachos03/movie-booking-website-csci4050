'use client';

import Image from "next/image";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import "./login.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


function ForgotPassword() {
    const email = "johndoe123@email.com";

    function handleSubmit(e) {
        const emailInput = e.target.querySelector(
            'input[type="email"]'
        ).value;
        const auth = emailInput == email;
        setAuthourized(auth);
    };

    return (
        <div className="forgotPass">
        <h1>Forgot your password?</h1>
        <p>
            Enter your email associated with an account to be sent a link to reset your password.
        </p>
        <form action="#" onSubmit={handleSubmit}>
        <input type = "email" placeholder = "Email" />
        <Button variant="primary" type="submit">Submit</Button>
        </form>
    </div>
    );



}
export default ForgotPassword;