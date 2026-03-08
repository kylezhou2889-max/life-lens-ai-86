import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

// AI 洞察 moved to last position
const tabs = [
  { id: 'goals',   label: '目标',    icon: '🎯' },
  { id: 'diary',   label: '日记',    icon: '📔' },
  { id: 'health',  label: '健康',    icon: '💪' },
  { id: 'assets',  label: '资产',    icon: '💰' },
  { id: 'travel',  label: '旅行',    icon: '✈️' },
  { id: 'insight', label: 'AI 洞察', icon: '✨' },
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
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex items-center justify-between h-14">
          <button
            className="font-display text-base font-bold italic text-foreground hover:text-muted-foreground transition-colors flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            🌸 人生纪念册
          </button>

          <div className="flex items-center gap-5">
            {currentUser && (
              <span className="font-body text-sm text-muted-foreground hidden md:block">{currentUser.name}</span>
            )}
            <button
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => { logout(); navigate('/'); }}
            >
              退出
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex gap-0 overflow-x-auto scrollbar-none">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex items-center gap-1.5 px-4 md:px-5 py-3 font-body text-sm whitespace-nowrap transition-all border-b-2 -mb-px',
                activeTab === tab.id
                  ? 'border-foreground text-foreground font-semibold'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              <span className="text-xs">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-12 py-10">
        {children}
      </main>
    </div>
  );
}
