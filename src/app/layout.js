import localFont from "next/font/local";
import "./globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Cosmic Studios",
  description: "Cosmic Studios",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-charcoal text-white">
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}