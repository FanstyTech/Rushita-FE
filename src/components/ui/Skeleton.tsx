import { twMerge } from 'tailwind-merge';

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={twMerge('animate-pulse rounded-md bg-gray-200', className)}
      role="status"
      aria-label="Loading..."
    />
  );
}
