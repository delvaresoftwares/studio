'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X, Circle, RotateCcw } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Player = 'X' | 'O';
type SquareValue = Player | null;
type Difficulty = 'easy' | 'hard' | 'impossible';

const Square = ({ value, onSquareClick }: { value: SquareValue; onSquareClick: () => void }) => {
  return (
    <button
      className="w-24 h-24 bg-secondary/50 rounded-lg flex items-center justify-center shadow-md transition-all duration-200 ease-in-out hover:bg-primary/20 backdrop-blur-sm"
      onClick={onSquareClick}
    >
      {value === 'X' && <X className="w-12 h-12 text-foreground transition-all duration-300 [text-shadow:0_0_8px_hsl(var(--foreground))]" />}
      {value === 'O' && <Circle className="w-12 h-12 text-primary transition-all duration-300 [text-shadow:0_0_8px_hsl(var(--primary))]" />}
    </button>
  );
};

const TicTacToe = () => {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [isPlayerNext, setIsPlayerNext] = useState(true);
  const [status, setStatus] = useState('Your turn!');
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('hard');

  const calculateWinner = (currentSquares: SquareValue[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (currentSquares[a] && currentSquares[a] === currentSquares[b] && currentSquares[a] === currentSquares[c]) {
        return currentSquares[a];
      }
    }
    return null;
  };

  const findBestMove = (currentSquares: SquareValue[], difficulty: Difficulty): number => {
    const player: Player = 'O';
    const opponent: Player = 'X';

    const getAvailableMoves = () => {
      return currentSquares.map((s, i) => s === null ? i : null).filter((v): v is number => v !== null);
    };

    // --- Easy: Picks a random available spot. Very beatable. ---
    if (difficulty === 'easy') {
      const availableMoves = getAvailableMoves();
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    // --- Logic for Hard & Impossible ---

    // Check for a winning move for AI ('O')
    for (let i = 0; i < 9; i++) {
      if (currentSquares[i] === null) {
        const nextSquares = [...currentSquares];
        nextSquares[i] = player;
        if (calculateWinner(nextSquares) === player) {
          return i;
        }
      }
    }

    // Block the opponent's ('X') winning move
    for (let i = 0; i < 9; i++) {
      if (currentSquares[i] === null) {
        const nextSquares = [...currentSquares];
        nextSquares[i] = opponent;
        if (calculateWinner(nextSquares) === opponent) {
          return i;
        }
      }
    }

    // --- Hard: After checking for immediate win/loss, picks a random spot. Beatable. ---
    if (difficulty === 'hard') {
      const availableMoves = getAvailableMoves();
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
    
    // --- Impossible: The rest of the logic for the unbeatable AI. ---
    // Try to take the center
    if (currentSquares[4] === null) {
      return 4;
    }

    // Try to take the opposite corner
    const opposites: { [key: number]: number } = { 0: 8, 2: 6, 6: 2, 8: 0 };
    for (const cornerStr in opposites) {
      const corner = parseInt(cornerStr, 10);
      const opposite = opposites[corner];
      if (currentSquares[corner] === opponent && currentSquares[opposite] === null) {
        return opposite;
      }
    }

    // Try to take an empty corner
    const corners = [0, 2, 6, 8];
    const emptyCorners = corners.filter(i => currentSquares[i] === null);
    if (emptyCorners.length > 0) {
      return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
    }

    // Try to take an empty side
    const sides = [1, 3, 5, 7];
    const emptySides = sides.filter(i => currentSquares[i] === null);
    if (emptySides.length > 0) {
      return emptySides[Math.floor(Math.random() * emptySides.length)];
    }

    // Fallback: take any available spot
    const availableMoves = getAvailableMoves();
    return availableMoves[0];
  };

  const handlePlayerClick = (i: number) => {
    if (gameOver || squares[i] || !isPlayerNext) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = 'X';
    setSquares(newSquares);
    setIsPlayerNext(false);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsPlayerNext(true);
    setGameOver(false);
    setStatus('Your turn!');
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    const isDraw = !winner && squares.every(Boolean);

    if (winner) {
      setStatus(winner === 'X' ? 'You Win!' : 'PC Wins!');
      setGameOver(true);
    } else if (isDraw) {
      setStatus("It's a Draw!");
      setGameOver(true);
    } else {
      setStatus(isPlayerNext ? 'Your turn!' : 'PC is thinking...');
    }

    // PC's turn
    if (!isPlayerNext && !winner && !isDraw) {
      const timeoutId = setTimeout(() => {
        const bestMove = findBestMove(squares, difficulty);
        if (bestMove !== undefined) {
            const newSquares = squares.slice();
            newSquares[bestMove] = 'O';
            setSquares(newSquares);
            setIsPlayerNext(true);
        }
      }, 700);

      return () => clearTimeout(timeoutId);
    }
  }, [squares, isPlayerNext, difficulty]);


  return (
    <div className="p-4 rounded-xl bg-card/60 border border-white/10 shadow-xl backdrop-blur-xl">
        <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-bold font-headline w-48">{status}</div>
            <Button variant="ghost" size="icon" onClick={resetGame}>
                <RotateCcw className="w-5 h-5" />
            </Button>
        </div>
         <Tabs 
          defaultValue={difficulty} 
          onValueChange={(value) => {
            setDifficulty(value as Difficulty);
            resetGame();
          }}
          className="mb-4 flex justify-center"
        >
          <TabsList>
            <TabsTrigger value="easy">Easy</TabsTrigger>
            <TabsTrigger value="hard">Hard</TabsTrigger>
            <TabsTrigger value="impossible">Impossible</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className={cn("grid grid-cols-3 gap-3", (gameOver || !isPlayerNext) && "pointer-events-none opacity-70")}>
            {squares.map((square, i) => (
                <Square key={i} value={square} onSquareClick={() => handlePlayerClick(i)} />
            ))}
        </div>
    </div>
  );
};

export default TicTacToe;
