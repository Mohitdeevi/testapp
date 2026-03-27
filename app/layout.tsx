import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Todo App',
  description: 'A modern todo app with categories, due dates, and priority levels',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}