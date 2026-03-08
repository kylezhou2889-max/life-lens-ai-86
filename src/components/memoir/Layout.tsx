import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'goals', label: '🎯 目标', step: '01' },
  { id: 'diary', label: '📝 日记', step: '02' },
  { id: 'insight', label: '✨ AI 分析', step: '03' },
  { id: 'health', label: '💪 健康', step: '' },
  { id: 'assets', label: '💰 资产', step: '' },
  { id: 'travel', label: '🗺 旅行', step: '' },
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
    <div className="min-h-screen bg-secondary/30">
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border shadow-card">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <button
            className="text-base font-bold bg-clip-text text-transparent"
            style={{ backgroundImage: 'var(--gradient-cta)' }}
            onClick={() => navigate('/')}
          >
            我的人生纪念册
          </button>

          <div className="flex items-center gap-3">
            {currentUser && (
              <span className="text-sm text-muted-foreground hidden md:block">
                {currentUser.name} 🌸
              </span>
            )}
            <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => { logout(); navigate('/'); }}>
              退出
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
                activeTab === tab.id
                  ? 'gradient-cta text-white shadow-soft'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {tab.step && (
                <span className={cn(
                  'text-xs px-1.5 py-0.5 rounded-md font-bold',
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
                )}>
                  {tab.step}
                </span>
              )}
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
