import walkImg from '@/assets/section-walk.jpg';
import goalsImg from '@/assets/section-goals.jpg';
import recordImg from '@/assets/section-record.jpg';
import diaryImg from '@/assets/feature-diary.png';
import goalsFeatureImg from '@/assets/feature-goals.png';
import insightImg from '@/assets/feature-insight.png';
import travelImg from '@/assets/feature-travel.png';

const features = [
  {
    icon: '🎯',
    tag: '目标管理',
    title: '写下你真正渴望的事',
    desc: '按年份、按分类设立目标。健康、财务、学习、旅行……每个愿望都值得被认真对待，用进度条见证每一步前进。',
    img: goalsFeatureImg,
    color: 'from-amber-50 to-orange-50',
    tagColor: 'bg-amber-100 text-amber-700',
  },
  {
    icon: '📔',
    tag: '日记记录',
    title: '每一天，都是证据',
    desc: '写日记、上传照片与 PDF 文件。AI 自动从文字中提炼健康数据、资产信息、旅行轨迹，无需手动整理。',
    img: diaryImg,
    color: 'from-pink-50 to-rose-50',
    tagColor: 'bg-pink-100 text-pink-700',
  },
  {
    icon: '✨',
    tag: 'AI 洞察',
    title: '陪你看见目标与现实的距离',
    desc: '每季度或每年，AI 综合你的目标、日记、健康、资产数据，生成专属洞察报告——不评判，只是温柔地照亮前路。',
    img: insightImg,
    color: 'from-violet-50 to-purple-50',
    tagColor: 'bg-violet-100 text-violet-700',
  },
  {
    icon: '✈️',
    tag: '旅行足迹',
    title: '每一段旅程都值得被铭记',
    desc: '记录走过的城市与故事，打造你的专属旅行地图。三年后翻开，看见那个勇敢出发的自己。',
    img: travelImg,
    color: 'from-teal-50 to-cyan-50',
    tagColor: 'bg-teal-100 text-teal-700',
  },
];

