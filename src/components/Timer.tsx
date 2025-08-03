import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pause, Play, Square } from 'lucide-react';

interface TimerProps {
  initialTime?: number;
  onStop?: () => void;
}

export const Timer: React.FC<TimerProps> = ({ initialTime = 0, onStop }) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true); // Auto-start timer

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

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

  return (
    <Card className="fixed top-4 right-4 z-50 p-4 bg-card/90 backdrop-blur-sm border-primary/20 animate-fade-in hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
      <div className="flex items-center gap-3">
        <div className="text-2xl font-bold text-primary animate-pulse">
          {formatTime(time)}
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsRunning(!isRunning)}
            className="hover:bg-primary/20 hover:scale-110 transition-all duration-200"
          >
            {isRunning ? <Pause className="h-4 w-4 animate-pulse" /> : <Play className="h-4 w-4 animate-bounce" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleStop}
            className="hover:bg-destructive/20 text-destructive hover:scale-110 transition-all duration-200"
          >
            <Square className="h-4 w-4 hover:animate-pulse" />
          </Button>
        </div>
      </div>
    </Card>
  );
};