'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Features', href: '#features' },
  { name: 'Estimator', href: '#estimator' },
  { name: 'Game', href: '#game-space' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-background/80 backdrop-blur-sm border-b" : "bg-transparent border-b-transparent"
    )}>
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <a href="#hero" className="flex items-center gap-3">
          <Logo />
          <span className="font-bold text-xl font-headline">Delvare</span>
        </a>
        <nav className="hidden md:flex items-center gap-1 bg-background/50 border rounded-full p-1 shadow-sm">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-full hover:bg-accent">
              {link.name}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild>
            <a href="#contact">Contact Us</a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
