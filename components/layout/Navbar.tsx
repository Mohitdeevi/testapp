'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-500">
          Todo App
        </Link>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-indigo-500 transition-colors">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
}