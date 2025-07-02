'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const GameLoadingSkeleton = () => (
  <Card className="p-4 rounded-xl bg-card/60 backdrop-blur-md border border-border/20 shadow-xl w-[min(80vw,480px)] h-[min(80vw,580px)] flex items-center justify-center">
    <div className="text-center text-muted-foreground">
        <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
        <p>Loading Game...</p>
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
        <section id="game-space" className="w-full flex flex-col items-center justify-center py-24 sm:py-32 bg-secondary">
            <div className="text-center mb-12 px-4">
                <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Game On!</h2>
                <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                    Take a break and play a game. Choose your challenge below.
                </p>
            </div>
            <Tabs defaultValue="snake" className="w-full max-w-max flex flex-col items-center">
                <TabsList>
                    <TabsTrigger value="snake">Snake</TabsTrigger>
                    <TabsTrigger value="tictactoe">Tic-Tac-Toe</TabsTrigger>
                </TabsList>
                <TabsContent value="snake">
                    <SnakeGame />
                </TabsContent>
                <TabsContent value="tictactoe">
                    <TicTacToe />
                </TabsContent>
            </Tabs>
        </section>
    );
};

export default GameSpaceSection;
