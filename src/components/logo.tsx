interface LogoProps {
  simple?: boolean;
  className?: string;
  color?: string;
}

const Logo = ({ simple = false, className = "", color }: LogoProps) => {
  return (
    <div className={`flex flex-col items-center group cursor-pointer select-none py-2 transition-transform duration-300 hover:scale-[1.02] ${className}`}>
      <svg
        width={simple ? "140" : "180"}
        height={simple ? "80" : "140"}
        viewBox={simple ? "0 60 200 100" : "0 0 200 160"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Full Triangle - Hidden in simple mode */}
        {!simple && (
          <>
            {/* Top Frame: Single continuous path for perfect corners */}
            <path
              d="M20 20 H180 L125 95 M20 20 L75 95"
              stroke={color || "currentColor"}
              strokeWidth="7"
              strokeLinejoin="round"
              strokeLinecap="round"
              className={!color ? "text-foreground dark:text-[#FBFF00] transition-colors duration-300" : ""}
            />
          </>
        )}

        {/* The 'V' Apex (Always visible, forms the letter V) */}
        <path
          d="M87 110 L100 130 L113 110"
          stroke={color || "currentColor"}
          strokeWidth="8"
          strokeLinejoin="miter"
          strokeLinecap="round"
          className={!color ? "text-foreground dark:text-[#FBFF00] transition-colors duration-300" : ""}
        />

        {/* Wordmark: DEL [V] ARE */}
        <text
          x="35"
          y="128"
          className={`font-headline font-black text-[28px] uppercase tracking-[-0.02em] transition-colors duration-300 ${color ? "" : "fill-foreground dark:fill-white"}`}
          fill={color || "currentColor"}
        >
          DEL
        </text>
        <text
          x="115"
          y="128"
          className={`font-headline font-black text-[28px] uppercase tracking-[-0.02em] transition-colors duration-300 ${color ? "" : "fill-foreground dark:fill-white"}`}
          fill={color || "currentColor"}
        >
          ARE
        </text>

        {/* Subtext Branding */}
        <text
          x="100"
          y="155"
          textAnchor="middle"
          className={`font-bold text-[11px] uppercase tracking-[0.5em] transition-all duration-300 ${color ? "" : "fill-muted-foreground"}`}
          fill={color || "currentColor"}
        >
          IT SOLUTIONS
        </text>
      </svg>
    </div>
  );
};

export default Logo;
