import { useState } from 'react';
import AuthModal from './AuthModal';

export default function Demo() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      {/* ── CTA — minimal, clean ── */}
      <section className="bg-white py-24 md:py-32 px-8 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <p className="label-sm text-muted-foreground mb-5">开始你的旅程</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold italic text-foreground leading-[1.1]">
              免费创建你的<br />专属纪念册
            </h2>
          </div>
          <div className="flex flex-col gap-4 shrink-0">
            <button
              onClick={() => setAuthOpen(true)}
              className="font-body font-semibold text-base bg-foreground text-background hover:bg-foreground/90 transition-all px-10 py-4 rounded-full"
            >
              立即免费开始 →
            </button>
            <p className="font-body text-sm text-muted-foreground text-center">无需信用卡 · 永久免费</p>
          </div>
        </div>
      </section>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
