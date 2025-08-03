import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pause, Play, Square, Move } from 'lucide-react';

interface TimerProps {
  initialTime?: number;
  onStop?: () => void;
}

interface Position {
  x: number;
  y: number;
}

export const Timer: React.FC<TimerProps> = ({ initialTime = 0, onStop }) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true); // Auto-start timer
  const [position, setPosition] = useState<Position>({ x: window.innerWidth - 200, y: 16 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const timerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Clamp position to viewport bounds
  const clampToViewport = (pos: Position): Position => {
    const timerWidth = 180; // approximate width
    const timerHeight = 80; // approximate height
    return {
      x: Math.max(8, Math.min(pos.x, window.innerWidth - timerWidth)),
      y: Math.max(8, Math.min(pos.y, window.innerHeight - timerHeight)),
    };
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
    onStop?.();
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === timerRef.current || timerRef.current?.contains(e.target as Node)) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newPosition = clampToViewport({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
      setPosition(newPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.target === timerRef.current || timerRef.current?.contains(e.target as Node)) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      e.preventDefault(); // Prevent scrolling
      const touch = e.touches[0];
      const newPosition = clampToViewport({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
      setPosition(newPosition);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Add global event listeners for drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragStart]);

  // Update position on window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => clampToViewport(prev));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Card 
      ref={timerRef}
      className={`fixed z-50 p-2 md:p-4 bg-card/95 backdrop-blur-sm border-primary/20 animate-fade-in transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 select-none cursor-move ${
        isDragging ? 'scale-105 shadow-2xl' : ''
      }`}
      style={{
        left: position.x,
        top: position.y,
        touchAction: 'none', // Prevent default touch behaviors
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex items-center gap-1">
          <Move className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground opacity-60" />
          <div className="text-base md:text-2xl font-bold text-primary animate-pulse">
            {formatTime(time)}
          </div>
        </div>
        <div className="flex gap-1 md:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation(); // Prevent drag when clicking buttons
              setIsRunning(!isRunning);
            }}
            className="h-8 w-8 md:h-10 md:w-10 hover:bg-primary/20 hover:scale-110 transition-all duration-200 touch-manipulation"
          >
            {isRunning ? <Pause className="h-3 w-3 md:h-4 md:w-4 animate-pulse" /> : <Play className="h-3 w-3 md:h-4 md:w-4 animate-bounce" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation(); // Prevent drag when clicking buttons
              handleStop();
            }}
            className="h-8 w-8 md:h-10 md:w-10 hover:bg-destructive/20 text-destructive hover:scale-110 transition-all duration-200 touch-manipulation"
          >
            <Square className="h-3 w-3 md:h-4 md:w-4 hover:animate-pulse" />
          </Button>
        </div>
      </div>
    </Card>
  );
};