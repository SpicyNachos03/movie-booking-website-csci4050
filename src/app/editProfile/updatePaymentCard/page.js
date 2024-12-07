'use client'

import { useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function updatePaymentCard() {

    const [paymentCards, setPaymentCards] = useState([]);
    const [cardNumber, setCardNumber] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {

    };

    return (
        <div>
            <Header></Header>
            <div className="flex flex-col items-center justify-center bg-gray-900 text-white py-12">
                {/* Payment Cards List */}
                <h1 className="text-4xl font-bold mb-6">Payment Cards</h1>
                <div className="w-full max-w-md">
                    {paymentCards.length > 0 ? (
                        paymentCards.map((card, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-800 rounded-md mb-4 shadow-md"
                            >
                                <p className="text-lg">Card Number: **** **** **** {card.lastFourDigits}</p>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 bg-gray-800 rounded-md mb-4 shadow-md text-center">
                            <p className="text-lg">No payment cards available. Please add one below.</p>
                        </div>
                    )}
                </div>

                {/* Add Payment Card */}
                <h1 className="text-4xl font-bold mb-6">Add Payment Card</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    {/* Input field for card number */}
                    <div className="mb-4">
                        <label className="block text-lg mb-2" htmlFor="cardNumber">
                            <strong>Card Number:</strong>
                        </label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full p-2 bg-gray-700 rounded-md text-white"
                            required
                        />
                    </div>

                    {/* Input field for expiration date */}
                    <div className="mb-4">
                        <label className="block text-lg mb-2" htmlFor="expiration">
                            <strong>Expiration Date:</strong>
                        </label>
                        <input
                            type="text"
                            value={expiration}
                            onChange={(e) => setExpiration(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full p-2 bg-gray-700 rounded-md text-white"
                            required
                        />
                    </div>

                    {/* Input field for CVV */}
                    <div className="mb-4">
                        <label className="block text-lg mb-2" htmlFor="cvv">
                            <strong>CVV:</strong>
                        </label>
                        <input
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="w-full p-2 bg-gray-700 rounded-md text-white"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 w-full"
                    >
                        Add Card
                    </button>
                </form>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default updatePaymentCard;