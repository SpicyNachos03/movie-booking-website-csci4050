'use client';

import Image from "next/image";
import { useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ForgotPassword from "./forgotPass";

import "./login.css";



function Login() {
    const password = "password";
    const email = "johndoe123@email.com";
    const [authorized, setAuthourized] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false)

    const handleForgotPassword = () => {
        setIsForgotPassword(true);
    };
    function handleSubmit(e) {
        const passwordInput = e.target.querySelector(
            'input[type="password"]'
        ).value;
        const auth = passwordInput == password;
        setAuthourized(auth);

    }

    const login = (
       <div className="loginBox"> 
            <h1>Login</h1>
            <form action="#" onSubmit={handleSubmit}>
                <input type = "email" placeholder = "Email" />
                <input type = "password" placeholder="Password" />
                <div className= "rmmrMe"> 
                    <p> Remember Me</p>
                    <input type="checkbox" />
                </div>
                <div className="forgotPass">
                    <button onClick={handleForgotPassword}>Forgot Password?</button>
                </div>

                
                <Button variant="primary" type="submit">Login</Button>

            </form>
        </div>
    );

    return (
        <div>
            {isForgotPassword ? (
                <ForgotPassword/>
            ) : (
                <div id="authorized">
                    {authorized ? "LOGIN SUCCESSFUL" : login}
                </div>             
            )}

        </div>
    );

};
export default Login;