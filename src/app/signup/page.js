'use client'
import styles from './signup.css'
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RegForm from '@/components/RegForm';

import { Button } from 'react-bootstrap';
export default function Signup() {

    <Link href="/about" prefetch={false}>
  About
</Link>

    const [registered, setRegistration] = useState(false);
    const handleRegistration = () => {
        setRegistration(true);
    }

    return (
        <div>
            <Header/>
            <RegForm/>

            {/* <div className="signUpWrapper">

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
                            <input type="text" name="name" placeholder="Name"/>
                        </div>
                        <div className="inputWrapper">
                            <label>Email: </label>
                            <input type="email" name="email" placeholder="Email"/>
                        </div>
                        <div className="inputWrapper">
                            <label>Phone Number: </label>
                            <input type="phoneNumber" name="phoneNumber" placeholder="###-###-###"/>
                        </div>
                        <div className="inputWrapper">
                            <label>Password:</label>
                            <input type="password" name="password" placeholder="Password"/>
                        </div>
                        <div className="inputWrapper">
                            <label>Confirm Password: </label>
                            <input type="password" name="confirmPass" placeholder="Confirm Password"/>
                        </div>
                        <button onClick={setRegistration} className="button">Submit</button>
                    </form>
                </>
                )}

            </div> */}
            <Footer/>
        </div>
    )

};
