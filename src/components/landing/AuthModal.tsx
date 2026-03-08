import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
      <DialogContent className="sm:max-w-sm rounded-none border-border bg-background p-10">
        <DialogHeader>
          <p className="label-sm text-muted-foreground mb-3">
            {mode === 'register' ? '创建账户' : '欢迎回来'}
          </p>
          <DialogTitle className="font-display text-3xl font-light italic text-foreground leading-tight">
            {mode === 'register' ? '开始记录\n你的人生' : '继续你的\n旅程'}
          </DialogTitle>
        </DialogHeader>

        <div className="w-8 h-px bg-foreground/20 my-6" />

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <div className="space-y-1.5">
              <Label className="label-sm text-muted-foreground">你的名字</Label>
              <Input
                placeholder="叫我什么好呢"
                value={name}
                onChange={e => setName(e.target.value)}
                className="rounded-none border-0 border-b border-border bg-transparent font-body text-sm focus-visible:ring-0 focus-visible:border-foreground px-0 h-9"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label className="label-sm text-muted-foreground">邮箱</Label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="rounded-none border-0 border-b border-border bg-transparent font-body text-sm focus-visible:ring-0 focus-visible:border-foreground px-0 h-9"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="label-sm text-muted-foreground">密码</Label>
            <Input
              type="password"
              placeholder="至少 6 位"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              className="rounded-none border-0 border-b border-border bg-transparent font-body text-sm focus-visible:ring-0 focus-visible:border-foreground px-0 h-9"
            />
          </div>

          {error && <p className="font-body text-xs text-destructive">{error}</p>}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full font-body label-sm border border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground transition-all py-3.5"
            >
              {loading ? '…' : mode === 'register' ? '创建纪念册' : '进入纪念册'}
            </button>
          </div>

          <p className="font-body text-xs text-muted-foreground text-center">
            {mode === 'register' ? '已有账号？' : '还没有账号？'}
            <button
              type="button"
              className="ml-1 underline text-foreground"
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
