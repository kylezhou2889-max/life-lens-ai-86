const features = [
  {
    emoji: '📝',
    title: '记录生成',
    desc: '每一天都是证据，证明你正在认真活着。用文字、图片、文件，留住那些闪光的瞬间。',
    color: 'from-rose-100 to-rose-50',
    border: 'border-rose-200',
  },
  {
    emoji: '🎯',
    title: '设立追求',
    desc: '先问自己想要什么，再出发。把模糊的愿望变成清晰的目标，给未来的自己一个方向。',
    color: 'from-purple-100 to-purple-50',
    border: 'border-purple-200',
  },
  {
    emoji: '✨',
    title: '达成目标',
    desc: 'AI 陪你看清目标与现实的差距，不评判，只支持。数据驱动的洞察，帮你找到真正有效的路径。',
    color: 'from-indigo-100 to-indigo-50',
    border: 'border-indigo-200',
  },
  {
    emoji: '🌸',
    title: '回顾过往',
    desc: '未来的你，会感谢今天没有放弃记录的自己。每一段历史都是你成长最真实的见证。',
    color: 'from-pink-100 to-pink-50',
    border: 'border-pink-200',
  },
];

export default function ProductStory() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">为什么选择纪念册</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            你的人生，有四重意义
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            不只是记录，更是一场与自己的深度对话
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className={`rounded-3xl p-7 bg-gradient-to-br ${f.color} border ${f.border} shadow-card hover:shadow-soft transition-all hover:-translate-y-1`}
            >
              <div className="text-4xl mb-4">{f.emoji}</div>
              <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-20 text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-foreground max-w-2xl mx-auto leading-relaxed italic">
            "成长不是直线，但每一步都算数。"
          </blockquote>
          <p className="mt-4 text-muted-foreground">—— 献给每一个认真生活的她</p>
        </div>
      </div>
    </section>
  );
}
