import '../styles/globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Todo App</title>
      </head>
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ThemeProvider attribute="class">
          <SWRConfig value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SWRConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
