'use client';

import Footer from '../components/Footer';
import Image from "next/image";
import 'react-image-gallery/styles/css/image-gallery.css';
import './globals.css';
import MyVideoSlider from "../components/MyVideoSlider";
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white">
      <Header />

      <main className="flex flex-col items-center flex-grow p-6 sm:p-12">
        {/* Hero Section */}
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

        {/* Action Button */}
        <div className="mt-8">
          {isLoggedIn ? (
            <button className="bg-sageGreen text-white font-roboto px-8 py-3 rounded-lg hover:bg-tealBlue transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              Book Ticket
            </button>
          ) : (
            <button className="bg-sageGreen text-white font-roboto px-8 py-3 rounded-lg hover:bg-tealBlue transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              Login
            </button>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
