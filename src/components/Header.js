'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-tealBlue p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            src="/movie.png"
            alt="Movie Logo"
            width={80}
            height={38}
          />
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/signup" className="text-white hover:text-lightCyan">Sign Up</Link></li>
            <li><Link href="/login" className="text-white hover:text-lightCyan">Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}