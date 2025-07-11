'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const BackgroundDecor = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // On the server, or before hydration, we don't know the theme.
    // Render nothing to avoid a flash of incorrect background.
    return null;
  }

  // Common structure for both themes
  return (
    <div className="fixed inset-0 -z-50 h-full w-full bg-background pointer-events-none overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.05)_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>

      {/* Theme-specific overlays and gradients */}
      {resolvedTheme === 'light' ? (
        <>
          {/* Light Theme Aurora */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div
            className="absolute -top-1/4 -left-1/4 w-2/3 h-2/3 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-pulse"
            style={{ animationDuration: '20s' }}
          />
          <div
            className="absolute -bottom-1/3 -right-1/4 w-3/4 h-3/4 bg-accent/10 rounded-full filter blur-3xl opacity-60 animate-pulse"
            style={{ animationDuration: '22s', animationDelay: '3s' }}
          />
          <div
            className="absolute bottom-1/4 left-1/4 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-2xl opacity-40 animate-pulse"
            style={{ animationDuration: '18s', animationDelay: '2s' }}
          />
        </>
      ) : (
        <>
          {/* Dark Theme Aurora */}
          <div className="absolute inset-0 bg-background/80" />
          <div
            className="absolute -top-1/3 -left-1/4 w-2/3 h-2/3 bg-primary/10 rounded-full filter blur-3xl opacity-40 animate-pulse"
            style={{ animationDuration: '15s' }}
          />
          <div
            className="absolute -bottom-1/2 -right-1/4 w-3/4 h-3/4 bg-accent/10 rounded-full filter blur-3xl opacity-30 animate-pulse"
            style={{ animationDuration: '18s', animationDelay: '3s' }}
          />
          <div
            className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full filter blur-2xl opacity-20 animate-pulse"
            style={{ animationDuration: '20s', animationDelay: '1s' }}
          />
          <div
            className="absolute bottom-1/4 left-1/4 w-1/3 h-1/3 bg-accent/10 rounded-full filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDuration: '16s', animationDelay: '5s' }}
          />
        </>
      )}
    </div>
  );
};

export default BackgroundDecor;
