'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X, Circle, RotateCcw } from 'lucide-react';

type Player = 'X' | 'O';
type SquareValue = Player | null;

const Square = ({ value, onSquareClick }: { value: SquareValue; onSquareClick: () => void }) => {
  return (
    <button
      className="w-24 h-24 bg-secondary/50 rounded-lg flex items-center justify-center shadow-md transition-all duration-200 ease-in-out hover:bg-primary/20 backdrop-blur-sm"
      onClick={onSquareClick}
    >
      {value === 'X' && <X className="w-12 h-12 text-foreground" />}
      {value === 'O' && <Circle className="w-12 h-12 text-primary" />}
    </button>
  );
};

const TicTacToe = () => {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [isPlayerNext, setIsPlayerNext] = useState(true);
  const [status, setStatus] = useState('Your turn!');
  const [gameOver, setGameOver] = useState(false);

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

  const findBestMove = (board: SquareValue[]): number => {
    // 1. Check if AI can win in the next move
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const tempBoard = [...board];
        tempBoard[i] = 'O';
        if (calculateWinner(tempBoard) === 'O') {
          return i;
        }
      }
    }

    // 2. Check if player can win in the next move, and block them
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const tempBoard = [...board];
        tempBoard[i] = 'X';
        if (calculateWinner(tempBoard) === 'X') {
          return i;
        }
      }
    }

    // 3. Try to take the center square
    if (board[4] === null) {
      return 4;
    }

    // 4. Try to take one of the corner squares
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => board[i] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // 5. Take any available side
    const sides = [1, 3, 5, 7];
    const availableSides = sides.filter(i => board[i] === null);
    if (availableSides.length > 0) {
      return availableSides[Math.floor(Math.random() * availableSides.length)];
    }

    // Fallback for any remaining square
    const availableSquares = board
      .map((value, index) => (value === null ? index : null))
      .filter((val): val is number => val !== null);
    
    return availableSquares[0];
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
        const bestMove = findBestMove(squares);
        if (bestMove !== undefined) {
            const newSquares = squares.slice();
            newSquares[bestMove] = 'O';
            setSquares(newSquares);
            setIsPlayerNext(true);
        }
      }, 700);

      return () => clearTimeout(timeoutId);
    }
  }, [squares, isPlayerNext]);


  return (
    <div className="p-4 rounded-xl bg-card/60 border border-white/10 shadow-xl backdrop-blur-lg">
        <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-bold font-headline w-48">{status}</div>
            <Button variant="ghost" size="icon" onClick={resetGame}>
                <RotateCcw className="w-5 h-5" />
            </Button>
        </div>
        <div className={cn("grid grid-cols-3 gap-3", (gameOver || !isPlayerNext) && "pointer-events-none opacity-70")}>
            {squares.map((square, i) => (
                <Square key={i} value={square} onSquareClick={() => handlePlayerClick(i)} />
            ))}
        </div>
    </div>
  );
};

export default TicTacToe;
