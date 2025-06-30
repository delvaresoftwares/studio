import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TicTacToe from "@/components/tic-tac-toe";
import SnakeGame from "@/components/snake-game";

const GameSpaceSection = () => {
    return (
        <section id="game-space" className="h-screen w-full flex flex-col items-center justify-center snap-start">
            <div className="text-center mb-12 px-4">
                <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Game Space</h2>
                <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                    Take a break and play a game!
                </p>
            </div>
            <Tabs defaultValue="tic-tac-toe" className="w-full max-w-md md:max-w-lg flex flex-col items-center">
                <TabsList>
                    <TabsTrigger value="tic-tac-toe">Tic-Tac-Toe</TabsTrigger>
                    <TabsTrigger value="snake">Snake</TabsTrigger>
                </TabsList>
                <TabsContent value="tic-tac-toe" className="mt-6 w-full flex justify-center">
                    <TicTacToe />
                </TabsContent>
                <TabsContent value="snake" className="mt-6 w-full flex justify-center">
                    <SnakeGame />
                </TabsContent>
            </Tabs>
        </section>
    );
};

export default GameSpaceSection;
