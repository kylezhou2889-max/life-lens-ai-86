import { useState } from 'react';
import AuthModal from './AuthModal';
import heroImg from '@/assets/hero-ins.jpg';

export default function Hero() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <section className="relative w-full h-screen min-h-[680px] overflow-hidden">
        <img
          src={heroImg}
          alt="Woman writing by window"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-20 pb-20 md:pb-28">
          <p className="label-sm text-on-dark/60 mb-5 anim-fade-up">AI-Powered Personal Memoir</p>

          <h1 className="font-display text-[clamp(3rem,8.5vw,7rem)] font-bold italic leading-[0.92] text-on-dark mb-6 anim-fade-up delay-200">
            你的人生，<br />
            值得被好好记录。
          </h1>

          <p className="font-body text-lg md:text-xl text-on-dark/75 max-w-md mb-10 leading-relaxed anim-fade-up delay-400">
            写下目标，记录日常，AI 帮你看见成长——不辜负自己的每一天。
          </p>

          <div className="flex flex-wrap items-center gap-5 anim-fade-up delay-600">
            <button
              onClick={() => setAuthOpen(true)}
              className="font-body font-semibold text-base bg-white text-foreground hover:bg-white/90 transition-all px-8 py-4 rounded-full shadow-lift"
            >
              免费开始记录
            </button>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-body text-base text-on-dark/65 hover:text-on-dark transition-colors"
            >
              了解功能 ↓
            </button>
          </div>
        </div>
      </section>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
