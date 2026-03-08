import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'goals', label: '目标', step: '01' },
  { id: 'diary', label: '日记', step: '02' },
  { id: 'insight', label: 'AI 洞察', step: '03' },
  { id: 'health', label: '健康', step: '' },
  { id: 'assets', label: '资产', step: '' },
  { id: 'travel', label: '旅行', step: '' },
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
      {/* Minimal top bar */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex items-center justify-between h-14">
          <button
            className="font-display text-sm italic text-foreground hover:text-muted-foreground transition-colors"
            onClick={() => navigate('/')}
          >
            人生纪念册
          </button>

          <div className="flex items-center gap-5">
            {currentUser && (
              <span className="label-sm text-muted-foreground hidden md:block">{currentUser.name}</span>
            )}
            <button
              className="label-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => { logout(); navigate('/'); }}
            >
              退出
            </button>
          </div>
        </div>

        {/* Tab bar — minimal, no background pills */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex gap-0 overflow-x-auto border-t border-border scrollbar-none">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex items-center gap-1.5 px-5 py-3 label-sm whitespace-nowrap transition-all border-b-2 -mb-px',
                activeTab === tab.id
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.step && (
                <span className="text-[9px] opacity-50">{tab.step}</span>
              )}
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
