const Logo = () => {
  return (
    <div className="flex items-center gap-3 group cursor-pointer select-none">
      <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12">
        {/* Layer 0: Ambient Blur (Behind) */}
        <div className="absolute inset-0 bg-emerald-500/30 blur-xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Layer 1: The Mark */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-3"
        >
          {/* Base Shape - Darker Depth */}
          <path
            d="M30 20 H60 C80 20 90 35 90 50 C90 65 80 80 60 80 H30 L30 20 Z"
            fill="url(#depth-gradient)"
            className="opacity-90"
          />

          {/* Overlay Shape - Glass Effect */}
          <path
            d="M30 20 H60 C80 20 90 35 90 50 C90 65 80 80 60 80 H30"
            stroke="url(#rim-gradient)"
            strokeWidth="3"
            fill="none"
            className="opacity-80"
          />

          {/* Abstract Tech Line */}
          <path
            d="M45 35 L45 65"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            className="opacity-90"
          />
          <path
            d="M60 42 L60 58"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            className="opacity-60"
          />

          {/* Accent Dot */}
          <circle cx="75" cy="50" r="4" fill="#6ee7b7" className="animate-pulse" />

          <defs>
            <linearGradient id="depth-gradient" x1="20" y1="20" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="rim-gradient" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1.5 relative">
          <span className="text-2xl md:text-3xl font-black tracking-tight text-foreground font-headline group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-500 transition-all duration-300">
            DELVARE
          </span>
          <span className="relative overflow-hidden text-[10px] md:text-xs font-bold text-emerald-950 bg-emerald-400 px-1.5 py-0.5 rounded-sm tracking-widest shadow-[0_0_10px_rgba(52,211,153,0.5)]">
            <span className="relative z-10">.IN</span>
            <div className="absolute inset-0 bg-white/30 skew-x-12 translate-x-[-150%] group-hover:animate-shine" />
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-[1px] w-0 bg-emerald-500 group-hover:w-8 transition-all duration-500 rounded-full" />
          <span className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] group-hover:text-emerald-500/80 transition-colors duration-300">
            Business Solutions
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
