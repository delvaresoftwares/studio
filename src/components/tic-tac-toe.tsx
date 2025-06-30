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
      className="w-24 h-24 bg-secondary rounded-lg flex items-center justify-center shadow-md transition-all duration-200 ease-in-out hover:bg-primary/20"
      onClick={onSquareClick}
    >
      {value === 'X' && <X className="w-12 h-12 text-foreground" />}
      {value === 'O' && <Circle className="w-12 h-12 text-primary" />}
    </button>
  );
};

const TicTacToe = () => {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('');

  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setStatus(`Winner: ${winner}`);
    } else if (squares.every(Boolean)) {
      setStatus('Draw!');
    } else {
      setStatus(`Next player: ${xIsNext ? 'X' : 'O'}`);
    }
  }, [squares, xIsNext]);

  function calculateWinner(squares: SquareValue[]) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <div className="p-4 rounded-xl bg-card border shadow-xl">
        <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-bold font-headline">{status}</div>
            <Button variant="ghost" size="icon" onClick={resetGame}>
                <RotateCcw className="w-5 h-5" />
            </Button>
        </div>
        <div className="grid grid-cols-3 gap-3">
            {squares.map((square, i) => (
                <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
            ))}
        </div>
    </div>
  );
};

export default TicTacToe;
