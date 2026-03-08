import walkImg from '@/assets/section-walk.jpg';
import goalsImg from '@/assets/section-goals.jpg';
import recordImg from '@/assets/section-record.jpg';

export default function ProductStory() {
  return (
    <div id="chapters">

      {/* ── INTRO TEXT ── */}
      <section className="max-w-2xl mx-auto px-8 py-24 md:py-32 text-center">
        <p className="label-sm text-muted-foreground mb-8">
          一个关于女性与自我的故事
        </p>
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light italic leading-[1.15] text-foreground mb-8">
          "记录，是最温柔的<br />自我宣告。"
        </h2>
        <div className="w-8 h-px bg-foreground/30 mx-auto mb-8" />
        <p className="font-body text-base text-muted-foreground leading-relaxed">
          每一天的日记，每一个写下的目标，每一次诚实的回顾——
          都是你对自己人生的主动掌舵。
          纪念册不只是记录工具，它是你与未来自己之间的约定。
        </p>
      </section>

      {/* ── CHAPTER I · Full-bleed image with text overlay ── */}
      <section className="relative w-full aspect-[16/9] min-h-[480px] overflow-hidden">
        <img
          src={walkImg}
          alt="Woman walking with her journal"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
        {/* Text bottom-right corner */}
        <div className="absolute bottom-10 right-8 md:right-16 text-right max-w-xs">
          <p className="label-sm text-on-dark/60 mb-3">第 一 章</p>
          <h3 className="font-display text-4xl md:text-5xl font-light italic text-on-dark leading-tight mb-3">
            先问自己<br />想要什么
          </h3>
          <p className="font-body text-sm text-on-dark/75 leading-relaxed">
            设立目标，是给未来的你<br />写下第一封信。
          </p>
        </div>
      </section>

      {/* ── CHAPTER II · Text left, Image right ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[560px]">
        {/* Text side */}
        <div className="flex flex-col justify-center px-12 md:px-20 py-20 bg-background">
          <p className="label-sm text-muted-foreground mb-6">第 二 章</p>
          <h3 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light italic text-foreground leading-[1.15] mb-6">
            每一天，<br />
            都是证据。
          </h3>
          <div className="w-8 h-px bg-foreground/20 mb-6" />
          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
            写日记，上传照片与文件。Gemini AI 悄然读懂你的每一条记录，
            提炼出健康、资产、旅行轨迹，无需整理，自然成册。
          </p>
        </div>
        {/* Image side */}
        <div className="relative min-h-[360px] md:min-h-0 overflow-hidden">
          <img
            src={goalsImg}
            alt="Hands holding a journal with pressed flowers"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* ── CHAPTER III · Full-bleed image, text overlaid ── */}
      <section className="relative w-full aspect-[16/8] min-h-[440px] overflow-hidden">
        <img
          src={recordImg}
          alt="Journal flat lay with roses and compass"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-black/20" />
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <p className="label-sm text-on-dark/60 mb-5">第 三 章</p>
          <h3 className="font-display text-[clamp(2.5rem,5.5vw,5rem)] font-light italic text-on-dark leading-[1.1] mb-5">
            陪你看见<br />目标与现实的距离
          </h3>
          <p className="font-body text-sm text-on-dark/75 max-w-sm leading-relaxed">
            不评判，只是温柔地照亮前路。
          </p>
        </div>
      </section>

      {/* ── CHAPTER IV · Text right, minimal layout ── */}
      <section className="max-w-5xl mx-auto px-8 md:px-16 py-24 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Pull quote */}
        <div>
          <p className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light italic text-foreground leading-[1.2]">
            "未来的你，会感谢今天没有放弃记录的自己。"
          </p>
        </div>
        {/* Body text */}
        <div>
          <p className="label-sm text-muted-foreground mb-6">第 四 章</p>
          <h3 className="font-display text-2xl font-light italic text-foreground mb-4">
            回顾，是送给未来的礼物
          </h3>
          <div className="w-8 h-px bg-foreground/20 mb-5" />
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            三年后翻开今天的记录，你会看见一个正在成长、从未放弃的自己。
            那份诚实与坚持，就是最珍贵的女性独立宣言。
          </p>
        </div>
      </section>

    </div>
  );
}
