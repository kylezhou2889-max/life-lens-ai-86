import chapterWalkImg from '@/assets/chapter-walk.png';
import chapterGoalsImg from '@/assets/chapter-goals.png';
import chapterInsightImg from '@/assets/chapter-insight.png';
import diaryImg from '@/assets/feature-diary.png';
import travelImg from '@/assets/feature-travel.png';

const features = [
  {
    icon: '🎯',
    tag: '目标管理',
    title: '写下你真正渴望的事',
    desc: '按年份、按分类设立目标。健康、财务、学习、旅行……每个愿望都值得被认真对待，用进度条见证每一步前进。',
    img: chapterGoalsImg,
    color: 'bg-amber-50',
    tagColor: 'bg-amber-100 text-amber-700',
  },
  {
    icon: '📔',
    tag: '日记记录',
    title: '每一天，都是证据',
    desc: '写日记、上传照片与 PDF。AI 自动从文字中提炼健康数据、资产信息、旅行轨迹，无需手动整理。',
    img: diaryImg,
    color: 'bg-pink-50',
    tagColor: 'bg-pink-100 text-pink-700',
  },
  {
    icon: '✨',
    tag: 'AI 洞察',
    title: '温柔地照亮前路',
    desc: '每季度或每年，AI 综合目标、日记、健康、资产数据，生成专属洞察报告。不评判，只是帮你看清差距与成长。',
    img: chapterInsightImg,
    color: 'bg-violet-50',
    tagColor: 'bg-violet-100 text-violet-700',
  },
  {
    icon: '✈️',
    tag: '旅行足迹',
    title: '每一段旅程都值得铭记',
    desc: '记录走过的城市与故事，打造你的专属旅行地图。三年后翻开，看见那个勇敢出发的自己。',
    img: travelImg,
    color: 'bg-teal-50',
    tagColor: 'bg-teal-100 text-teal-700',
  },
];

