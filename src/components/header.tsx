'use client';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Features', href: '#features' },
  { name: 'Estimator', href: '#estimator' },
  { name: 'Game', href: '#game-space' },
];

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <a href="#hero">
          <Logo />
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
              {link.name}
            </a>
          ))}
        </nav>
        <Button asChild>
          <a href="#contact">Contact Us</a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
