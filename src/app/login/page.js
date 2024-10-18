'use client';

import Image from "next/image";
import { useState } from 'react';


import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from 'react-bootstrap';


import Link from 'next/link';


import styles from "./login.css";

<Link href="/about" prefetch={false}>
  About
</Link>

function Login() {
    const password = "password";
    const email = "johndoe123@email.com";
    const [authorized, setAuthourized] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false)

  
    function handleSubmit(e) {
        e.preventDefault();
        const passwordInput = e.target.querySelector(
            'input[type="password"]'
        ).value;
        const auth = passwordInput == password;
        setAuthourized(auth);

    }
   
    const login = (
       <div className="loginBox"> 
            <h1>Login</h1>
            <form action="#" onSubmit={handleSubmit} >
                <div className="inputBoxes">
                    <input type = "email" placeholder = "Email" />
                </div>
                <input type = "password" placeholder="Password" />
                <div className= "rmmrMe"> 
                    <input type="checkbox" id = "checkBox"/>
                    <p> Remember Me</p>
                    <Link href="/signup"> Sign-up</Link>
                </div>
                
                <div className="bottom">
                    
                    <Button variant="primary" type="submit">Login</Button>
                    <Link href="/forgotpw"> Forgot Password?</Link>
                </div>
        
                

            </form>
        </div>
    );
    

    return (
        <div className="container34">
            <Header />
            <div id="authorized">
                {authorized ? "LOGIN SUCCESSFUL" : login}
            </div>  
            <Footer/>           
        </div>
    );

}
export default Login;