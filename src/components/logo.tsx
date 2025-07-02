import { cn } from '@/lib/utils';

const Logo = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("transition-all hover:drop-shadow-[0_0_8px_hsl(var(--primary))]")}
    >
      <path
        d="M4 4L12 20L20 4L16 4L12 12L8 4L4 4Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Logo;
