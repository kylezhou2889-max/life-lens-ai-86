import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'goals', label: '目标', icon: '✦', step: '01' },
  { id: 'diary', label: '日记', icon: '📝', step: '02' },
  { id: 'insight', label: '洞察', icon: '◈', step: '03' },
  { id: 'health', label: '健康', icon: '💪', step: '' },
  { id: 'assets', label: '资产', icon: '◎', step: '' },
  { id: 'travel', label: '旅行', icon: '✈', step: '' },
];

interface LayoutProps {
  activeTab: string;
  onTabChange: (id: string) => void;
  children: React.ReactNode;
}

export default function MemoirLayout({ activeTab, onTabChange, children }: LayoutProps) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-secondary/40">
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-card">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
          <button
            className="font-display text-base font-semibold text-gradient-rose"
            onClick={() => navigate('/')}
          >
            人生纪念册
          </button>
          <div className="flex items-center gap-3">
            {currentUser && (
              <span className="font-body text-sm text-muted-foreground hidden md:block">
                {currentUser.name} 🌸
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="font-body text-muted-foreground text-xs"
              onClick={() => { logout(); navigate('/'); }}
            >
              退出
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-body whitespace-nowrap transition-all',
                activeTab === tab.id
                  ? 'gradient-cta text-primary-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {tab.step && (
                <span className={cn(
                  'text-[10px] px-1 py-0.5 rounded font-semibold',
                  activeTab === tab.id ? 'bg-white/20' : 'bg-primary/10 text-primary'
                )}>
                  {tab.step}
                </span>
              )}
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
