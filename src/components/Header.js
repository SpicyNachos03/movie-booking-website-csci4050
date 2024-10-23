// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';

// export default function Header() {
//   const router = useRouter();

//   return (
//     <header className="bg-tealBlue p-4 w-full">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link href="/">
//           <Image
//             src="/cosmic-studios.png"
//             alt="Movie Logo"
//             width={200}
//             height={75}
//           />
//         </Link>
//         <nav className="flex items-center">
//           <ul className="flex space-x-4 mr-4">
//             <li><Link href="/signup" className="text-white hover:text-lightCyan">Sign Up</Link></li>
//             <li><Link href="/login" className="text-white hover:text-lightCyan">Login</Link></li>
//             <li><Link href="/admin" className="text-white hover:text-lightCyan">Admin</Link></li>
//             <li><Link href="/skeleton" className="text-white hover:text-lightCyan">Skeleton</Link></li>
//           </ul>
//           <button
//             onClick={() => router.push('/editProfile')} // Using useRouter for navigation
//             className="text-white hover:text-lightCyan"
//           >
//             <Image
//               src="/user-icon.png"
//               alt="User Profile"
//               width={32}
//               height={32}
//               className="rounded-full"
//             />
//           </button>
//         </nav>
//       </div>
//     </header>
//   );
// }

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem('user');
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
              //if user successfully logged in
              <>
                <li>
                  <Link href="/profile" className="text-white hover:text-lightCyan">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/editBookings" className="text-white hover:text-lightCyan">
                    Bookings
                  </Link>
                </li>
                {user.type === '1' && ( // Check if the user is an admin
                  <li>
                    <Link href="/admin" className="text-white hover:text-lightCyan">
                      Admin
                    </Link>
                  </li>
                  
                )}
                {user && (
                  <button onClick={() => router.push('/editProfile')}
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
                )}
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
              // default for web users
              <>
                <li>
                  <Link href="/signup" className="text-white hover:text-lightCyan">Sign Up</Link>
                </li>
                <li>
                  <Link href="/login" className="text-white hover:text-lightCyan">Login</Link>
                </li>
              </>
            )}
          </ul>
          
        </nav>
      </div>
    </header>
  );
}
