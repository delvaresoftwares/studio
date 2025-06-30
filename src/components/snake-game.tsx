'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { RotateCcw, Expand, Minimize, MousePointerClick } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
];
const GAME_SPEED = 100;

type Position = { x: number; y: number };

const SnakeGame = () => {
    const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
    const [food, setFood] = useState<Position | null>(null);
    const [path, setPath] = useState<Position[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('Click on the grid to place an apple!');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    const resetGame = useCallback(() => {
        setSnake(INITIAL_SNAKE);
        setFood(null);
        setPath([]);
        setGameOver(false);
        setScore(0);
        setMessage('Click on the grid to place an apple!');
    }, []);

    const findPath = useCallback((start: Position, end: Position, currentSnake: Position[]): Position[] | null => {
        const queue: { pos: Position; path: Position[] }[] = [{ pos: start, path: [] }];
        const visited = new Set<string>([`${start.x},${start.y}`]);
        const snakeBodyObstacles = new Set<string>(currentSnake.slice(0, -1).map(p => `${p.x},${p.y}`));

        while (queue.length > 0) {
            const { pos, path } = queue.shift()!;

            if (pos.x === end.x && pos.y === end.y) {
                return path;
            }

            const neighbors = [
                { x: pos.x, y: pos.y - 1 }, // UP
                { x: pos.x, y: pos.y + 1 }, // DOWN
                { x: pos.x - 1, y: pos.y }, // LEFT
                { x: pos.x + 1, y: pos.y }, // RIGHT
            ].sort(() => Math.random() - 0.5);

            for (const neighbor of neighbors) {
                const key = `${neighbor.x},${neighbor.y}`;
                if (
                    neighbor.x >= 0 && neighbor.x < GRID_SIZE &&
                    neighbor.y >= 0 && neighbor.y < GRID_SIZE &&
                    !visited.has(key) &&
                    !snakeBodyObstacles.has(key)
                ) {
                    visited.add(key);
                    const newPath = [...path, neighbor];
                    queue.push({ pos: neighbor, path: newPath });
                }
            }
        }
        return null;
    }, []);
    
    useEffect(() => {
        if (!food || gameOver) return;

        const newPath = findPath(snake[0], food, snake);

        if (newPath) {
            setPath(newPath);
            setMessage('Snake is on its way!');
        } else {
            setGameOver(true);
            setMessage('No path for the snake! Game Over.');
        }
    }, [food, snake, gameOver, findPath]);

    useEffect(() => {
        if (gameOver || path.length === 0 || !food) return;

        const gameInterval = setInterval(() => {
            setSnake(prevSnake => {
                const newSnake = [...prevSnake];
                const newHead = { ...path[0] };
                
                newSnake.unshift(newHead);

                if (newHead.x === food?.x && newHead.y === food?.y) {
                    setScore(s => s + 1);
                    setFood(null);
                    setPath([]);
                    setMessage('Yum! Place another apple.');
                } else {
                    newSnake.pop();
                }
                
                setPath(prevPath => prevPath.slice(1));
                
                return newSnake;
            });
        }, GAME_SPEED);

        return () => clearInterval(gameInterval);
    }, [path, food, gameOver]);
    
    const handleGridClick = (x: number, y: number) => {
        // This guard prevents placing a new apple while one is already on the board or the game is over.
        if (gameOver || food) return;

        const isSnakeBody = snake.some(segment => segment.x === x && segment.y === y);
        if (isSnakeBody) {
            setMessage('Cannot place an apple on the snake!');
            setTimeout(() => {
                // Revert message only if it hasn't changed (e.g., user hasn't successfully placed an apple elsewhere).
                setMessage(prev => prev === 'Cannot place an apple on the snake!' ? 'Click on the grid to place an apple!' : prev);
            }, 2000);
            return;
        }
        setFood({ x, y });
    };

    const toggleFullscreen = () => {
        if (!gameContainerRef.current) return;
        if (!document.fullscreenElement) {
            gameContainerRef.current.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    return (
        <Card ref={gameContainerRef} className="p-4 rounded-xl bg-card/60 border shadow-xl w-auto backdrop-blur-xl data-[fullscreen=true]:h-full data-[fullscreen=true]:w-full" data-fullscreen={isFullscreen}>
             <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-bold font-headline">Score: {score}</div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={toggleFullscreen} title="Toggle Fullscreen">
                        {isFullscreen ? <Minimize className="w-5 h-5" /> : <Expand className="w-5 h-5" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={resetGame} title="Reset Game">
                        <RotateCcw className="w-5 h-5" />
                    </Button>
                </div>
            </div>
            <div
                className={cn(
                    "grid bg-secondary rounded-lg shadow-inner relative",
                    !food && !gameOver && "cursor-pointer"
                )}
                style={{
                    gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                    width: isFullscreen ? 'calc(100vh - 120px)' : 'min(80vw, 480px)',
                    height: isFullscreen ? 'calc(100vh - 120px)' : 'min(80vw, 480px)',
                    margin: '0 auto',
                }}
            >
                {(gameOver || !food) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10 rounded-lg pointer-events-none">
                        <p className="text-2xl font-bold text-white text-center p-4">{message}</p>
                        {gameOver && <Button onClick={resetGame} className="mt-4 pointer-events-auto">Play Again</Button>}
                        {!gameOver && !food && <MousePointerClick className="w-10 h-10 text-white animate-pulse" />}
                    </div>
                )}
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                    const x = i % GRID_SIZE;
                    const y = Math.floor(i / GRID_SIZE);
                    const isSnake = snake.some(seg => seg.x === x && seg.y === y);
                    const isSnakeHead = snake[0].x === x && snake[0].y === y;
                    const isFood = food?.x === x && food?.y === y;
                    return (
                        <div
                            key={i}
                            className="aspect-square"
                            onClick={() => handleGridClick(x, y)}
                        >
                            <div
                                className={cn(
                                    'w-full h-full transition-colors duration-100',
                                    isSnakeHead ? 'bg-primary rounded-md scale-110' : '',
                                    isSnake ? 'bg-primary/70 rounded-sm' : '',
                                    isFood ? 'bg-destructive rounded-full animate-pulse' : '',
                                    !food && !gameOver && 'hover:bg-green-500/20'
                                )}
                            />
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default SnakeGame;
