'use client';

import { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import Image from "next/image";
import Link from 'next/link';  // Import Link for navigation
import 'react-image-gallery/styles/css/image-gallery.css';
import './globals.css';
import MyVideoSlider from "../components/MyVideoSlider";
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import HeroCarousel from '../components/HeroCarousel'; // Import the HeroCarousel component
import { useRouter } from 'next/navigation';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

export default function Home() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  const containerRefs = useRef({}); // Store references for each status section

  // Fetch movies on page load
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/movies');
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  // Get user data from local storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const statuses = ['Now Showing', 'Coming Soon', 'Special Event']; // Define statuses

  // Scroll handler for buttons
  const handleScroll = (status, direction) => {
    const scrollAmount = 300; // Adjust how much to scroll per click
    const container = containerRefs.current[status];
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <div>
      <Header />

      {/* Hero Carousel Section */}
      <HeroCarousel /> 

      <main className="flex flex-col items-center flex-grow p-6 sm:p-12">
        <div className="text-center max-w-4xl mb-10">
          <h2 className="text-6xl font-extrabold font-poppins text-sageGreen mb-6 leading-tight tracking-wide drop-shadow-lg">
            Your Cinematic Adventure Awaits
          </h2>
          <p className="text-xl font-roboto text-gray-300 leading-relaxed mb-4">
            Experience the magic of cinema with a ticket that brings stories to life. Dive into the world of movies today!
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl mb-12">
          <SearchBar />
        </div>

        {/* Featured Trailers */}
        <div className="w-full max-w-5xl mx-auto mb-12">
          <h1 className="text-4xl font-semibold font-poppins text-center mb-6 tracking-wider text-lightCyan">
            Featured Trailers
          </h1>
          <MyVideoSlider />
        </div>

        {/* Movie Sections by Status */}
        {statuses.map((status) => (
          <div key={status} className="w-full max-w-6xl mx-auto mb-12">
            <h2 className="text-4xl font-semibold font-poppins text-lightCyan mb-6 tracking-wide">
              {status}
            </h2>
            
            {/* Scroll Buttons */}
            <div className="relative">
              <button
                onClick={() => handleScroll(status, 'left')}
                className="absolute left-0 z-10 bg-tealBlue text-white p-3 rounded-full shadow-lg hover:bg-sageGreen -translate-y-1/2 top-1/2"
              >
                ◀
              </button>
              <button
                onClick={() => handleScroll(status, 'right')}
                className="absolute right-0 z-10 bg-tealBlue text-white p-3 rounded-full shadow-lg hover:bg-sageGreen -translate-y-1/2 top-1/2"
              >
                ▶
              </button>

              {/* Movie List */}
              <div
                ref={(el) => (containerRefs.current[status] = el)}
                className="flex gap-4 overflow-x-auto scrollbar-hide"
                style={{ maxHeight: '400px', alignItems: 'flex-start' }} // Set a fixed height for the container
              >
                {movies
                  .filter((movie) => movie.status === status)
                  .map((movie) => (
                    <Link key={movie._id} href={`/seating/${movie._id}`}> {/* Link to movie's seating page */}
                      <div
                        className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
                        style={{ flex: '0 0 auto', width: '200px', height: 'auto' }} // Smaller width for cards
                      >
                        <Image
                          src={movie.posterUrl}
                          alt={movie.name}
                          width={150} // Smaller width
                          height={225} // Smaller height
                          className="w-full h-auto"
                        />
                        <div className="p-2"> {/* Adjust padding for better alignment */}
                          <h3 className="text-lg font-semibold text-white">{movie.name}</h3>
                          <p className="text-sageGreen text-sm mt-1">{movie.status}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        ))}

        {/* Book Ticket or Login Button */}
        <div className="mt-8">
          {user ? (
            <Link href="/book-ticket">
              <button className="bg-sageGreen text-white font-roboto px-8 py-3 rounded-lg hover:bg-tealBlue transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                Book Ticket
              </button>
            </Link>
          ) : (
            <Link href="/login">
              <button className="bg-sageGreen text-white font-roboto px-8 py-3 rounded-lg hover:bg-tealBlue transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                Login
              </button>
            </Link>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
