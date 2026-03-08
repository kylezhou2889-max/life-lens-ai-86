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
        if (!name.trim()) { setError('请输入你的名字'); setLoading(false); return; }
        result = register(email, password, name);
      } else {
        result = login(email, password);
      }

      if (result.success) {
        onClose();
        navigate('/app');
      } else {
        setError(result.error || '操作失败');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {mode === 'register' ? '创建你的纪念册 🌸' : '欢迎回来 ✨'}
          </DialogTitle>
          <p className="text-center text-muted-foreground text-sm mt-1">
            {mode === 'register'
              ? '开始记录属于你的人生故事'
              : '继续你未完成的旅程'}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {mode === 'register' && (
            <div className="space-y-1.5">
              <Label htmlFor="name">你的名字</Label>
              <Input
                id="name"
                placeholder="叫我什么好呢？"
                value={name}
                onChange={e => setName(e.target.value)}
                className="rounded-xl"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">密码</Label>
            <Input
              id="password"
              type="password"
              placeholder="至少 6 位"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              className="rounded-xl"
            />
          </div>

          {error && (
            <p className="text-destructive text-sm text-center">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full gradient-cta text-white border-0 rounded-xl py-5 text-base font-medium hover:opacity-90"
            disabled={loading}
          >
            {loading ? '处理中…' : mode === 'register' ? '开始我的旅程 →' : '进入纪念册 →'}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
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