export default function ProductStory() {
  return (
    <div id="features">

      {/* ── BRAND STATEMENT ── */}
      <section className="py-28 md:py-40 px-8 text-center bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 tag-pill bg-secondary text-secondary-foreground mb-10">
            🌸 专为认真生活的她而生
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.8rem)] font-bold italic leading-[1.08] text-foreground mb-8">
            "记录，是最温柔的<br />自我宣告。"
          </h2>
          <div className="w-16 h-1 bg-foreground/10 rounded-full mx-auto mb-10" />
          <p className="font-body text-xl text-muted-foreground leading-relaxed">
            每一天的日记，每一个写下的目标，每一次诚实的回顾——<br />
            都是你对自己人生的主动掌舵。
          </p>
        </div>
      </section>

      {/* ── CHAPTER I — Full bleed illustration ── */}
      <section className="relative w-full aspect-[16/8] min-h-[460px] overflow-hidden">
        <img src={chapterWalkImg} alt="Woman walking with journal" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        <div className="absolute bottom-10 left-8 md:left-20 max-w-sm">
          <span className="tag-pill bg-white/15 text-white/90 border border-white/20 backdrop-blur-sm mb-5 inline-block">第 一 章</span>
          <h3 className="font-display text-[clamp(2.5rem,5.5vw,5rem)] font-bold italic text-on-dark leading-[1.0] mb-4">
            先问自己<br />想要什么
          </h3>
          <p className="font-body text-lg text-on-dark/75 leading-relaxed">
            设立目标，是给未来的你<br />写下第一封信。
          </p>
        </div>
      </section>

      {/* ── CHAPTER II — Text + Illustration split ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[580px] bg-white">
        <div className="flex flex-col justify-center px-10 md:px-20 py-20">
          <span className="tag-pill bg-secondary text-secondary-foreground mb-8 self-start">第 二 章</span>
          <h3 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] font-bold italic text-foreground leading-[1.1] mb-8">
            每一天，<br />都是证据。
          </h3>
          <div className="w-12 h-1 bg-foreground/15 rounded-full mb-8" />
          <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-sm">
            写日记，上传照片与文件。Gemini AI 悄然读懂你的每一条记录，
            提炼出健康、资产、旅行轨迹，无需整理，自然成册。
          </p>
        </div>
        <div className="relative min-h-[360px] md:min-h-0 overflow-hidden bg-amber-50 flex items-center justify-center p-10">
          <img src={chapterGoalsImg} alt="Goal setting illustration" className="w-full max-w-md object-contain" />
        </div>
      </section>

      {/* ── CHAPTER III — Full bleed illustration centered ── */}
      <section className="relative w-full aspect-[16/8] min-h-[460px] overflow-hidden">
        <img src={chapterInsightImg} alt="AI insight illustration" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <span className="tag-pill bg-white/15 text-white/90 border border-white/20 backdrop-blur-sm mb-6 inline-block">第 三 章</span>
          <h3 className="font-display text-[clamp(2.8rem,6.5vw,6rem)] font-bold italic text-on-dark leading-[1.0] mb-5">
            陪你看见<br />目标与现实的距离
          </h3>
          <p className="font-body text-xl text-on-dark/75 max-w-sm leading-relaxed">
            不评判，只是温柔地照亮前路。
          </p>
        </div>
      </section>

      {/* ── FEATURE CARDS GRID ── */}
      <section className="bg-white py-24 md:py-32 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 tag-pill bg-secondary text-secondary-foreground mb-6">
              🌟 产品功能
            </div>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-bold italic text-foreground mb-5">
              六大功能，陪伴成长每一步
            </h2>
            <p className="font-body text-xl text-muted-foreground max-w-xl mx-auto">
              从设立目标到 AI 洞察，纪念册是你的人生管理伙伴。
            </p>
          </div>

          {/* 2x2 main feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {features.map((f, i) => (
              <div
                key={i}
                className={`${f.color} rounded-3xl overflow-hidden border border-white/80 shadow-card hover:shadow-lift transition-all duration-300 group`}
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="flex-1 p-10 md:p-12 flex flex-col justify-center">
                    <span className={`tag-pill ${f.tagColor} self-start mb-5`}>
                      {f.icon} {f.tag}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold italic text-foreground mb-4 leading-tight">
                      {f.title}
                    </h3>
                    <p className="font-body text-base text-muted-foreground leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                  <div className="w-full md:w-52 h-52 md:h-auto flex-shrink-0 overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={f.img}
                      alt={f.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3 small feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: '💪', tag: '健康管理', title: '记录体重、血压与运动', desc: '每一次坚持，都是给自己最好的礼物。追踪健康数据，看见身体的变化。', color: 'bg-green-50', tagColor: 'bg-green-100 text-green-700' },
              { icon: '💰', tag: '资产追踪', title: '看见财富的增长曲线', desc: '年度资产快照，清晰掌握自己的财务状态，见证储蓄与投资的复利力量。', color: 'bg-yellow-50', tagColor: 'bg-yellow-100 text-yellow-700' },
              { icon: '📅', tag: '人生大事', title: '收录每一个重要时刻', desc: '晋升、旅行、里程碑——人生的高光时刻都值得在日记外单独铭记。', color: 'bg-blue-50', tagColor: 'bg-blue-100 text-blue-700' },
            ].map((f, i) => (
              <div key={i} className={`${f.color} rounded-3xl p-10 border border-white/80 shadow-card hover:shadow-lift transition-all`}>
                <span className={`tag-pill ${f.tagColor} self-start mb-5 inline-block`}>
                  {f.icon} {f.tag}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold italic text-foreground mb-3">{f.title}</h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHAPTER IV Quote ── */}
      <section className="bg-gradient-hero py-24 md:py-32 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold italic text-foreground leading-[1.15]">
              "未来的你，会感谢今天没有放弃记录的自己。"
            </p>
          </div>
          <div>
            <span className="tag-pill bg-secondary text-secondary-foreground mb-8 inline-block">第 四 章</span>
            <h3 className="font-display text-2xl md:text-3xl font-bold italic text-foreground mb-5">
              回顾，是送给未来的礼物
            </h3>
            <div className="w-12 h-1 bg-foreground/15 rounded-full mb-6" />
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              三年后翻开今天的记录，你会看见一个正在成长、从未放弃的自己。
              那份诚实与坚持，就是最珍贵的独立宣言。
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
