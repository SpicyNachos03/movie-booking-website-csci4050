'use client'

import Image from "next/image";
import { useState, useEffect } from 'react';


import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from 'react-bootstrap';


import Link from 'next/link';
import axios from 'axios'; 
import { useRouter} from 'next/navigation'; 
import "./login.css";

<Link href="/about" prefetch={false}>
    About
</Link>

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            console.log("Form submitted!");
            console.log({ email, password });
            const result = await axios.post("http://localhost:8000/api/users/login", { email, password });
            if (result.data.message === "Success") {
                const userData = {email,type: result.data.type};
                if (rememberMe) {
                    localStorage.setItem('userEmail', email); 
                } 
                localStorage.setItem('user', JSON.stringify(userData));
                router.push('/');
            } else {
                
                alert("An account is not associated with the information provided. Please Sign-up!");
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data) {
                setError(err.response.data.message);
            } else {
                setError("An error occurred while logging in. Please try again.");
            }
        }
    };

    useEffect(() => {
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true); 
        }
    }, []);

    return (
        <div className="container34">
            <Header />
            <div className="loginBox">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputBoxes">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="inputBoxes">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    {error && <p className="errorMessage">{error}</p> }
                    <div className="rmmrMe">
                        <input type="checkbox" 
                        id="checkBox" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <p> Remember Me</p>
                        <Link href="/signup">Sign-up</Link>
                    </div>
                    <div className="bottom">
                        <Button variant="primary" type="submit" >Login</Button>
                        <Link href="/login/forgotPassword">Forgot Password?</Link>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Login;