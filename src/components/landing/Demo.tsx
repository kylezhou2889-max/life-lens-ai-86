import { useState } from 'react';
import AuthModal from './AuthModal';

const steps = [
  {
    num: '01',
    icon: '🎯',
    title: '设立目标',
    body: '按年份写下你真正渴望的事。健康、财务、学习、旅行……每个愿望都值得被认真对待。',
    color: 'bg-amber-50 border-amber-100',
  },
  {
    num: '02',
    icon: '📔',
    title: '记录日常',
    body: '写日记、上传照片或 PDF。Gemini AI 自动从记录中提炼生活轨迹，无需手动整理。',
    color: 'bg-pink-50 border-pink-100',
  },
  {
    num: '03',
    icon: '✨',
    title: 'AI 洞察分析',
    body: '对比目标与真实生活，生成差距报告、心态变化分析与可执行建议，温柔照亮前路。',
    color: 'bg-violet-50 border-violet-100',
  },
];

export default function Demo() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      {/* ── HOW IT WORKS ── */}
      <section id="demo" className="py-24 md:py-32 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 tag-pill bg-secondary text-secondary-foreground mb-6">
              🚀 使用方式
            </div>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-bold italic text-foreground mb-5">
              三步，开启成长之旅
            </h2>
            <p className="font-body text-xl text-muted-foreground">简单易用，专注于记录你真实的生活。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={i} className={`rounded-3xl border-2 ${s.color} p-10 hover:shadow-lift transition-all`}>
                <div className="flex items-start justify-between mb-8">
                  <span className="text-4xl">{s.icon}</span>
                  <span className="font-display text-6xl font-bold text-foreground/10">{s.num}</span>
                </div>
                <h3 className="font-display text-2xl font-bold italic text-foreground mb-4">{s.title}</h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative overflow-hidden bg-foreground py-28 md:py-36 px-8 text-center">
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 tag-pill bg-white/10 text-white/80 border border-white/20 mb-10">
            🌸 免费开始
          </div>
          <h2 className="font-display text-[clamp(2.8rem,6.5vw,5.5rem)] font-bold italic leading-[1.0] text-white mb-8">
            每一个认真活着的她，<br />都值得一本纪念册。
          </h2>
          <div className="w-16 h-1 bg-white/15 rounded-full mx-auto mb-12" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={() => setAuthOpen(true)}
              className="font-body font-semibold text-lg bg-white text-foreground hover:bg-white/90 transition-all px-12 py-4 rounded-full shadow-lift"
            >
              免费创建我的纪念册 →
            </button>
            <p className="font-body text-base text-white/50">无需信用卡 · 永久免费</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-14">
            {['✅ 6 大功能全开放', '✅ AI 智能分析', '✅ 数据安全加密', '✅ 随时导出'].map((item, i) => (
              <span key={i} className="font-body text-base text-white/65">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
