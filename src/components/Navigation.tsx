import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Map, User, Trophy } from 'lucide-react';

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Tasks' },
    { path: '/map', icon: Map, label: 'Map' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/great-job', icon: Trophy, label: 'Victory' },
  ];

  return (
    <div className="fixed bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm px-4 md:px-0 md:w-auto">
      <div className="flex justify-center gap-1 md:gap-2 p-2 md:p-3 bg-card/95 backdrop-blur-sm rounded-full border border-primary/20 shadow-lg">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Button
            key={path}
            variant={location.pathname === path ? "game" : "ghost"}
            size="icon"
            onClick={() => navigate(path)}
            className="rounded-full h-12 w-12 md:h-10 md:w-10 touch-manipulation transition-all duration-200 active:scale-95"
            title={label}
          >
            <Icon className="h-5 w-5 md:h-4 md:w-4" />
            <span className="sr-only">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};