import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

export default function LandingNav() {
  const [authOpen, setAuthOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-border/50">
      <div className="text-lg font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'var(--gradient-cta)' }}>
        我的人生纪念册
      </div>

      <div className="flex items-center gap-4">
        {currentUser ? (
          <>
            <span className="text-sm text-muted-foreground hidden md:block">你好，{currentUser.name} 🌸</span>
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => navigate('/app')}>
              进入纪念册
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>退出</Button>
          </>
        ) : (
          <>
            <button
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setAuthOpen(true)}
            >
              登录
            </button>
            <Button
              size="sm"
              className="gradient-cta text-white border-0 rounded-xl hover:opacity-90"
              onClick={() => setAuthOpen(true)}
            >
              免费注册
            </Button>
          </>
        )}
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </nav>
  );
}
