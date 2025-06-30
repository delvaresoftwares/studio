import TicTacToe from "@/components/tic-tac-toe";

const GameSpaceSection = () => {
    return (
        <section id="game-space" className="h-screen w-full flex flex-col items-center justify-center snap-start">
            <div className="text-center mb-12 px-4">
                <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Game On!</h2>
                <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                    Take a break and play a game of Tic-Tac-Toe against the computer.
                </p>
            </div>
            <TicTacToe />
        </section>
    );
};

export default GameSpaceSection;
