const steps = [
  {
    step: '01',
    title: '设立你的目标',
    desc: '按年份和类别设定目标，健康、财务、学习、旅行……每一个愿望都值得被认真对待。',
    preview: (
      <div className="bg-white rounded-2xl p-5 shadow-card space-y-3">
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-foreground text-sm">2024 年度目标</span>
          <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">4 个目标</span>
        </div>
        {[
          { label: '每周运动 3 次', cat: '健康', progress: 65, color: 'bg-rose-400' },
          { label: '阅读 24 本书', cat: '学习', progress: 40, color: 'bg-purple-400' },
          { label: '存款达 10 万', cat: '财务', progress: 80, color: 'bg-indigo-400' },
        ].map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{item.label}</span>
              <span>{item.progress}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full">
              <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    step: '02',
    title: '记录真实的日常',
    desc: '写日记、上传照片或 PDF，AI 自动从你的记录中提取健康、资产、旅行等关键信息。',
    preview: (
      <div className="bg-white rounded-2xl p-5 shadow-card space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-xs text-muted-foreground">2024-03-15</span>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          "今天跑步了 5 公里，感觉状态不错。去超市买了菜，花了 120 元……"
        </p>
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs bg-green-50 text-green-600 border border-green-200 px-2 py-1 rounded-full">✓ 运动记录</span>
          <span className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-1 rounded-full">✓ 消费记录</span>
        </div>
      </div>
    ),
  },
  {
    step: '03',
    title: 'AI 深度分析差距',
    desc: 'Claude AI 综合你的目标和日记，生成目标差距报告、心态变化趋势和可执行建议。',
    preview: (
      <div className="bg-white rounded-2xl p-5 shadow-card space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-primary">✨ AI 洞察 · 2024 Q1</span>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-3 text-xs text-foreground leading-relaxed">
          "本季度你的运动目标完成度约 65%，整体情绪趋于稳定积极……"
        </div>
        <div className="space-y-1.5">
          <div className="text-xs font-medium text-foreground">建议行动：</div>
          {['周二、四固定运动时间', '每月回顾财务支出', '睡前冥想 10 分钟'].map((r, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
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
    <section id="demo" className="py-24 px-6" style={{ background: 'var(--gradient-hero)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">产品演示</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            三步，开启你的成长旅程
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            简单、直观、有温度的人生记录体验
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-black text-primary/20">{s.step}</span>
                <div>
                  <h3 className="font-bold text-foreground text-lg">{s.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
              <div>{s.preview}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
