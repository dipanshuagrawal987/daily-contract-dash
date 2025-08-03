import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer } from '@/components/Timer';
import { Navigation } from '@/components/Navigation';
import { User, Trophy, Star, Share2, Users, Award, Target, Clock } from 'lucide-react';
import { toast } from 'sonner';

export const Profile: React.FC = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(150);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTime, setTotalTime] = useState(120); // in minutes

  useEffect(() => {
    // Load user progress from localStorage
    const savedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    setCompletedTasks(savedCompletedTasks.length);
    
    // Calculate level based on completed tasks
    setLevel(Math.floor(savedCompletedTasks.length / 3) + 1);
  }, []);

  const handleShareWhatsApp = () => {
    const message = `🎮 Just completed ${completedTasks} tasks in my Work-Leisure Contract Game! I'm level ${level} with ${score} points! Join me in staying productive! 💪`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Shared to WhatsApp!');
  };

  const handleChallengeFriend = () => {
    const message = `🎯 Challenge Alert! I'm on level ${level} with ${score} points in the Work-Leisure Contract Game. Can you beat my score? Let's see who's more productive! 🏆`;
    navigator.share?.({
      title: 'Work-Leisure Contract Challenge',
      text: message,
    }).catch(() => {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(message);
      toast.success('Challenge copied to clipboard!');
    });
  };

  const getNextLevelXP = (currentLevel: number) => currentLevel * 100;
  const getCurrentLevelXP = (currentLevel: number) => (currentLevel - 1) * 100;
  const progressToNextLevel = ((score - getCurrentLevelXP(level)) / (getNextLevelXP(level) - getCurrentLevelXP(level))) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-6">
      <Timer />
      
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <User className="h-10 w-10 text-primary" />
            Player Profile
          </h1>
        </div>

        {/* Main Profile Card */}
        <Card className="backdrop-blur-sm bg-card/90 border-primary/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
              <User className="h-12 w-12 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Productivity Warrior</CardTitle>
            <div className="text-lg text-muted-foreground">Level {level} Player</div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Level Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Level Progress</span>
                <span className="text-sm text-muted-foreground">
                  {score}/{getNextLevelXP(level)} XP
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-4">
                <div 
                  className="bg-gradient-primary h-4 rounded-full transition-all duration-500 animate-shimmer"
                  style={{ width: `${Math.min(progressToNextLevel, 100)}%` }}
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-primary/10 text-center hover:scale-105 transition-all duration-300 animate-glow">
                <Trophy className="h-8 w-8 text-game-gold mx-auto mb-2 animate-fire-flicker" />
                <div className="text-2xl font-bold text-game-gold">{score}</div>
                <div className="text-sm text-muted-foreground">Total Score</div>
              </Card>
              
              <Card className="p-4 bg-accent/10 text-center hover:scale-105 transition-all duration-300 animate-glow">
                <Target className="h-8 w-8 text-accent mx-auto mb-2 animate-bounce" />
                <div className="text-2xl font-bold text-accent">{completedTasks}</div>
                <div className="text-sm text-muted-foreground">Tasks Done</div>
              </Card>
              
              <Card className="p-4 bg-game-success/10 text-center hover:scale-105 transition-all duration-300 animate-glow">
                <Clock className="h-8 w-8 text-game-success mx-auto mb-2 animate-pulse" />
                <div className="text-2xl font-bold text-game-success">{totalTime}m</div>
                <div className="text-sm text-muted-foreground">Focus Time</div>
              </Card>
              
              <Card className="p-4 bg-game-gold/10 text-center hover:scale-105 transition-all duration-300 animate-glow">
                <Star className="h-8 w-8 text-game-gold mx-auto mb-2 animate-pulse" />
                <div className="text-2xl font-bold text-game-gold">{level}</div>
                <div className="text-sm text-muted-foreground">Current Level</div>
              </Card>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Recent Achievements
              </h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                  <Trophy className="h-6 w-6 text-game-gold" />
                  <div>
                    <div className="font-semibold">First Task Master</div>
                    <div className="text-sm text-muted-foreground">Complete your first task</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                  <Star className="h-6 w-6 text-primary" />
                  <div>
                    <div className="font-semibold">Consistency King</div>
                    <div className="text-sm text-muted-foreground">Complete 3 tasks in a row</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg opacity-50">
                  <Clock className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <div className="font-semibold">Time Master</div>
                    <div className="text-sm text-muted-foreground">Focus for 2 hours total</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Actions */}
        <Card className="backdrop-blur-sm bg-card/90 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-6 w-6 text-primary" />
              Share Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Button
                variant="success"
                size="lg"
                onClick={handleShareWhatsApp}
                className="w-full"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share on WhatsApp
              </Button>
              
              <Button
                variant="gold"
                size="lg"
                onClick={handleChallengeFriend}
                className="w-full"
              >
                <Users className="h-5 w-5 mr-2" />
                Challenge a Friend
              </Button>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              Share your progress and inspire others to stay productive!
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Navigation />
    </div>
  );
};