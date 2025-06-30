import { Puzzle } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center justify-center h-10 w-10 bg-primary rounded-lg shadow-md">
      <Puzzle className="w-6 h-6 text-primary-foreground" />
    </div>
  );
};

export default Logo;
