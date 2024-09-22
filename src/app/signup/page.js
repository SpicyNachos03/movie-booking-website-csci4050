'use client'
import './signup.css'
import { useState } from 'react';
import Link from 'next/link';

export default function Signup() {


    const [registered, setRegistration] = useState(false);
    const handleRegistration = () => {
        setRegistration(true);
    }

    return (
        <div className="signUpWrapper">
            {registered ? ( 
                <>
                    <h1>Registration Complete!</h1>
                    <p>Click Below to Return to the Home Page</p>
                    <Link href="/">Home Page</Link>
                </>
            ) : (
            <>
                <h1> Sign Up</h1>
                <form className="formBox">
                    <div className="inputWrapper">
                        <label>Name:</label>
                        <input type="text" name="name"/>
                    </div>
                    <div className="inputWrapper">
                        <label>Email: </label>
                        <input type="email" name="email"/>
                    </div>
                    <div className="inputWrapper">
                        <label>Phone Number: </label>
                        <input type="phoneNumber" name="phoneNumber"/>
                    </div>
                    <div className="inputWrapper">
                        <label>Password:</label>
                        <input type="password" name="password"/>
                    </div>
                    <div className="inputWrapper">
                        <label>Confirm Password: </label>
                        <input type="password" name="confirmPass"/>
                    </div>
                    <button onClick={setRegistration} className="button">Submit</button>
                </form>
            </>
            )}
        </div>
    )
};