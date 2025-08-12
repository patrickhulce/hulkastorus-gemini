import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          {/* Placeholder for hex-dino logo */}
          <Image src="/next.svg" alt="Hulkastorus Logo" width={32} height={32} className="invert" />
          <span className="text-xl font-bold">Hulkastorus</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-4 items-center">
          <Link href="/docs" className="hover:text-gray-300">
            Docs
          </Link>
          <Link href="/pricing" className="hover:text-gray-300">
            Pricing
          </Link>
          <Link href="/login" className="hover:text-gray-300">
            Login
          </Link>
          <Link href="mailto:invites@hulkastor.us" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
            Get Beta
          </Link>
        </div>
      </div>
    </nav>
  );
}
