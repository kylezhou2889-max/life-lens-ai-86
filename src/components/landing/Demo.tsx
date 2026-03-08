const steps = [
  {
    num: '01',
    label: '设立目标',
    desc: '按年份和类别写下你真正渴望的事。健康、财务、成长、旅行……每一个愿望都值得被认真对待。',
    visual: (
      <div className="bg-card rounded-2xl p-5 border border-border shadow-card space-y-3">
        <div className="flex items-center justify-between mb-3">
          <span className="font-display text-sm font-semibold text-foreground">2025 年目标</span>
          <span className="font-body text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">4 项</span>
        </div>
        {[
          { label: '每周运动 3 次', cat: '健康', p: 65 },
          { label: '阅读 24 本书', cat: '学习', p: 40 },
          { label: '去一个没去过的国家', cat: '旅行', p: 20 },
        ].map((item, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex justify-between">
              <span className="font-body text-xs text-foreground">{item.label}</span>
              <span className="font-body text-xs text-muted-foreground">{item.p}%</span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full rounded-full gradient-cta" style={{ width: `${item.p}%` }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: '02',
    label: '记录日常',
    desc: '写日记、上传照片或 PDF——Gemini AI 会悄悄从你的记录中提取生活轨迹，无需手动整理。',
    visual: (
      <div className="bg-card rounded-2xl p-5 border border-border shadow-card space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-body text-xs text-muted-foreground">2025年3月15日</span>
        </div>
        <p className="font-body text-sm text-foreground leading-relaxed line-clamp-3">
          "今天跑步了 5 公里，第一次没有中途停下来。傍晚去了那家一直想去的书店……"
        </p>
        <div className="flex gap-2 flex-wrap pt-1">
          <span className="font-body text-xs bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full">✓ 运动记录</span>
          <span className="font-body text-xs bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-full">✓ 情绪积极</span>
        </div>
      </div>
    ),
  },
  {
    num: '03',
    label: 'AI 深度洞察',
    desc: 'Gemini 综合你的目标与日记，生成目标差距报告、心态变化曲线和可执行建议。',
    visual: (
      <div className="bg-card rounded-2xl p-5 border border-border shadow-card space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-body text-xs font-semibold text-primary">✦ AI 洞察 · 2025 Q1</span>
        </div>
        <div className="bg-gradient-to-r from-rose-50 to-purple-50 rounded-xl p-3 border border-rose-100/60">
          <p className="font-body text-xs text-foreground leading-relaxed italic">
            "本季度运动目标完成度约 65%，整体心态从焦虑趋向平稳，有明显的内在成长信号……"
          </p>
        </div>
        <div className="space-y-1.5">
          <div className="font-body text-xs font-semibold text-foreground">行动建议：</div>
          {['周二、四固定运动时间 30 分钟', '每月底做一次财务回顾', '睡前写三件感恩的事'].map((r, i) => (
            <div key={i} className="flex items-center gap-2 font-body text-xs text-muted-foreground">
              <span className="text-primary">→</span> {r}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function Demo() {
  return (
    <section id="demo" className="py-28 px-6 bg-parchment">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-18 mb-16">
          <p className="font-body text-xs text-muted-foreground tracking-[0.3em] uppercase mb-4">
            How it works
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-5">
            三步，开启你的成长旅程
          </h2>
          <p className="font-body text-muted-foreground text-base italic max-w-sm mx-auto">
            简单如呼吸，深刻如人生
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col gap-5">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl font-bold text-foreground/10">{s.num}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">{s.label}</h3>
                  <p className="font-body text-sm text-muted-foreground mt-1.5 leading-relaxed">{s.desc}</p>
                </div>
              </div>
              <div>{s.visual}</div>
            </div>
          ))}
        </div>

        {/* Botanical divider */}
        <div className="flex items-center justify-center gap-4 mt-20">
          <div className="h-px flex-1 bg-border" />
          <span className="text-muted-foreground/40 text-base">❀ ✦ ❀</span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>
    </section>
  );
}
