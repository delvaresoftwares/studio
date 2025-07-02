'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Features', href: '#features' },
  { name: 'Estimator', href: '#estimator' },
  { name: 'Game', href: '#game-space' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-sm border-b border-white/10" : "bg-transparent border-b-transparent"
      )}>
        <div className="container mx-auto flex items-center justify-between h-20 px-4">
          <a href="#hero" className="flex items-center gap-3">
            <Logo />
            <span className="font-bold text-xl font-headline">Delvare</span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-full">
                {link.name}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <Button asChild>
              <a href="#contact">Contact Us</a>
            </Button>
            <ThemeToggle />
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(true)}>
              <Menu />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 z-50 bg-background/90 backdrop-blur-lg transition-transform duration-300 md:hidden",
        menuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="container mx-auto flex flex-col h-full">
          <div className="flex justify-between items-center h-20 px-4">
            <a href="#hero" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
              <Logo />
              <span className="font-bold text-xl font-headline">Delvare</span>
            </a>
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
              <X />
            </Button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-grow gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-2xl font-medium transition-colors hover:text-primary" onClick={() => setMenuOpen(false)}>
                {link.name}
              </a>
            ))}
            <Button asChild size="lg" className="mt-8">
              <a href="#contact" onClick={() => setMenuOpen(false)}>Contact Us</a>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
