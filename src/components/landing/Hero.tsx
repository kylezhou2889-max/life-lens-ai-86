import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

export default function Hero() {
  const [authOpen, setAuthOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Floating blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-30 blur-3xl" style={{ background: 'hsl(var(--rose))' }} />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-25 blur-3xl" style={{ background: 'hsl(var(--lavender))' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: 'hsl(var(--indigo))' }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium border border-primary/20 bg-white/60 backdrop-blur-sm text-primary shadow-card">
          <span>✨</span>
          <span>AI 驱动的个人成长纪念册</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6 tracking-tight">
          你的人生，
          <br />
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--gradient-cta)' }}>
            值得被好好记录
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-4 leading-relaxed max-w-2xl mx-auto">
          不是为了证明给谁看，
          <br className="md:hidden" />
          <span className="text-foreground font-medium">而是为了不辜负自己。</span>
        </p>

        <p className="text-base text-muted-foreground mb-12 max-w-xl mx-auto">
          设立目标、记录日常、AI 解析差距 —— 每一段旅程都值得被温柔地见证
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="gradient-cta text-white border-0 px-10 py-6 text-lg rounded-2xl shadow-glow hover:opacity-90 transition-all hover:scale-105"
            onClick={() => setAuthOpen(true)}
          >
            开始我的纪念册 →
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-6 text-lg rounded-2xl bg-white/70 backdrop-blur-sm border-border hover:bg-white"
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            查看 Demo
          </Button>
        </div>

        {/* Social proof */}
        <p className="mt-12 text-sm text-muted-foreground">
          🌸 已有 <span className="font-semibold text-foreground">1,200+</span> 位女性开始记录自己的人生故事
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
        <div className="w-px h-8 bg-border" />
        <span className="text-xs">向下探索</span>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </section>
  );
}
