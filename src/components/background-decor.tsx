'use client';

const BackgroundDecor = () => {
  return (
    <div className="fixed inset-0 -z-50 h-full w-full bg-background pointer-events-none">
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      
      {/* Gradients */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--primary)/0.05),transparent)]"></div>
      <div className="absolute bottom-0 right-0 bg-[radial-gradient(circle_800px_at_80%_80%,hsl(var(--primary)/0.1),transparent_80%)]"></div>
      <div className="absolute top-0 left-0 bg-[radial-gradient(circle_600px_at_20%_30%,hsl(var(--accent-foreground)/0.08),transparent_80%)]"></div>
    </div>
  );
};

export default BackgroundDecor;
