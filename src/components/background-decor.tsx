'use client';

const BackgroundDecor = () => {
  return (
    <div className="fixed inset-0 -z-50 h-full w-full bg-background pointer-events-none overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.05)_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>

      {/* Gradients */}
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
    </div>
  );
};

export default BackgroundDecor;
