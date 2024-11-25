'use client'

import { useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from 'react-bootstrap';
import Link from 'next/link'
import styles from '../../../signup/signup.css';
import { useRouter } from 'next/navigation';

function addPromotions() {
    const [promotionRate, setPromotionRate] = useState('');
    const [promotionName, setPromotionName] = useState('');


    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const router = useRouter();
    const returnManagePromotions = () => {
        router.push('/admin/managePromotions');
    }
    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (promotionRate === '' || promotionName === '') {
            setError(true);
        }
        const promotion = {
            promotionName,
            promotionRate,
        };
        try {
            const response = await axios.post("http://localhost:8000/api/promotions", promotion);

            if (response.status === 201) {
                setSubmitted(true)
                setError(false);
                 // Trigger email notifications
                await axios.post("http://localhost:8000/api/emails/sendPromotionEmails");
                console.log("Promotion emails sent successfully.");
            } else {
                setError(true);
            } 
        } catch (error) {
            console.log("Error Adding Promotion:", error);
            setError(true);
        }
    }
    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? "" : "none",
                }}
            >
                <h1>Promotion has been successfully added!</h1>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? "" : "none",
                }}
            >
                <h1>Please enter all the fields</h1>
            </div>
        );
    };

    return (
        <div>
            <Header></Header>
            <div className="formWrapper">
                <button onClick={returnManagePromotions}> Go Back to Manage Promotions </button>
                <h1>To add a new promotion, fill out this form:</h1>
                {/* Calling to the methods */}
                <div className="messages">
                    {errorMessage()}
                    {successMessage()}
                </div>
                <form className="formBox">
                    <div className="inputWrapper">
                        <label className="label">Promotion Name</label>
                        <input
                            onChange={handleInputChange(setPromotionName)}
                            className="input"
                            value={promotionName}
                            type="text"
                            placeholder="Promotion Name"
                        />
                    </div>

                    <div className="inputWrapper">
                        <label className="label">Promotion Rate</label>
                        <input
                            onChange={handleInputChange(setPromotionRate)}
                            className="input"
                            value={promotionRate}
                            type="number"
                            placeholder="20 = 20% off"
                        />
                    </div>


                    <button onClick={handleSubmit} className="button" type="submit">
                        Submit
                    </button>
                </form>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default addPromotions;