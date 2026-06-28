import Image from "next/image";
import { cn } from "@/lib/utils";

const Logo = ({ className, simple, light, variant = 'arrow', glow, compact }: {
  className?: string,
  simple?: boolean,
  light?: boolean,
  variant?: 'arrow' | 'header' | 'logo',
  glow?: boolean,
  compact?: boolean
}) => {
  const src = variant === 'header'
    ? "/assets/arrow-transparent.png"
    : variant === 'logo'
      ? "/assets/logo.png"
      : "/assets/arrow.png";

  return (
    <div className={cn("flex items-center group", className)}>
      <div className={cn(
        "relative transition-all duration-500 flex items-center justify-center",
        simple ? "w-24 h-8" : "w-32 h-10",
        compact && "bg-primary rounded-full w-10 h-10",
        light && !compact && "brightness-0 invert opacity-90 group-hover:opacity-100",
        glow && "glow-primary rounded-full"
      )}>
        <Image
          src={src}
          alt="Delvare"
          fill={!compact}
          width={compact ? 20 : undefined}
          height={compact ? 20 : undefined}
          className={cn("object-contain", compact && "w-5 h-5")}
          priority
        />
      </div>
    </div>
  );
};

export default Logo;
