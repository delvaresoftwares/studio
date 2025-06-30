import { Terminal } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Terminal className="w-8 h-8 text-primary" />
      <h1 className="text-2xl font-bold font-headline text-foreground">Delvare</h1>
    </div>
  );
};

export default Logo;
