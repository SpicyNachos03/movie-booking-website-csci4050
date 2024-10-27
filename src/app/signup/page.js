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
            <Footer/>
        </div>
    )

};
