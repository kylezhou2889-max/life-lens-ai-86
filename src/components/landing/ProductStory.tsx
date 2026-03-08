import natureImg from '@/assets/ins-nature.jpg';
import libraryImg from '@/assets/ins-library.jpg';

const features = [
  { icon: '🎯', title: '设立目标', desc: '按年份写下健康、财务、学习、旅行等各类目标，用进度条追踪每一步。' },
  { icon: '📔', title: '日记记录', desc: '写日记或上传文件，AI 自动提炼健康数据、资产变化与旅行轨迹。' },
  { icon: '💪', title: '健康管理', desc: '记录体重、血压、运动事件，直观掌握身体变化趋势。' },
  { icon: '💰', title: '资产追踪', desc: '年度资产快照与历年曲线，清晰看见财富积累的成果。' },
  { icon: '✈️', title: '旅行足迹', desc: '记录走过的每座城市，打造属于你的专属旅行地图。' },
  { icon: '✨', title: 'AI 洞察分析', desc: '综合所有数据，生成季度或年度报告——目标达成率、心态变化、可执行建议。' },
];

const steps = [
  { num: '01', title: '设立目标', body: '写下今年真正想做到的事，给自己一个清晰的方向。' },
  { num: '02', title: '记录日常', body: '写日记，上传照片或文件，AI 自动整理生活轨迹。' },
  { num: '03', title: '获取洞察', body: 'AI 对比目标与现实，生成专属报告，温柔照亮前路。' },
];

export default function ProductStory() {
  return (
    <div id="features">

      {/* ── FEATURES GRID ── */}
      <section className="bg-white py-24 md:py-32 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="label-sm text-muted-foreground mb-4">产品功能</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold italic text-foreground">
              六个维度，<br className="md:hidden" />记录完整的你
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-8 md:p-10 hover:bg-secondary/30 transition-colors group">
                <span className="text-3xl mb-5 block">{f.icon}</span>
                <h3 className="font-display text-xl font-bold italic text-foreground mb-3">{f.title}</h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-BLEED IMAGE — 自然风景 ── */}
      <section className="relative w-full aspect-[16/7] min-h-[420px] overflow-hidden">
        <img src={natureImg} alt="Cherry blossom path" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent" />
        <div className="absolute bottom-10 left-8 md:left-20 max-w-sm">
          <p className="label-sm text-on-dark/60 mb-4">为什么要记录？</p>
          <h3 className="font-display text-[clamp(2rem,4.5vw,4rem)] font-bold italic text-on-dark leading-[1.05]">
            记录，是最温柔<br />的自我宣告。
          </h3>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-white py-24 md:py-32 px-8" id="how">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="label-sm text-muted-foreground mb-4">使用方式</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold italic text-foreground">
              三步，开启成长之旅
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {steps.map((s, i) => (
              <div key={i} className="bg-white p-8 md:p-10">
                <p className="font-display text-6xl font-bold text-foreground/8 mb-6">{s.num}</p>
                <h3 className="font-display text-xl font-bold italic text-foreground mb-3">{s.title}</h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-BLEED IMAGE — 书房 ── */}
      <section className="relative w-full aspect-[16/7] min-h-[420px] overflow-hidden">
        <img src={libraryImg} alt="Reading by autumn window" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/15 to-transparent" />
        <div className="absolute bottom-10 right-8 md:right-20 max-w-sm text-right">
          <p className="label-sm text-on-dark/60 mb-4">写给未来的自己</p>
          <h3 className="font-display text-[clamp(2rem,4.5vw,4rem)] font-bold italic text-on-dark leading-[1.05]">
            未来的你，会感谢<br />今天的记录。
          </h3>
        </div>
      </section>

    </div>
  );
}