export default function ProductStory() {
  return (
    <div id="features">

      {/* ── BRAND STATEMENT ── */}
      <section className="bg-gradient-hero py-24 md:py-36 px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 tag-pill bg-secondary text-secondary-foreground mb-8">
            🌸 专为认真生活的她而生
          </div>
          <h2 className="font-display text-[clamp(2.2rem,5.5vw,4rem)] font-bold italic leading-[1.1] text-foreground mb-6">
            "记录，是最温柔的<br />自我宣告。"
          </h2>
          <div className="w-12 h-1 bg-foreground/15 rounded-full mx-auto mb-8" />
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            每一天的日记，每一个写下的目标，每一次诚实的回顾——<br />
            都是你对自己人生的主动掌舵。
          </p>
        </div>
      </section>

      {/* ── FEATURE SHOWCASE (Editorial image chapters) ── */}
      {/* Chapter I — Full bleed */}
      <section className="relative w-full aspect-[16/9] min-h-[500px] overflow-hidden">
        <img src={walkImg} alt="Woman walking" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
        <div className="absolute bottom-10 left-8 md:left-20 max-w-md">
          <span className="tag-pill bg-white/15 text-white/90 border border-white/25 backdrop-blur-sm mb-4 inline-block">第 一 章</span>
          <h3 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold italic text-on-dark leading-tight mb-3">
            先问自己<br />想要什么
          </h3>
          <p className="font-body text-base text-on-dark/75 leading-relaxed">
            设立目标，是给未来的你写下第一封信。
          </p>
        </div>
      </section>

      {/* Chapter II — Split */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[580px]">
        <div className="flex flex-col justify-center px-10 md:px-20 py-20 bg-background">
          <span className="tag-pill bg-secondary text-secondary-foreground mb-6 self-start">第 二 章</span>
          <h3 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold italic text-foreground leading-[1.15] mb-6">
            每一天，<br />都是证据。
          </h3>
          <div className="w-10 h-1 bg-foreground/20 rounded-full mb-6" />
          <p className="font-body text-base text-muted-foreground leading-relaxed max-w-sm">
            写日记，上传照片与文件。Gemini AI 悄然读懂你的每一条记录，
            提炼出健康、资产、旅行轨迹，无需整理，自然成册。
          </p>
        </div>
        <div className="relative min-h-[360px] md:min-h-0 overflow-hidden">
          <img src={goalsImg} alt="Journal" className="w-full h-full object-cover object-center" />
        </div>
      </section>

      {/* Chapter III — Full bleed centered */}
      <section className="relative w-full aspect-[16/8] min-h-[460px] overflow-hidden">
        <img src={recordImg} alt="Journal flat lay" className="w-full h-full object-cover object-center scale-105" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <span className="tag-pill bg-white/15 text-white/90 border border-white/25 backdrop-blur-sm mb-5 inline-block">第 三 章</span>
          <h3 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold italic text-on-dark leading-[1.05] mb-5">
            陪你看见<br />目标与现实的距离
          </h3>
          <p className="font-body text-lg text-on-dark/75 max-w-sm leading-relaxed">
            不评判，只是温柔地照亮前路。
          </p>
        </div>
      </section>

      {/* ── FEATURE CARDS GRID ── */}
      <section className="bg-gradient-feature py-20 md:py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 tag-pill bg-secondary text-secondary-foreground mb-5">
              🌟 产品功能
            </div>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold italic text-foreground mb-4">
              六大功能，陪伴成长每一步
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
              从设立目标到 AI 洞察，纪念册是你的人生管理伙伴。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${f.color} rounded-2xl overflow-hidden border border-white/60 shadow-card hover:shadow-lift transition-shadow duration-300 group`}
              >
                <div className="flex flex-col md:flex-row h-full">
                  {/* Text */}
                  <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                    <span className={`tag-pill ${f.tagColor} self-start mb-4`}>
                      {f.icon} {f.tag}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold italic text-foreground mb-3 leading-tight">
                      {f.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                  {/* Image */}
                  <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                    <img
                      src={f.img}
                      alt={f.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Extra features row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              { icon: '💪', tag: '健康管理', title: '记录体重、血压与运动', desc: '每一次坚持，都是给自己最好的礼物。', color: 'from-green-50 to-emerald-50', tagColor: 'bg-green-100 text-green-700' },
              { icon: '💰', tag: '资产追踪', title: '看见财富的增长曲线', desc: '年度资产快照，清晰掌握自己的财务状态。', color: 'from-yellow-50 to-amber-50', tagColor: 'bg-yellow-100 text-yellow-700' },
              { icon: '📅', tag: '人生大事', title: '收录每一个重要时刻', desc: '晋升、旅行、里程碑——人生的高光都值得被铭记。', color: 'from-blue-50 to-indigo-50', tagColor: 'bg-blue-100 text-blue-700' },
            ].map((f, i) => (
              <div key={i} className={`bg-gradient-to-br ${f.color} rounded-2xl p-7 border border-white/60 shadow-card hover:shadow-lift transition-shadow`}>
                <span className={`tag-pill ${f.tagColor} self-start mb-4 inline-block`}>
                  {f.icon} {f.tag}
                </span>
                <h3 className="font-display text-xl font-bold italic text-foreground mb-2">{f.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE CHAPTER IV ── */}
      <section className="max-w-5xl mx-auto px-8 md:px-16 py-24 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-bold italic text-foreground leading-[1.2]">
            "未来的你，会感谢今天没有放弃记录的自己。"
          </p>
        </div>
        <div>
          <span className="tag-pill bg-secondary text-secondary-foreground mb-6 inline-block">第 四 章</span>
          <h3 className="font-display text-2xl font-bold italic text-foreground mb-4">
            回顾，是送给未来的礼物
          </h3>
          <div className="w-10 h-1 bg-foreground/15 rounded-full mb-5" />
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            三年后翻开今天的记录，你会看见一个正在成长、从未放弃的自己。
            那份诚实与坚持，就是最珍贵的女性独立宣言。
          </p>
        </div>
      </section>

    </div>
  );
}
