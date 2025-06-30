'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const GAME_SPEED = 200; // ms

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const getRandomPosition = (snake: Position[]): Position => {
    while (true) {
        const pos = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
        if (!snake.some(segment => segment.x === pos.x && segment.y === pos.y)) {
            return pos;
        }
    }
};

const SnakeGame = () => {
    const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
    const [food, setFood] = useState<Position>(INITIAL_FOOD);
    const [direction, setDirection] = useState<Direction>('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const resetGame = useCallback(() => {
        setSnake(INITIAL_SNAKE);
        setFood(getRandomPosition(INITIAL_SNAKE));
        setDirection('RIGHT');
        setGameOver(false);
        setScore(0);
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        e.preventDefault();
        switch (e.key) {
            case 'ArrowUp':
                if (direction !== 'DOWN') setDirection('UP');
                break;
            case 'ArrowDown':
                if (direction !== 'UP') setDirection('DOWN');
                break;
            case 'ArrowLeft':
                if (direction !== 'RIGHT') setDirection('LEFT');
                break;
            case 'ArrowRight':
                if (direction !== 'LEFT') setDirection('RIGHT');
                break;
        }
    }, [direction]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        if (gameOver) {
            return;
        }

        const gameInterval = setInterval(() => {
            const newSnake = [...snake];
            const head = { ...newSnake[0] };

            switch (direction) {
                case 'UP': head.y -= 1; break;
                case 'DOWN': head.y += 1; break;
                case 'LEFT': head.x -= 1; break;
                case 'RIGHT': head.x += 1; break;
            }

            // Wall collision
            if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                setGameOver(true);
                return;
            }

            // Self collision
            for (let i = 1; i < newSnake.length; i++) {
                if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
                    setGameOver(true);
                    return;
                }
            }

            newSnake.unshift(head);

            // Food collision
            if (head.x === food.x && head.y === food.y) {
                setScore(s => s + 1);
                setFood(getRandomPosition(newSnake));
            } else {
                newSnake.pop();
            }

            setSnake(newSnake);
        }, GAME_SPEED - score * 5 > 50 ? GAME_SPEED - score * 5 : 50); // Speed up as score increases

        return () => clearInterval(gameInterval);
    }, [snake, direction, gameOver, food, score]);

    return (
        <Card className="p-4 rounded-xl bg-card border shadow-xl w-auto">
             <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-bold font-headline">Score: {score}</div>
                <Button variant="ghost" size="icon" onClick={resetGame}>
                    <RotateCcw className="w-5 h-5" />
                </Button>
            </div>
            <div
                className="grid bg-secondary rounded-lg shadow-inner"
                style={{
                    gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                    width: 'min(80vw, 480px)',
                    height: 'min(80vw, 480px)',
                }}
            >
                {gameOver && (
                    <div
                        className="col-span-full row-span-full flex flex-col items-center justify-center bg-black/50 z-10"
                        style={{gridColumn: `1 / ${GRID_SIZE+1}`, gridRow: `1 / ${GRID_SIZE+1}`}}
                    >
                        <p className="text-4xl font-bold text-white">Game Over</p>
                        <Button onClick={resetGame} className="mt-4">Play Again</Button>
                    </div>
                )}
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                    const x = i % GRID_SIZE;
                    const y = Math.floor(i / GRID_SIZE);
                    const isSnake = snake.some(seg => seg.x === x && seg.y === y);
                    const isSnakeHead = snake[0].x === x && snake[0].y === y;
                    const isFood = food.x === x && food.y === y;
                    return (
                        <div
                            key={i}
                            className={cn(
                                'aspect-square',
                                isSnakeHead ? 'bg-primary rounded-sm' :
                                isSnake ? 'bg-primary/70 rounded-sm' :
                                isFood ? 'bg-destructive rounded-full' : ''
                            )}
                        />
                    );
                })}
            </div>
        </Card>
    );
};

export default SnakeGame;
