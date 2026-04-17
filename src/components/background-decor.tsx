'use client';

import { useEffect, useState } from 'react';

const BackgroundDecor = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-50 h-full w-full bg-[#fdfdfd] pointer-events-none overflow-hidden">
      {/* High-end architectual grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.4]"></div>

      {/* Sophisticated Atmosphere */}
      <div
        className="absolute -top-1/4 -left-1/4 w-2/3 h-2/3 bg-slate-100 rounded-full filter blur-[120px] opacity-40 motion-safe:animate-pulse"
        style={{ animationDuration: '25s' }}
      />
      <div
        className="absolute -bottom-1/3 -right-1/4 w-3/4 h-3/4 bg-primary/[0.03] rounded-full filter blur-[150px] opacity-50 motion-safe:animate-pulse"
        style={{ animationDuration: '30s', animationDelay: '5s' }}
      />

      {/* Horizontal divider lines for editorial feel */}
      <div className="absolute top-[20%] left-0 w-full h-px bg-slate-100 opacity-20" />
      <div className="absolute top-[50%] left-0 w-full h-px bg-slate-100 opacity-20" />
      <div className="absolute top-[80%] left-0 w-full h-px bg-slate-100 opacity-20" />
    </div>
  );
};

export default BackgroundDecor;
