export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-border bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Top: logo + links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div className="max-w-xs">
            <div className="font-display text-2xl font-semibold text-gradient-rose mb-2">
              我的人生纪念册
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed italic">
              为每一个认真活着、勇敢追求自己人生的她而生。
            </p>
          </div>

          <div className="flex gap-10 text-sm">
            <div className="space-y-2">
              <p className="font-display font-semibold text-foreground text-xs uppercase tracking-wider mb-3">功能</p>
              {['设立目标', '写日记', 'AI 分析', '健康记录'].map(t => (
                <p key={t} className="font-body text-muted-foreground hover:text-foreground cursor-pointer transition-colors">{t}</p>
              ))}
            </div>
            <div className="space-y-2">
              <p className="font-display font-semibold text-foreground text-xs uppercase tracking-wider mb-3">关于</p>
              {['产品理念', '隐私政策', '使用条款', '联系我们'].map(t => (
                <p key={t} className="font-body text-muted-foreground hover:text-foreground cursor-pointer transition-colors">{t}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Divider with botanical ornament */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-border" />
          <span className="text-muted-foreground/30 text-sm">❀ ✦ ❀</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Bottom: quote + copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-muted-foreground italic text-center md:text-left">
            "你愿意记录自己的故事，本身就是一种勇气。"
          </p>
          <p className="font-body text-xs text-muted-foreground">
            © 2025 人生纪念册 · Made with 🌸 & AI
          </p>
        </div>
      </div>
    </footer>
  );
}
