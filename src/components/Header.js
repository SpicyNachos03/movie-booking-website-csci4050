'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Sync user state with cookies
  useEffect(() => {
    const storedUser = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    setUser(storedUser);
    
    // Optional: Handle cookie updates (e.g., if login changes happen in another tab)
    const handleCookieChange = () => {
      const updatedUser = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
      setUser(updatedUser);
    };

    // Adding an interval to check for changes every second (you can adjust this)
    const interval = setInterval(handleCookieChange, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    Cookies.remove('user'); // Remove user cookie
    setUser(null);
    router.push('/login');
  };

  return (
    <header className="bg-tealBlue p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            src="/cosmic-studios.png"
            alt="Movie Logo"
            width={200}
            height={75}
          />
        </Link>

        <nav className="flex items-center">
          <ul className="flex space-x-4 mr-4">
            {user ? (
              <>
                {/* Bookings */}
                <li>
                  <Link href="/seating" className="text-white hover:text-lightCyan">
                    Bookings
                  </Link>
                </li>

                {/* Admin link (only for admin users) */}
                {user.data.type === '2' && (
                  <li>
                    <Link href="/admin" className="text-white hover:text-lightCyan">
                      Admin
                    </Link>
                  </li>
                )}

                {/* Profile */}
                <li>
                  <button
                    onClick={() => router.push('/profile')}
                    className="text-white hover:text-lightCyan flex items-center"
                  >
                    <Image
                      src="/user-icon.png"
                      alt="User Profile"
                      width={32}
                      height={32}
                      className="rounded-full mr-2"
                    />
                    <span>Profile</span>
                  </button>
                </li>

                {/* Logout */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-lightCyan"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Default links for non-logged-in users */}
                <li>
                  <Link href="/signup" className="text-white hover:text-lightCyan">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-white hover:text-lightCyan">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/skeleton">Skeleton</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
