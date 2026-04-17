'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Loader2, Gamepad2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const GameLoadingSkeleton = () => (
  <Card className="p-8 w-[min(90vw,520px)] h-[min(90vw,620px)] flex items-center justify-center border-border shadow-2xl rounded-[3rem] bg-white">
    <div className="text-center text-muted-foreground">
      <Loader2 className="w-14 h-14 animate-spin mx-auto mb-4 text-primary" />
      <p className="text-lg font-bold uppercase tracking-widest text-[10px]">Initializing Engine...</p>
    </div>
  </Card>
);

const SnakeGame = dynamic(() => import('@/components/snake-game'), {
  ssr: false,
  loading: () => <GameLoadingSkeleton />,
});

const TicTacToe = dynamic(() => import('@/components/tic-tac-toe'), {
  ssr: false,
  loading: () => <GameLoadingSkeleton />,
});

const GameSpaceSection = () => {
  return (
    <section id="game-space" className="w-full py-32 sm:py-48 flex flex-col items-center justify-center relative overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-primary/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="mb-20">
          <Badge variant="outline" className="mb-8 border-border py-1.5 px-5 text-[10px] font-black tracking-[0.3em] uppercase text-muted-foreground">
            Recreation
          </Badge>
          <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter mb-10 text-foreground leading-none">
            Binary <br />
            <span className="text-muted-foreground font-light italic tracking-tight">Leisure.</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-muted-foreground/90 leading-relaxed font-medium italic">
            "Strategic pause. Engage with our legacy logic modules during runtime intermission."
          </p>
        </div>

        <Tabs defaultValue="snake" className="w-full max-w-max mx-auto flex flex-col items-center">
          <TabsList className="bg-secondary/50 border border-border p-1.5 h-16 rounded-2xl mb-12">
            <TabsTrigger value="snake" className="px-10 h-full text-[10px] font-black uppercase tracking-widest rounded-xl data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
              Snake Engine
            </TabsTrigger>
            <TabsTrigger value="tictactoe" className="px-10 h-full text-[10px] font-black uppercase tracking-widest rounded-xl data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
              Tic-Tac-Toe
            </TabsTrigger>
          </TabsList>
          <TabsContent value="snake" className="mt-0 focus-visible:outline-none">
            <div className="animate-fade-in-up">
              <SnakeGame />
            </div>
          </TabsContent>
          <TabsContent value="tictactoe" className="mt-0 focus-visible:outline-none">
            <div className="animate-fade-in-up">
              <TicTacToe />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default GameSpaceSection;
