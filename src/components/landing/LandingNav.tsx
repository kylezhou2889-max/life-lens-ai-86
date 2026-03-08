import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

export default function LandingNav() {
  const [authOpen, setAuthOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Add scroll listener
  if (typeof window !== 'undefined') {
    window.onscroll = () => setScrolled(window.scrollY > 40);
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${
      scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-card' : 'bg-transparent'
    }`}>
      <div className="font-display text-lg font-semibold text-gradient-rose">
        人生纪念册
      </div>

      <div className="hidden md:flex items-center gap-8">
        {['关于', 'Demo', '功能'].map(item => (
          <button
            key={item}
            className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => document.getElementById(item === '关于' ? 'story' : 'demo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {currentUser ? (
          <>
            <span className="font-body text-sm text-muted-foreground hidden md:block">{currentUser.name} 🌸</span>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl font-body border-primary/30 hover:border-primary text-primary"
              onClick={() => navigate('/app')}
            >
              进入纪念册
            </Button>
          </>
        ) : (
          <>
            <button
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block"
              onClick={() => setAuthOpen(true)}
            >
              登录
            </button>
            <Button
              size="sm"
              className="gradient-cta text-primary-foreground border-0 rounded-xl font-body hover:opacity-90"
              onClick={() => setAuthOpen(true)}
            >
              免费开始
            </Button>
          </>
        )}
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </nav>
  );
}
