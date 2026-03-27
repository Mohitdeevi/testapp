import Link from 'next/link';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-neutral p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-xl font-bold">Todo App</a>
        </Link>
        <div>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="mr-4">
            Toggle Theme
          </button>
          <Link href="/categories">
            <a className="mr-4">Categories</a>
          </Link>
          <Link href="/tasks">
            <a>Tasks</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
