import { useState } from 'react';
import AuthModal from './AuthModal';
import heroImg from '@/assets/hero-journal.jpg';

export default function Hero() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      {/* Full-bleed hero — image fills entire viewport */}
      <section className="relative w-full h-screen min-h-[640px] overflow-hidden">
        {/* Background image */}
        <img
          src={heroImg}
          alt="A woman writing in her journal"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Layered gradient: left side darker for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Text content — bottom-left anchored like Hermès */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-16 md:pb-20">
          <p className="label-sm text-on-dark opacity-70 mb-5 anim-fade-up">
            Personal Memoir · AI-Powered · Since Today
          </p>

          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-light italic leading-[0.9] text-on-dark mb-6 anim-fade-up delay-200">
            你的人生，<br />
            值得被<br />
            好好记录。
          </h1>

          <p className="font-body text-base md:text-lg text-on-dark/80 max-w-md mb-10 leading-relaxed anim-fade-up delay-400">
            不是为了证明给谁看，而是为了不辜负自己。
          </p>

          <div className="flex items-center gap-6 anim-fade-up delay-600">
            <button
              onClick={() => setAuthOpen(true)}
              className="font-body label-sm text-on-dark border border-white/60 hover:border-white hover:bg-white/10 transition-all px-8 py-3.5"
            >
              开始记录
            </button>
            <button
              onClick={() => document.getElementById('chapters')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-body label-sm text-on-dark/70 hover:text-on-dark transition-colors flex items-center gap-2"
            >
              了解更多 <span className="text-base">↓</span>
            </button>
          </div>
        </div>

        {/* Top right — product name */}
        <div className="absolute top-8 right-8 md:right-16 anim-fade-in delay-400">
          <p className="font-display text-on-dark/80 text-sm italic">人生纪念册</p>
        </div>
      </section>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
