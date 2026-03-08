import { useState } from 'react';
import { Button } from '@/components/ui/button';
import AuthModal from './AuthModal';

export default function Hero() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden gradient-hero">

      {/* Watercolor blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 right-16 w-72 h-72 rounded-full opacity-30 blur-3xl float-gentle"
          style={{ background: 'hsl(348 60% 82%)' }} />
        <div className="absolute bottom-24 left-12 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'hsl(270 40% 78%)', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-15 blur-3xl"
          style={{ background: 'hsl(38 60% 85%)' }} />
        {/* Decorative botanical elements */}
        <div className="absolute top-32 left-8 text-5xl opacity-15 float-gentle" style={{ animationDelay: '1s' }}>🌿</div>
        <div className="absolute bottom-40 right-12 text-4xl opacity-20 float-gentle" style={{ animationDelay: '3s' }}>✦</div>
        <div className="absolute top-1/3 right-24 text-3xl opacity-10 float-gentle" style={{ animationDelay: '1.5s' }}>❀</div>
        <div className="absolute bottom-32 left-20 text-2xl opacity-15 float-gentle" style={{ animationDelay: '2.5s' }}>◇</div>
      </div>

      {/* Thin decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 gradient-cta opacity-40" />

      <div className="relative z-10 max-w-3xl mx-auto text-center px-8">

        {/* Eyebrow label */}
        <div className="fade-up opacity-0-init inline-flex items-center gap-2 mb-10">
          <span className="text-muted-foreground text-xs tracking-[0.3em] uppercase font-body">Personal Memoir · AI-Powered</span>
        </div>

        {/* Main headline */}
        <h1 className="fade-up delay-100 opacity-0-init font-display text-5xl md:text-7xl font-semibold text-foreground leading-[1.12] mb-6 tracking-tight">
          你的人生，<br />
          <em className="not-italic text-gradient-rose">值得被好好记录</em>
        </h1>

        {/* Subheadline */}
        <p className="fade-up delay-200 opacity-0-init font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-4 max-w-xl mx-auto italic">
          "不是为了证明给谁看，<br className="md:hidden" />而是为了不辜负自己。"
        </p>

        <p className="fade-up delay-300 opacity-0-init font-body text-sm text-muted-foreground/70 mb-12 max-w-lg mx-auto">
          设立你真正渴望的目标 · 记录每一个真实的瞬间 · 让 AI 温柔地陪你看见成长
        </p>

        {/* CTAs */}
        <div className="fade-up delay-400 opacity-0-init flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            className="gradient-cta text-primary-foreground border-0 px-10 py-6 text-base rounded-2xl shadow-elegant hover:opacity-90 transition-all hover:scale-105 font-body"
            onClick={() => setAuthOpen(true)}
          >
            开始记录我的人生 →
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="px-8 py-6 text-base rounded-2xl text-muted-foreground hover:text-foreground font-body border border-border/60 bg-card/50 hover:bg-card"
            onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
          >
            了解这个故事
          </Button>
        </div>

        {/* Stat strip */}
        <div className="fade-up delay-500 opacity-0-init flex items-center justify-center gap-8 text-center">
          {[
            { n: '1,200+', label: '正在记录的她们' },
            { n: '∞', label: '值得被铭记的瞬间' },
            { n: 'AI', label: 'Gemini 驱动分析' },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="font-display text-xl font-semibold text-foreground">{s.n}</span>
              <span className="text-xs text-muted-foreground font-body">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-border" />
        <span className="text-xs font-body tracking-widest">scroll</span>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </section>
  );
}
