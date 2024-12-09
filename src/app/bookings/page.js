'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './bookings.css'

function UserBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userCookie = Cookies.get('user');
        if (!userCookie) {
          router.push('/login');
          return;
        }

        const userData = JSON.parse(userCookie);
        if (!userData?.data?.email) {
          router.push('/login');
          return;
        }

        const bookingsResponse = await axios.get(`http://localhost:8000/api/bookings/${userData.data.email}`);
        
        setBookings(bookingsResponse.data.bookings || []);

      } catch (err) {
        console.error('Error fetching data:', err.response?.data || err.message);
        setError('Failed to fetch bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div> 
        <Header/>
        <h1>User Bookings</h1>
    <div className="user-bookings">
      
      {bookings.length === 0 ? (
        <p>No bookings found for this user.</p>
      ) : (
        <div className="bookings-container">
          <ul>
            {bookings.map((booking) => (
              <li key={booking._id}>
                <h3>Booking {booking._id}</h3>
                <p>Show: {booking.showInformation?.title || 'Show information unavailable'}</p>
                <p>Total: ${booking.orderTotal}</p>
                <ul>
                  {booking.ticketArray.map((ticket, index) => (
                    <li key={index}>
                      Seat: {ticket.seatName}, Type: {ticket.ticketType}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
}

export default UserBookingsPage;
