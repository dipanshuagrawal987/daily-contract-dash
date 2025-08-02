import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Timer } from '@/components/Timer';
import { Trophy, Star, Zap } from 'lucide-react';

export const ScorePage: React.FC = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Animate score counting up
    setTimeout(() => setShowAnimation(true), 500);
    const timer = setTimeout(() => {
      let currentScore = 0;
      const targetScore = 100;
      const increment = setInterval(() => {
        currentScore += 5;
        setScore(currentScore);
        if (currentScore >= targetScore) {
          clearInterval(increment);
        }
      }, 50);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigate('/map');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-6">
      <Timer />
      
      <Card className="max-w-md w-full text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-gold opacity-10" />
        
        <CardContent className="p-12 relative z-10">
          <div className={`transform transition-all duration-1000 ${showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            <Trophy className="h-24 w-24 text-game-gold mx-auto mb-6 animate-bounce" />
            
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Fantastic!
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              You've set up your daily contract
            </p>
            
            <div className="relative">
              <div className="text-8xl font-bold text-game-gold mb-4 animate-pulse">
                +{score}
              </div>
              
              <div className="flex justify-center gap-2 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-8 w-8 ${i < 3 ? 'text-game-gold fill-current' : 'text-muted-foreground'} animate-pulse`}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
              
              <div className="text-lg text-muted-foreground mb-8">
                <Zap className="h-5 w-5 inline text-primary mr-2" />
                Ready for your adventure?
              </div>
            </div>
            
            <Button
              variant="gold"
              size="xl"
              onClick={handleContinue}
              className="w-full animate-pulse"
            >
              Continue to Quest Map
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};