interface SkeletonProps {
  width: string;
  height: string;
}

export default function Skeleton({ width, height }: SkeletonProps) {
  return <div className={`bg-gray-300 dark:bg-gray-700 animate-pulse`} style={{ width, height }} />;
}
