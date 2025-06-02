import { useMemo } from 'react';
import Image from 'next/image';

interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-xl',
};

const backgroundColors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-indigo-500',
  'bg-pink-500',
  'bg-teal-500',
];

export default function Avatar({
  name,
  imageUrl,
  size = 'md',
  className = '',
}: AvatarProps) {
  const initials = useMemo(() => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [name]);

  const backgroundColor = useMemo(() => {
    const index = name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return backgroundColors[index % backgroundColors.length];
  }, [name]);

  return (
    <div
      className={`relative rounded-lg overflow-hidden ${sizeMap[size]} ${className}`}
    >
      {imageUrl ? (
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      ) : (
        <div
          className={`flex items-center justify-center w-full h-full ${backgroundColor} text-white font-medium`}
        >
          {initials}
        </div>
      )}
    </div>
  );
}
