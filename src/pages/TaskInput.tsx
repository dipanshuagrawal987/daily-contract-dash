import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Timer } from '@/components/Timer';
import { Navigation } from '@/components/Navigation';
import { Plus, Target, Clock } from 'lucide-react';
import { toast } from 'sonner';
import taskWorkspaceBg from '@/assets/task-workspace-bg.jpg';

interface Task {
  id: string;
  title: string;
  duration: number; // in minutes
}

export const TaskInput: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: '', duration: 30 }
  ]);

  const addTask = () => {
    if (tasks.length < 6) {
      setTasks([...tasks, { 
        id: Date.now().toString(), 
        title: '', 
        duration: 30 
      }]);
    } else {
      toast.error('Maximum 6 tasks allowed!');
    }
  };

  const updateTask = (id: string, field: 'title' | 'duration', value: string | number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, [field]: value } : task
    ));
  };

  const removeTask = (id: string) => {
    if (tasks.length > 1) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const handleSubmit = () => {
    const validTasks = tasks.filter(task => task.title.trim() !== '');
    if (validTasks.length === 0) {
      toast.error('Please add at least one task!');
      return;
    }
    
    localStorage.setItem('gameTasks', JSON.stringify(validTasks));
    toast.success('Tasks saved! Starting your journey...');
    navigate('/score');
  };

  return (
    <div 
      className="min-h-screen p-4 md:p-6 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${taskWorkspaceBg})` }}
    >
      <div className="absolute inset-0 bg-background/80" />
      <Timer />
      
      <div className="relative z-10 max-w-4xl mx-auto pb-24 md:pb-6">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-2 md:gap-3">
            <Target className="h-6 w-6 md:h-10 md:w-10 text-primary" />
            Unbussy
          </h1>
          <p className="text-base md:text-xl text-muted-foreground px-4">
            Set your daily tasks and time commitments
          </p>
        </div>

        <Card className="backdrop-blur-md bg-card/30 border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              Your Tasks & Time Commitments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {tasks.map((task, index) => (
              <div key={task.id} className="space-y-3 md:grid md:grid-cols-12 md:gap-4 md:items-end md:space-y-0">
                {/* Mobile: Full width layout */}
                <div className="md:col-span-1 flex items-center gap-3 md:block md:text-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    T{index + 1}
                  </div>
                  <span className="md:hidden text-sm font-medium text-muted-foreground">Task {index + 1}</span>
                </div>
                
                <div className="md:col-span-7">
                  <Label htmlFor={`task-${task.id}`} className="text-foreground text-sm">
                    Task Description
                  </Label>
                  <Input
                    id={`task-${task.id}`}
                    placeholder={`Enter task ${index + 1}...`}
                    value={task.title}
                    onChange={(e) => updateTask(task.id, 'title', e.target.value)}
                    className="mt-2 bg-background/50 text-base md:text-sm"
                  />
                </div>
                
                <div className="flex gap-2 md:col-span-4 md:gap-4">
                  <div className="flex-1 md:col-span-3">
                    <Label htmlFor={`duration-${task.id}`} className="text-foreground text-sm">
                      Duration (min)
                    </Label>
                    <Input
                      id={`duration-${task.id}`}
                      type="number"
                      min="5"
                      max="480"
                      value={task.duration}
                      onChange={(e) => updateTask(task.id, 'duration', parseInt(e.target.value) || 30)}
                      className="mt-2 bg-background/50 text-base md:text-sm"
                    />
                  </div>
                  
                  <div className="flex items-end md:col-span-1">
                    {tasks.length > 1 && (
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeTask(task.id)}
                        className="h-10 w-10 text-lg"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 pt-4">
              <Button
                variant="outline"
                onClick={addTask}
                disabled={tasks.length >= 6}
                className="md:flex-1 h-12 text-base"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task ({tasks.length}/6)
              </Button>
              
              <Button
                variant="game"
                size="xl"
                onClick={handleSubmit}
                className="md:flex-1 h-12 text-base md:text-lg hover:scale-105 md:hover:scale-110 transition-all duration-300 animate-glow hover:shadow-lg hover:shadow-primary/30"
              >
                <Target className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3 animate-bounce" />
                Start Game Journey!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Navigation />
    </div>
  );
};