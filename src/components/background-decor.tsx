'use client';

const BackgroundDecor = () => {
  return (
    <div className="fixed inset-0 -z-50 h-full w-full bg-background pointer-events-none">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.2)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.2)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--primary)/0.1),transparent)]"></div>
    </div>
  );
};

export default BackgroundDecor;
