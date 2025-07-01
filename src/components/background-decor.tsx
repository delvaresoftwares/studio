'use client';

const BackgroundDecor = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background pointer-events-none">
      <div className="absolute top-0 left-0 h-full w-full">
        <span
          className="absolute top-[10%] left-[5%] h-32 w-32 rounded-full bg-primary/5 blur-3xl animate-float"
          style={{ animationDuration: '10s', animationDelay: '0s' }}
        ></span>
        <span
          className="absolute bottom-[20%] right-[10%] h-48 w-48 rounded-lg bg-accent/5 blur-3xl animate-float"
          style={{ animationDuration: '12s', animationDelay: '1s' }}
        ></span>
        <span
          className="absolute top-[30%] right-[30%] h-16 w-32 rounded-full bg-secondary/10 blur-2xl animate-float"
          style={{ animationDuration: '15s', animationDelay: '2s' }}
        ></span>
        <span
          className="absolute bottom-[5%] left-[15%] h-24 w-24 rounded-lg bg-primary/10 blur-3xl animate-float"
          style={{ animationDuration: '8s', animationDelay: '3s' }}
        ></span>
        <span
          className="absolute top-[55%] left-[45%] h-40 w-40 rounded-full bg-accent/5 blur-3xl animate-float"
          style={{ animationDuration: '14s', animationDelay: '4s' }}
        ></span>
      </div>
    </div>
  );
};

export default BackgroundDecor;
