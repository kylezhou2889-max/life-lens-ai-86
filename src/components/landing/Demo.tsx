import { useState } from 'react';
import AuthModal from './AuthModal';

export default function Demo() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      {/* ── CTA BANNER ── */}
      <section className="bg-foreground text-primary-foreground py-28 px-8 text-center">
        <p className="label-sm opacity-50 mb-8">开始你的旅程</p>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light italic leading-[1.1] mb-8 max-w-3xl mx-auto">
          每一个认真活着的她，<br />都值得一本纪念册。
        </h2>
        <div className="w-8 h-px bg-primary-foreground/30 mx-auto mb-10" />
        <button
          onClick={() => setAuthOpen(true)}
          className="font-body label-sm border border-primary-foreground/50 hover:border-primary-foreground hover:bg-primary-foreground/10 transition-all px-12 py-4 text-primary-foreground"
        >
          免费创建我的纪念册
        </button>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="demo" className="max-w-5xl mx-auto px-8 md:px-16 py-24 md:py-32">
        <div className="text-center mb-20">
          <p className="label-sm text-muted-foreground mb-4">使用方式</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light italic text-foreground">
            三步，开启成长之旅
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-border">
          {[
            {
              num: '01',
              title: '设立目标',
              body: '按年份写下你真正渴望的事。健康、财务、学习、旅行……每个愿望都值得被认真对待。',
            },
            {
              num: '02',
              title: '记录日常',
              body: '写日记、上传照片或 PDF。Gemini AI 自动从记录中提炼生活轨迹，无需整理。',
            },
            {
              num: '03',
              title: 'AI 洞察分析',
              body: '对比目标与真实生活，生成差距报告、心态变化曲线与可执行建议。',
            },
          ].map((s, i) => (
            <div key={i} className="border-b md:border-b-0 md:border-r border-border last:border-r-0 px-8 py-12">
              <p className="font-display text-5xl font-light text-muted-foreground/30 mb-6">{s.num}</p>
              <h3 className="font-display text-xl font-light italic text-foreground mb-4">{s.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
