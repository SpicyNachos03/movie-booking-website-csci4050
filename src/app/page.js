import Image from "next/image";
import './globals.css';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal text-white">
      {/* Main Content */}
      <main className="flex flex-col gap-8 flex-grow items-center sm:items-start p-8 sm:p-20">
        <h2 className="text-3xl font-bold mb-4">Enter Your Journey to Unforgettable Cinema</h2>
        <SearchBar />
        <p className="text-lg mb-1">
          Explore endless entertainment with a ticket that brings stories to life. Your next adventure is just a click away!
        </p>
       
        <h1 className="text-3xl font-bold mb-3">Featured Trailers</h1>

        {/* Trailer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {/* Interstellar Trailer */}
          <div className="w-full aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/2LqzF5WauAw"
              title="Interstellar Movie - Official Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Inception Trailer */}
          <div className="w-full aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/YoHD9XEInc0"
              title="Inception - Official Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Ratatouille Trailer */}
          <div className="w-full aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/NgsQ8mVkN8w"
              title="Ratatouille - Official Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <button className="bg-sageGreen text-white px-4 py-2 rounded hover:bg-tealBlue transition-colors duration-300">Get Started</button>

        {/* Rest of your existing code */}
      </main>
    </div>
  );
}