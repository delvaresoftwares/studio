import Image from "next/image";
import { cn } from "@/lib/utils";

const Logo = ({ className, simple, light, variant = 'arrow' }: {
  className?: string,
  simple?: boolean,
  light?: boolean,
  variant?: 'arrow' | 'header' | 'logo'
}) => {
  const src = variant === 'header'
    ? "/assets/arrow-transparent.png"
    : variant === 'logo'
      ? "/assets/logo.png"
      : "/assets/arrow.png";

  return (
    <div className={cn("flex items-center group", className)}>
      <div className={cn(
        "relative transition-all duration-500",
        simple ? "w-24 h-8" : "w-32 h-10",
        light && "brightness-0 invert opacity-90 group-hover:opacity-100"
      )}>
        <Image
          src={src}
          alt="Delvare"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default Logo;
