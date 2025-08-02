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
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex gap-2 p-2 bg-card/90 backdrop-blur-sm rounded-full border border-primary/20">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Button
            key={path}
            variant={location.pathname === path ? "game" : "ghost"}
            size="icon"
            onClick={() => navigate(path)}
            className="rounded-full"
            title={label}
          >
            <Icon className="h-4 w-4" />
          </Button>
        ))}
      </div>
    </div>
  );
};