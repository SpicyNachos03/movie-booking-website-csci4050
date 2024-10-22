'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

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
            <li><Link href="/signup" className="text-white hover:text-lightCyan">Sign Up</Link></li>
            <li><Link href="/login" className="text-white hover:text-lightCyan">Login</Link></li>
            <li><Link href="/admin" className="text-white hover:text-lightCyan">Admin</Link></li>
            <li><Link href="/skeleton" className="text-white hover:text-lightCyan">Skeleton</Link></li>
          </ul>
          <button
            onClick={() => router.push('/editProfile')} // Using useRouter for navigation
            className="text-white hover:text-lightCyan"
          >
            <Image
              src="/user-icon.png"
              alt="User Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
          </button>
        </nav>
      </div>
    </header>
  );
}
