'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

function updatePaymentCard() {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [cards, setCards] = useState([]);
    const [user, setUser] = useState(null);
    const [cardNumber, setCardNumber] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = cookies.user; // Get user data from cookies
            console.log(userData);
            if (userData) {
                try {
                    // Fetch user data from backend API
                    const response = await axios.get(`http://localhost:8000/api/users/${userData.data.email}`);
                    console.log(response);
                    setUser(response.data); // Set user data in state
                } catch (err) {
                    console.error(err);
                    setError("Failed to fetch user data."); // Set error if fetching fails
                }
            } else {
                router.push('/login'); // Redirect to login if no user data found
            }
        };

        fetchUserData();
    }, [cookies.user, router]);

    useEffect(() => {
        if (user) {
            setCards(user.cards); // Example: Update cards based on user data
        }
    }, [user]);

    const handleDeleteCard = async (lastFourDigits) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/users/deleteCard",
          {
            email: user.email,
            lastFourDigits,
          }
        );

        if (response.status === 200) {
          // Update local state to remove the card from the UI
          setCards((prevCards) =>
            prevCards.filter((card) => card.lastFourDigits !== lastFourDigits)
          );
        }
      } catch (error) {
        console.error("Error deleting card:", error);
        setError("Failed to delete card.");
      }
    };
      

    const handleSubmit = async (e) => {
        e.preventDefault();

        const paymentCardData = {
            email: user.email,
            cardNumber,
            expiration,
            cvv,
            lastFourDigits: cardNumber.slice(-4),
        };
        console.log("Payment Card Data:", paymentCardData); // Log data being sent

        try {  
            console.log("Do I get here?")
            const response = await axios.post("http://localhost:8000/api/users/addCard", paymentCardData);

            if (response.status === 201) {
                setSubmitted(true)
                setError(false);
            } else {
                setError(true);
            }
        } catch (error) {
            console.log("Error Adding Payment Card:", error);
            setError(true);
        }
    };
    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? "" : "none",
                }}
            >
                <h1>Payment Card has been successfully added!</h1>
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
        <div className="flex flex-col items-center justify-center bg-gray-900 text-white py-12">
          {/* Payment Cards List */}
          <h1 className="text-4xl font-bold mb-6">Payment Cards</h1>
          <div className="w-full max-w-md">
            {cards.length > 0 ? (
              cards.map((card, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-800 rounded-md mb-4 shadow-md"
                >
                  <p className="text-lg">
                    Card Number: **** **** **** {card.lastFourDigits}
                  </p>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded mt-2"
                    onClick={() => handleDeleteCard(card.lastFourDigits)}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <div className="p-4 bg-gray-800 rounded-md mb-4 shadow-md text-center">
                <p className="text-lg">
                  No payment cards available. Please add one below.
                </p>
              </div>
            )}
          </div>

          {/* Add Payment Card */}
          <h1 className="text-4xl font-bold mb-6">Add Payment Card</h1>
          {/* Calling to the methods */}
          <div className="messages">
            {errorMessage()}
            {successMessage()}
          </div>
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
                placeholder="**** **** **** ****"
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
                placeholder="***"
                className="w-full p-2 bg-gray-700 rounded-md text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 w-full"
              onClick={handleSubmit}
            >
              Add Card
            </button>
          </form>
        </div>
        <Footer></Footer>
      </div>
    );
}

export default updatePaymentCard;