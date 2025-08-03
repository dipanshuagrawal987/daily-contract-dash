import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Timer } from '@/components/Timer';
import { Navigation } from '@/components/Navigation';
import { MapPin, Gift, Crown, Gem } from 'lucide-react';
import gameMapBg from '@/assets/game-map-bg.jpg';
import treasureChest from '@/assets/treasure-chest.png';
import bonusGift from '@/assets/bonus-gift.png';

interface Task {
  id: string;
  title: string;
  duration: number;
}

export const GameMap: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('gameTasks');
    const savedCompletedTasks = localStorage.getItem('completedTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (savedCompletedTasks) {
      setCompletedTasks(JSON.parse(savedCompletedTasks));
    }
  }, []);

  useEffect(() => {
    // Check if all tasks are completed
    if (tasks.length > 0 && completedTasks.length === tasks.length) {
      setTimeout(() => {
        navigate('/great-job');
      }, 2000);
    }
  }, [completedTasks, tasks, navigate]);

  const handleTaskClick = (taskIndex: number) => {
    navigate(`/task/${taskIndex}`);
  };

  // Generate path positions for tasks
  const getTaskPosition = (index: number, total: number) => {
    const pathPositions = [
      { top: '75%', left: '15%' },
      { top: '60%', left: '35%' },
      { top: '40%', left: '55%' },
      { top: '25%', left: '75%' },
      { top: '15%', left: '85%' },
      { top: '10%', left: '70%' },
    ];
    return pathPositions[index] || pathPositions[0];
  };

  return (
    <div 
      className="min-h-screen relative bg-cover bg-center"
      style={{ backgroundImage: `url(${gameMapBg})` }}
    >
      <div className="absolute inset-0 bg-background/20" />
      <Timer />
      
      <div className="relative z-10 p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            <Crown className="h-10 w-10 inline text-game-gold mr-3" />
            Quest Map
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md">
            Navigate your journey and claim rewards!
          </p>
        </div>

        {/* Map Container */}
        <div className="relative max-w-6xl mx-auto h-[600px] rounded-lg overflow-hidden">
          
          {/* Task Nodes */}
          {tasks.map((task, index) => {
            const position = getTaskPosition(index, tasks.length);
            const isCompleted = completedTasks.includes(task.id);
            const isAccessible = index === 0 || completedTasks.includes(tasks[index - 1]?.id);
            
            return (
              <div
                key={task.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={position}
              >
                <Button
                  variant={isCompleted ? "success" : isAccessible ? "game" : "secondary"}
                  size="icon"
                  onClick={() => isAccessible && handleTaskClick(index)}
                  disabled={!isAccessible}
                  className="w-16 h-16 rounded-full text-xl font-bold relative group transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30 animate-pulse"
                >
                  T{index + 1}
                  
                  {/* Task tooltip */}
                  <Card className="absolute bottom-20 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 w-48">
                    <CardContent className="p-3 text-sm">
                      <div className="font-semibold">{task.title}</div>
                      <div className="text-muted-foreground">{task.duration} minutes</div>
                    </CardContent>
                  </Card>
                </Button>
                
                {/* Connection lines to next task */}
                {index < tasks.length - 1 && (
                  <div className="absolute top-1/2 left-1/2 w-24 h-0.5 bg-primary/60 transform rotate-45 origin-left" />
                )}
              </div>
            );
          })}

          {/* Bonus Rewards */}
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative group cursor-pointer">
              <img 
                src={bonusGift} 
                alt="Bonus Gift" 
                className="w-12 h-12 animate-bounce hover:scale-125 transition-all duration-300 hover:rotate-12 filter hover:brightness-110 hover:drop-shadow-lg"
              />
              <Card className="absolute bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 w-32">
                <CardContent className="p-2 text-xs text-center">
                  <Gift className="h-4 w-4 mx-auto mb-1 text-accent" />
                  Bonus Reward
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Hidden Treasure */}
          <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2">
            <div className="relative group cursor-pointer">
              <img 
                src={treasureChest} 
                alt="Hidden Treasure" 
                className="w-16 h-16 animate-pulse hover:scale-125 transition-all duration-500 hover:rotate-6 filter hover:brightness-125 hover:drop-shadow-xl hover:hue-rotate-15"
              />
              <Card className="absolute bottom-20 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 w-36">
                <CardContent className="p-2 text-xs text-center">
                  <Gem className="h-4 w-4 mx-auto mb-1 text-game-gold" />
                  Hidden Treasure
                  <div className="text-game-gold font-bold">500 Gold!</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Realistic Animated Fire Elements */}
          <div className="absolute top-1/4 left-1/4">
            <div className="relative">
              <div className="w-8 h-12 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 rounded-full animate-fire-flicker"></div>
              <div className="absolute top-0 left-1 w-6 h-10 bg-gradient-to-t from-orange-500 to-yellow-200 rounded-full animate-fire-dance opacity-80"></div>
              <div className="absolute -top-1 left-2 w-4 h-6 bg-yellow-300 rounded-full animate-fire-flicker opacity-60" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute top-2 left-3 w-1 h-1 bg-orange-400 rounded-full animate-ember-float"></div>
              <div className="absolute top-1 left-1 w-1 h-1 bg-red-400 rounded-full animate-ember-float" style={{ animationDelay: '0.8s' }}></div>
            </div>
          </div>
          <div className="absolute top-3/4 right-1/4">
            <div className="relative">
              <div className="w-6 h-10 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full animate-fire-flicker" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-0 left-1 w-4 h-8 bg-gradient-to-t from-orange-400 to-yellow-200 rounded-full animate-fire-dance opacity-70" style={{ animationDelay: '0.7s' }}></div>
              <div className="absolute top-1 left-2 w-1 h-1 bg-yellow-400 rounded-full animate-ember-float" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
          <div className="absolute bottom-1/4 left-1/3">
            <div className="relative">
              <div className="w-10 h-16 bg-gradient-to-t from-red-700 via-orange-500 to-yellow-300 rounded-full animate-fire-flicker" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-0 left-2 w-6 h-12 bg-gradient-to-t from-orange-500 to-yellow-200 rounded-full animate-fire-dance opacity-75" style={{ animationDelay: '1.2s' }}></div>
              <div className="absolute top-1 left-3 w-4 h-8 bg-gradient-to-t from-yellow-400 to-yellow-100 rounded-full animate-fire-flicker opacity-50" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute top-3 left-4 w-1 h-1 bg-orange-300 rounded-full animate-ember-float" style={{ animationDelay: '0.9s' }}></div>
              <div className="absolute top-2 left-1 w-1 h-1 bg-red-300 rounded-full animate-ember-float" style={{ animationDelay: '1.3s' }}></div>
            </div>
          </div>

          {/* Floating Magical Elements */}
          <div className="absolute top-10 left-10 animate-bounce delay-1000">
            <div className="w-3 h-3 bg-game-gold rounded-full opacity-60 animate-pulse" />
          </div>
          <div className="absolute top-20 right-20 animate-bounce delay-2000">
            <div className="w-2 h-2 bg-accent rounded-full opacity-80 animate-pulse" />
          </div>
          <div className="absolute bottom-20 left-1/3 animate-bounce delay-500">
            <div className="w-4 h-4 bg-primary rounded-full opacity-50 animate-pulse" />
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="max-w-md mx-auto mt-6 bg-card/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedTasks.length}/{tasks.length}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-gradient-success h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedTasks.length / tasks.length) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Navigation />
    </div>
  );
};