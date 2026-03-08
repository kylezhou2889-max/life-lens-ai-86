import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

export default function LandingNav() {
  const [authOpen, setAuthOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5">
      {/* Left — site name */}
      <div className="font-display text-base italic text-on-dark drop-shadow-sm">
        人生纪念册
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-6">
        {currentUser ? (
          <>
            <span className="label-sm text-on-dark/70 hidden md:block">{currentUser.name}</span>
            <button
              className="label-sm text-on-dark border border-white/40 hover:border-white hover:bg-white/10 transition-all px-5 py-2"
              onClick={() => navigate('/app')}
            >
              进入纪念册
            </button>
          </>
        ) : (
          <>
            <button
              className="label-sm text-on-dark/70 hover:text-on-dark transition-colors hidden md:block"
              onClick={() => setAuthOpen(true)}
            >
              登录
            </button>
            <button
              className="label-sm text-on-dark border border-white/40 hover:border-white hover:bg-white/10 transition-all px-5 py-2"
              onClick={() => setAuthOpen(true)}
            >
              注册
            </button>
          </>
        )}
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </nav>
  );
}
