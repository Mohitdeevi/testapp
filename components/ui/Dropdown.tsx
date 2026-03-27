import { ReactNode, useState } from 'react';

interface DropdownProps {
  label: string;
  children: ReactNode;
}

export default function Dropdown({ label, children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 bg-primary text-white rounded-lg">
        {label}
      </button>
      {isOpen && <div className="absolute mt-2 bg-white dark:bg-neutral rounded-lg shadow-lg">{children}</div>}
    </div>
  );
}
