import { useState } from 'react';
import AuthModal from './AuthModal';
import heroImg from '@/assets/hero-journal.jpg';

export default function Hero() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <section className="relative w-full h-screen min-h-[680px] overflow-hidden">
        {/* Background image */}
        <img
          src={heroImg}
          alt="A woman writing in her journal"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-20 pb-20 md:pb-28">
          {/* Tag */}
          <div className="anim-fade-up mb-6">
            <span className="tag-pill bg-white/15 text-white/90 border border-white/25 backdrop-blur-sm">
              ✨ AI 驱动的人生记录本
            </span>
          </div>

          <h1 className="font-display text-[clamp(3.2rem,9vw,7.5rem)] font-bold italic leading-[0.92] text-on-dark mb-6 anim-fade-up delay-200">
            你的人生，<br />
            值得被<br />
            好好记录。
          </h1>

          <p className="font-body text-lg md:text-xl text-on-dark/80 max-w-lg mb-10 leading-relaxed anim-fade-up delay-400">
            写下目标，记录日常，让 AI 帮你看见成长轨迹。<br />
            <span className="text-on-dark/60">不辜负自己的每一天。</span>
          </p>

          <div className="flex flex-wrap items-center gap-4 anim-fade-up delay-600">
            <button
              onClick={() => setAuthOpen(true)}
              className="font-body font-semibold text-base bg-white text-foreground hover:bg-white/90 transition-all px-8 py-4 rounded-full shadow-lift"
            >
              免费开始记录 →
            </button>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-body text-base text-on-dark/70 hover:text-on-dark transition-colors flex items-center gap-2"
            >
              了解功能 ↓
            </button>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex items-center gap-6 anim-fade-up delay-800">
            <div className="flex -space-x-2">
              {['🌸', '⭐', '💫', '🌿'].map((e, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-sm backdrop-blur-sm">
                  {e}
                </div>
              ))}
            </div>
            <p className="font-body text-sm text-on-dark/70">
              已有 <span className="text-on-dark font-semibold">1,200+</span> 位女性开始记录她们的人生
            </p>
          </div>
        </div>
      </section>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
