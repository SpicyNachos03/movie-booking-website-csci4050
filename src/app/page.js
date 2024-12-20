'use client';

import { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import Image from "next/image";
import Link from 'next/link';
import 'react-image-gallery/styles/css/image-gallery.css';
import './globals.css';
import MyVideoSlider from "../components/MyVideoSlider";
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import HeroCarousel from '../components/HeroCarousel';
import { useRouter } from 'next/navigation';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null); // Track selected movie
  const router = useRouter();

  const containerRefs = useRef({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/movies');
        if (!response.ok) throw new Error(`Failed to fetch movies: ${response.statusText}`);
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        alert('Failed to load movies. Please try again later.'); // Display error
      }
    };
    fetchMovies();
  }, []);  

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const statuses = ['Now Showing', 'Coming Soon', 'Special Event'];

  const handleScroll = (status, direction) => {
    const scrollAmount = 300;
    const container = containerRefs.current[status];
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId); // Set selected movie ID to show MovieCard
  };

  const closeMovieCard = () => {
    setSelectedMovieId(null); // Clear the selected movie ID to close MovieCard
  };

  return (
    <div>
      <Header />

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

        <div className="w-full max-w-2xl mb-12">
          <SearchBar />
        </div>

        <div className="w-full max-w-5xl mx-auto mb-12">
          <h1 className="text-4xl font-semibold font-poppins text-center mb-6 tracking-wider text-lightCyan">
            Featured Trailers
          </h1>
          <MyVideoSlider />
        </div>

        {statuses.map((status) => (
          <div key={status} className="w-full max-w-6xl mx-auto mb-12">
            <h2 className="text-4xl font-semibold font-poppins text-lightCyan mb-6 tracking-wide">
              {status}
            </h2>
            
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

              <div
                ref={(el) => (containerRefs.current[status] = el)}
                className="flex gap-4 overflow-x-auto scrollbar-hide"
                style={{ maxHeight: '400px', alignItems: 'flex-start' }}
              >
                {movies
                  .filter((movie) => movie.status === status)
                  .map((movie) => (
                    <div
                      key={movie._id}
                      onClick={() => handleMovieClick(movie._id)} // Handle movie click
                      className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
                      style={{ flex: '0 0 auto', width: '200px', height: '350px' }}
                    >
                      <Image
                        src={movie.posterUrl}
                        alt={movie.title}
                        width={200}
                        height={300}
                        className="object-coer w-full h[300px]"
                      />
                      <div className="p-2 h-[50px] flex flex-col justify-center">
                        <h3 className="text-sm font-semibold text-white ">{movie.title}</h3>
                        <p className="text-sageGreen text-xs mt-1">{movie.status}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}

        {/* <div className="mt-8">
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
        </div> */}
      </main>

      {selectedMovieId && ( // Conditionally render MovieCard
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <MovieCard movieId={selectedMovieId} onClose={closeMovieCard} />
        </div>
      )}

      <Footer />
    </div>
  );
}
