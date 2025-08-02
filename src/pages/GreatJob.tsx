import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Star, Gift, RefreshCw, Home } from 'lucide-react';

export const GreatJob: React.FC = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    // Auto-redirect after celebration
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleNewDay = () => {
    // Clear completed tasks for new day
    localStorage.removeItem('completedTasks');
    navigate('/');
  };

  const handleRelax = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-gold/20 via-accent/10 to-primary/20 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <Star className="h-4 w-4 text-game-gold opacity-70" />
            </div>
          ))}
        </div>
      )}
      
      <Card className="max-w-lg w-full text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-gold opacity-20" />
        
        <CardContent className="p-12 relative z-10">
          {/* Main Trophy */}
          <div className="mb-8">
            <Trophy className="h-32 w-32 text-game-gold mx-auto mb-6 animate-pulse" />
            
            <h1 className="text-5xl font-bold text-foreground mb-4 animate-bounce">
              Great Job!
            </h1>
            
            <div className="text-2xl font-bold text-game-gold mb-2">
              +30 Bonus Points
            </div>
            
            <p className="text-xl text-muted-foreground mb-6">
              Time to Relax & Recharge
            </p>
          </div>

          {/* Achievement Summary */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center gap-4 p-4 bg-accent/10 rounded-lg">
              <Gift className="h-8 w-8 text-accent" />
              <div className="text-left">
                <div className="font-bold text-lg">Daily Goal Achieved!</div>
                <div className="text-sm text-muted-foreground">All tasks completed successfully</div>
              </div>
            </div>
            
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="h-8 w-8 text-game-gold fill-current animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              variant="success"
              size="xl"
              onClick={handleRelax}
              className="w-full"
            >
              <Gift className="h-5 w-5 mr-2" />
              Enjoy Your Break!
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={handleNewDay}
              className="w-full"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Start New Day
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="w-full"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>

          {/* Motivational Quote */}
          <div className="mt-8 p-4 bg-primary/10 rounded-lg">
            <p className="text-sm italic text-muted-foreground">
              "Success is the sum of small efforts repeated day in and day out."
            </p>
            <p className="text-xs text-muted-foreground mt-2">- Robert Collier</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};