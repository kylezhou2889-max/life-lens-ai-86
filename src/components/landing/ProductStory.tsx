const chapters = [
  {
    number: 'I',
    title: '记录，是对自己最温柔的承诺',
    body: '每一行文字，每一张照片，都是你对自己存在的郑重确认。不必精彩，不必完美，只是——真实地活过这一天。',
    quote: '「每一天都是证据，证明你正在认真活着」',
    symbol: '📝',
    gradient: 'from-amber-50/80 to-rose-50/60',
    border: 'border-amber-200/60',
  },
  {
    number: 'II',
    title: '目标，是给未来自己的一封信',
    body: '先问自己真正想要什么，再出发。把内心模糊的渴望，变成看得见的方向——不是约束，是自由的起点。',
    quote: '「先问自己想要什么，再出发」',
    symbol: '✦',
    gradient: 'from-rose-50/80 to-purple-50/60',
    border: 'border-rose-200/60',
  },
  {
    number: 'III',
    title: '洞察，是 AI 给你的镜子',
    body: 'Gemini AI 读懂你的日记，对比你的目标，不带评判地告诉你：差距在哪里，原因是什么，下一步可以怎么走。',
    quote: '「AI 陪你看清差距，不评判，只支持」',
    symbol: '◈',
    gradient: 'from-purple-50/80 to-indigo-50/60',
    border: 'border-purple-200/60',
  },
  {
    number: 'IV',
    title: '回顾，是送给未来自己的礼物',
    body: '三年后的你翻开今天的记录，会看见一个正在艰难成长却始终没有放弃的女孩。那个她，值得被珍视。',
    quote: '「未来的你，会感谢今天认真记录的自己」',
    symbol: '🌸',
    gradient: 'from-indigo-50/80 to-amber-50/60',
    border: 'border-indigo-200/60',
  },
];

export default function ProductStory() {
  return (
    <section id="story" className="py-28 px-6 bg-background">
      <div className="max-w-5xl mx-auto">

        {/* Chapter header */}
        <div className="text-center mb-20">
          <p className="font-body text-xs text-muted-foreground tracking-[0.3em] uppercase mb-4">
            Why it matters
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-6">
            人生四章
          </h2>
          <p className="font-body text-muted-foreground text-base italic max-w-md mx-auto leading-relaxed">
            每一个女性的人生都是一部未完成的作品，<br />
            纪念册陪你好好写下去。
          </p>
          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-16 bg-border" />
            <span className="text-muted-foreground/50 text-lg">✦</span>
            <div className="h-px w-16 bg-border" />
          </div>
        </div>

        {/* Chapter cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chapters.map((ch, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${ch.gradient} rounded-3xl p-8 border ${ch.border} hover:shadow-soft transition-all hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between mb-5">
                <span className="font-display text-5xl font-bold text-foreground/10 leading-none">{ch.number}</span>
                <span className="text-3xl">{ch.symbol}</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3 leading-snug">
                {ch.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
                {ch.body}
              </p>
              <p className="font-body text-xs text-foreground/60 italic border-l-2 border-primary/30 pl-3">
                {ch.quote}
              </p>
            </div>
          ))}
        </div>

        {/* Central quote */}
        <div className="mt-20 text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-border" />
            <span className="text-muted-foreground/30 text-sm">❀</span>
            <div className="h-px w-12 bg-border" />
          </div>
          <blockquote className="font-display text-2xl md:text-3xl font-medium text-foreground max-w-2xl mx-auto leading-relaxed italic">
            "成长不是直线，但每一步都算数。"
          </blockquote>
          <p className="font-body text-sm text-muted-foreground">—— 献给每一个认真生活、勇敢做自己的她</p>
        </div>
      </div>
    </section>
  );
}
