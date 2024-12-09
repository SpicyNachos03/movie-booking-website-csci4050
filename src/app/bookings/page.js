'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './bookings.css';

function UserBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [showDetails, setShowDetails] = useState({});
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

        // Fetch bookings for the logged-in user
        const bookingsResponse = await axios.get(`http://localhost:8000/api/bookings/${userData.data.email}`);
        const fetchedBookings = bookingsResponse.data.bookings || [];
        setBookings(fetchedBookings);

        // Fetch show details for each booking
        const showDetailsPromises = fetchedBookings.map((booking) =>
          axios.get(`http://localhost:8000/api/shows/show/${booking.showInformation}`)
        );

        const showDetailsResponses = await Promise.allSettled(showDetailsPromises);

        // Map show details using their IDs
        const shows = showDetailsResponses.reduce((acc, result, index) => {
          if (result.status === 'fulfilled') {
            acc[fetchedBookings[index].showInformation] = result.value.data;
          }
          return acc;
        }, {});

        setShowDetails(shows);
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
      <Header />
      <div className="user-bookings">
        <h1>User's Bookings</h1>
        {bookings.length === 0 ? (
          <p>No bookings found for this user.</p>
        ) : (
          <div className="bookings-container">
            <ul>
              {bookings.map((booking) => {
                const show = showDetails[booking.showInformation];
                return (
                  <li key={booking._id} className="booking-item">
                    <h3>Booking ID: {booking._id}</h3>
                    <p>Show: {show?.movieName || 'Show information unavailable'}</p>
                    <p>Room: {show?.roomName || 'Unknown Room'}</p>
                    <p>Showtime: {show ? new Date(show.dateTime).toLocaleString() : 'Unavailable'}</p>
                    <p>Total: ${booking.orderTotal}</p>
                    <ul>
                      {booking.ticketArray.map((ticket, index) => (
                        <li key={index}>
                          Seat: {ticket.seatName}, Type: {ticket.ticketType}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default UserBookingsPage;
