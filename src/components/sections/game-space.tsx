import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TicTacToe from "@/components/tic-tac-toe";
import SnakeGame from "@/components/snake-game";

const GameSpaceSection = () => {
    return (
        <section id="game-space" className="w-full flex flex-col items-center justify-center py-24 sm:py-32">
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
