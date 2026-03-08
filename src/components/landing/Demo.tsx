import { useState } from 'react';
import AuthModal from './AuthModal';

const steps = [
  {
    num: '01',
    icon: '🎯',
    title: '设立目标',
    body: '按年份写下你真正渴望的事。健康、财务、学习、旅行……每个愿望都值得被认真对待。',
    color: 'border-amber-200 bg-amber-50',
    numColor: 'text-amber-300',
  },
  {
    num: '02',
    icon: '📔',
    title: '记录日常',
    body: '写日记、上传照片或 PDF。Gemini AI 自动从记录中提炼生活轨迹，无需整理。',
    color: 'border-pink-200 bg-pink-50',
    numColor: 'text-pink-300',
  },
  {
    num: '03',
    icon: '✨',
    title: 'AI 洞察分析',
    body: '对比目标与真实生活，生成差距报告、心态变化分析与可执行建议，温柔照亮前路。',
    color: 'border-violet-200 bg-violet-50',
    numColor: 'text-violet-300',
  },
];

export default function Demo() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      {/* ── HOW IT WORKS ── */}
      <section id="demo" className="py-20 md:py-28 px-8 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 tag-pill bg-secondary text-secondary-foreground mb-5">
              🚀 使用方式
            </div>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold italic text-foreground mb-4">
              三步，开启成长之旅
            </h2>
            <p className="font-body text-lg text-muted-foreground">简单易用，专注于记录你真实的生活。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={i} className={`rounded-2xl border-2 ${s.color} p-8 hover:shadow-lift transition-shadow`}>
                <div className="flex items-start justify-between mb-6">
                  <span className="text-3xl">{s.icon}</span>
                  <span className={`font-display text-5xl font-bold ${s.numColor}`}>{s.num}</span>
                </div>
                <h3 className="font-display text-xl font-bold italic text-foreground mb-3">{s.title}</h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32 px-8 text-center">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 tag-pill bg-white/10 text-white/80 border border-white/20 mb-8">
            🌸 免费开始
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold italic leading-[1.05] text-white mb-6">
            每一个认真活着的她，<br />都值得一本纪念册。
          </h2>
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-10" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setAuthOpen(true)}
              className="font-body font-semibold text-base bg-white text-foreground hover:bg-white/90 transition-all px-10 py-4 rounded-full shadow-lift"
            >
              免费创建我的纪念册 →
            </button>
            <p className="font-body text-sm text-white/50">无需信用卡 · 永久免费使用</p>
          </div>

          {/* Feature bullets */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {['✅ 6 大功能全开放', '✅ AI 智能分析', '✅ 数据安全加密', '✅ 随时导出'].map((item, i) => (
              <span key={i} className="font-body text-sm text-white/70">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
