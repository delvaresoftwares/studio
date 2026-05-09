'use client';

import { useEffect, useState } from 'react';

const BackgroundDecor = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-50 h-full w-full bg-white pointer-events-none overflow-hidden" />
  );
};

export default BackgroundDecor;
