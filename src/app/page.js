'use client';

import Image from "next/image";
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyVideoSlider from "../components/MyVideoSlider";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-charcoal text-white">
      <main className="flex flex-col gap-8 flex-grow items-center sm:items-start p-8 sm:p-20">
        <h2 className="text-3xl font-bold mb-4">Enter Your Journey to Unforgettable Cinema</h2>
        <SearchBar />
        <p className="text-lg mb-1">
          Explore endless entertainment with a ticket that brings stories to life. Your next adventure is just a click away!
        </p>
       
        <h1 className="text-3xl font-bold mb-3">Featured Trailers</h1>

        {/* Trailer Slider */}
        <div className="w-full max-w-4xl mx-auto">
          <MyVideoSlider />
        </div>

        {isLoggedIn ? (
          <button className="bg-sageGreen text-white px-4 py-2 rounded hover:bg-tealBlue transition-colors duration-300">
            Book Ticket
          </button>
        ) : (
          <button className="bg-sageGreen text-white px-4 py-2 rounded hover:bg-tealBlue transition-colors duration-300">
            Login
          </button>
        )}
      </main>
    </div>
  );
}