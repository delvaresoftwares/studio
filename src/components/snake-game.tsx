'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { RotateCcw, Expand, Minimize, Apple } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
];
const GAME_SPEED = 100;

type Position = { x: number; y: number };

const PearIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
    <path d="M352,256c-23.6,0-44.5,12.1-55.8,30.6c-13.8-4.1-28.1-6.6-42.2-6.6c-14.1,0-28.4,2.5-42.2,6.6 C199.5,268.1,178.6,256,152,256C85.5,256,32,309.5,32,376c0,44.2,35.8,80,80,80h288c44.2,0,80-35.8,80-80 C480,309.5,426.5,256,352,256z" />
    <path d="M336,224c-17.7,0-32-14.3-32-32V64c0-35.3-28.7-64-64-64s-64,28.7-64,64v128c0,17.7-14.3,32-32,32s-32-14.3-32-32V96h32 V64h-32c0-17.7-14.3-32-32-32s-32,14.3-32,32v128c0,53,43,96,96,96h128c53,0,96-43,96-96V192c0-17.7-14.3-32-32-32s-32,14.3-32,32v32 H336z" />
  </svg>
);

const fruitTypes = [
  { type: 'apple', points: 1, icon: <Apple className="w-full h-full p-0.5 text-red-500" /> },
  { type: 'pear', points: 5, icon: <PearIcon className="w-full h-full p-0.5 text-yellow-400" /> }
];

type FoodItem = {
  position: Position;
  type: 'apple' | 'pear';
  points: number;
};


const SnakeGame = () => {
    const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
    const [food, setFood] = useState<FoodItem[]>([]);
    const [path, setPath] = useState<Position[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('Click on the grid to place apples!');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    const resetGame = useCallback(() => {
        setSnake(INITIAL_SNAKE);
        setFood([]);
        setPath([]);
        setGameOver(false);
        setScore(0);
        setMessage('Click on the grid to place apples!');
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

    const findPathToNearestFood = useCallback((start: Position, foods: FoodItem[], currentSnake: Position[]): Position[] | null => {
        let shortestPath: Position[] | null = null;
        for (const foodItem of foods) {
            const currentPath = findPath(start, foodItem.position, currentSnake);
            if (currentPath && (!shortestPath || currentPath.length < shortestPath.length)) {
                shortestPath = currentPath;
            }
        }
        return shortestPath;
    }, [findPath]);
    
    useEffect(() => {
        if (gameOver) return;

        if (food.length === 0) {
            setPath([]);
            setMessage('Click on the grid to place apples!');
            return;
        }

        const newPath = findPathToNearestFood(snake[0], food, snake);

        if (newPath) {
            setPath(newPath);
            setMessage('Snake is on its way!');
        } else {
            setPath([]);
            setGameOver(true);
            setMessage('No path for the snake! Game Over.');
        }
    }, [food, snake, gameOver, findPathToNearestFood]);

    useEffect(() => {
        if (gameOver || path.length === 0) return;

        const gameInterval = setInterval(() => {
            setSnake(prevSnake => {
                const newSnake = [...prevSnake];
                const newHead = { ...path[0] };
                
                newSnake.unshift(newHead);

                const foodIndex = food.findIndex(f => f.position.x === newHead.x && f.position.y === newHead.y);

                if (foodIndex !== -1) {
                    const eatenFood = food[foodIndex];
                    setScore(s => s + eatenFood.points);
                    setFood(prevFood => prevFood.filter((_, index) => index !== foodIndex));
                     for (let i = 0; i < eatenFood.points; i++) {
                        newSnake.push({ ...newSnake[newSnake.length - 1] });
                    }
                } else {
                    newSnake.pop();
                }
                
                setPath(prevPath => prevPath.slice(1));
                
                return newSnake;
            });
        }, GAME_SPEED);

        return () => clearInterval(gameInterval);
    }, [path, gameOver, food]);
    
    const handleGridClick = (x: number, y: number) => {
        if (gameOver) return;

        const isSnakeBody = snake.some(segment => segment.x === x && segment.y === y);
        if (isSnakeBody) {
            setMessage('Cannot place food on the snake!');
            return;
        }

        const isFoodHere = food.some(f => f.position.x === x && f.position.y === y);
        if (isFoodHere) {
            return;
        }

        const randomFruit = fruitTypes[Math.floor(Math.random() * fruitTypes.length)];
        const newFood: FoodItem = {
            position: { x, y },
            type: randomFruit.type as 'apple' | 'pear',
            points: randomFruit.points
        };

        setFood(prevFood => [...prevFood, newFood]);
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
        <Card ref={gameContainerRef} className="glass-card p-4 w-auto data-[fullscreen=true]:h-full data-[fullscreen=true]:w-full" data-fullscreen={isFullscreen}>
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
                    "grid bg-background/50 rounded-lg shadow-inner relative"
                )}
                style={{
                    gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                    width: isFullscreen ? 'calc(100vh - 150px)' : 'min(80vw, 480px)',
                    height: isFullscreen ? 'calc(100vh - 150px)' : 'min(80vw, 480px)',
                    margin: '0 auto',
                }}
            >
                {gameOver && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 rounded-lg">
                        <p className="text-2xl font-bold text-white text-center p-4">{message}</p>
                        <Button onClick={resetGame} className="mt-4">Play Again</Button>
                    </div>
                )}
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                    const x = i % GRID_SIZE;
                    const y = Math.floor(i / GRID_SIZE);
                    const isSnake = snake.some(seg => seg.x === x && seg.y === y);
                    const isSnakeHead = snake[0].x === x && snake[0].y === y;
                    const foodItem = food.find(f => f.position.x === x && f.position.y === y);
                    const fruitIcon = foodItem ? fruitTypes.find(ft => ft.type === foodItem.type)?.icon : null;

                    return (
                        <div
                            key={i}
                            className="aspect-square"
                            onClick={() => handleGridClick(x, y)}
                        >
                            {isSnake ? (
                                <div className={cn(
                                    'w-full h-full',
                                    isSnakeHead ? 'bg-primary rounded-md scale-110' : 'bg-primary/70 rounded-sm'
                                )} />
                            ) : foodItem ? (
                                <div className="w-full h-full animate-breath p-0.5">
                                   {fruitIcon}
                                </div>
                            ) : (
                                 <div className={cn('w-full h-full', !gameOver && 'cursor-pointer', !gameOver && 'hover:bg-green-500/20')} />
                            )}
                        </div>
                    );
                })}
            </div>
             <div className="text-center mt-4 font-medium text-muted-foreground">
                <p>{message}</p>
             </div>
        </Card>
    );
};

export default SnakeGame;
