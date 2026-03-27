import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="bg-white dark:bg-neutral p-4 rounded-xl shadow-glass">
      {children}
    </div>
  );
}
