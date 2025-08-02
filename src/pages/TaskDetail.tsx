import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer } from '@/components/Timer';
import { Navigation } from '@/components/Navigation';
import { Target, Clock, Trophy, Zap, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Task {
  id: string;
  title: string;
  duration: number;
}

export const TaskDetail: React.FC = () => {
  const { taskIndex } = useParams<{ taskIndex: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [taskTimer, setTaskTimer] = useState(0);
  const [isTaskRunning, setIsTaskRunning] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('gameTasks');
    if (savedTasks && taskIndex) {
      const tasks = JSON.parse(savedTasks);
      const currentTask = tasks[parseInt(taskIndex)];
      setTask(currentTask);
      setTaskTimer(currentTask.duration * 60); // Convert minutes to seconds
    }
  }, [taskIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTaskRunning && taskTimer > 0) {
      interval = setInterval(() => {
        setTaskTimer(prev => {
          if (prev <= 1) {
            setIsTaskRunning(false);
            handleTaskComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTaskRunning, taskTimer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReady = () => {
    setIsReady(true);
    setIsTaskRunning(true);
    toast.success('Task started! Focus time begins now!');
  };

  const handleTaskComplete = () => {
    toast.success('Task completed! Well done!');
    // Save completion status
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    if (task && !completedTasks.includes(task.id)) {
      completedTasks.push(task.id);
      localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
    
    // Navigate back to map after a delay
    setTimeout(() => {
      navigate('/map');
    }, 2000);
  };

  const handleSkip = () => {
    navigate('/map');
  };

  if (!task) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-6 flex items-center justify-center">
      <Timer />
      
      <div className="max-w-2xl w-full">
        {!isReady ? (
          // Pre-task screen
          <Card className="text-center backdrop-blur-sm bg-card/90 border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
                <Target className="h-8 w-8 text-primary" />
                Task {parseInt(taskIndex!) + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="text-xl text-muted-foreground">
                Let's Complete:
              </div>
              
              <div className="text-2xl font-bold text-foreground p-4 bg-primary/10 rounded-lg">
                {task.title}
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <Card className="p-4 bg-accent/10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="h-6 w-6 text-accent" />
                    <span className="font-semibold">Duration</span>
                  </div>
                  <div className="text-2xl font-bold text-accent">
                    {task.duration} min
                  </div>
                </Card>
                
                <Card className="p-4 bg-game-gold/10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy className="h-6 w-6 text-game-gold" />
                    <span className="font-semibold">Reward</span>
                  </div>
                  <div className="text-2xl font-bold text-game-gold">
                    +50 XP
                  </div>
                </Card>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Level Objectives:
                </h3>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-game-success" />
                    Stay focused for the entire duration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-game-success" />
                    Avoid digital distractions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-game-success" />
                    Complete the task fully
                  </li>
                </ul>
              </div>
              
              <Button
                variant="game"
                size="xl"
                onClick={handleReady}
                className="w-full animate-pulse"
              >
                I'm Ready! Start Timer
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Active task screen
          <Card className="text-center backdrop-blur-sm bg-card/90 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">
                Task in Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="text-lg text-muted-foreground">
                Current Task:
              </div>
              
              <div className="text-xl font-bold text-foreground">
                {task.title}
              </div>
              
              {/* Large Timer Display */}
              <div className="relative">
                <div className="text-8xl font-bold text-primary mb-4">
                  {formatTime(taskTimer)}
                </div>
                
                {/* Progress Ring */}
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-muted"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (taskTimer / (task.duration * 60))}`}
                      className="text-primary transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="h-8 w-8 text-primary animate-pulse" />
                  </div>
                </div>
              </div>
              
              <div className="text-lg text-muted-foreground mb-6">
                Stay focused! You're doing great!
              </div>
              
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={handleSkip}
                  className="flex-1"
                >
                  Skip Task
                </Button>
                
                <Button
                  variant="success"
                  onClick={handleTaskComplete}
                  className="flex-1"
                >
                  Complete Early
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Navigation />
    </div>
  );
};