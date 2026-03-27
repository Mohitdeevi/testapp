interface BadgeProps {
  text: string;
  color?: 'success' | 'warning' | 'error';
}

export default function Badge({ text, color = 'success' }: BadgeProps) {
  const colorClasses = {
    success: 'bg-success text-white',
    warning: 'bg-warning text-black',
    error: 'bg-error text-white',
  };

  return <span className={`px-2 py-1 rounded-full text-sm ${colorClasses[color]}`}>{text}</span>;
}
