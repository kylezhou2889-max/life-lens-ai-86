import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let result;
      if (mode === 'register') {
        if (!name.trim()) { setError('请告诉我你的名字'); setLoading(false); return; }
        result = register(email, password, name);
      } else {
        result = login(email, password);
      }
      if (result.success) { onClose(); navigate('/app'); }
      else setError(result.error || '操作失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl border-border bg-card">
        {/* Decorative top accent */}
        <div className="absolute top-0 left-8 right-8 h-0.5 rounded-full gradient-cta opacity-60" />

        <DialogHeader className="pt-2">
          <div className="text-center mb-1">
            <span className="text-3xl">{mode === 'register' ? '🌸' : '✦'}</span>
          </div>
          <DialogTitle className="font-display text-2xl font-semibold text-center text-foreground">
            {mode === 'register' ? '创建你的纪念册' : '欢迎回来'}
          </DialogTitle>
          <p className="text-center text-muted-foreground font-body text-sm mt-1 italic">
            {mode === 'register'
              ? '开始记录属于你的人生故事'
              : '继续你未完成的旅程'}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {mode === 'register' && (
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground uppercase tracking-wider">你的名字</Label>
              <Input
                placeholder="叫我什么好呢？"
                value={name}
                onChange={e => setName(e.target.value)}
                className="rounded-xl font-body"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label className="font-body text-xs text-muted-foreground uppercase tracking-wider">邮箱</Label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="rounded-xl font-body"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="font-body text-xs text-muted-foreground uppercase tracking-wider">密码</Label>
            <Input
              type="password"
              placeholder="至少 6 位"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              className="rounded-xl font-body"
            />
          </div>

          {error && (
            <p className="text-destructive text-sm text-center font-body">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full gradient-cta text-primary-foreground border-0 rounded-xl py-5 text-base font-body hover:opacity-90"
            disabled={loading}
          >
            {loading ? '…' : mode === 'register' ? '开始我的旅程 →' : '进入纪念册 →'}
          </Button>

          <p className="text-center text-sm text-muted-foreground font-body">
            {mode === 'register' ? '已有账号？' : '还没有账号？'}
            {' '}
            <button
              type="button"
              className="text-primary hover:underline font-medium"
              onClick={() => { setMode(mode === 'register' ? 'login' : 'register'); setError(''); }}
            >
              {mode === 'register' ? '登录' : '注册'}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
