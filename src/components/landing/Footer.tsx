export default function Footer() {
  return (
    <footer className="border-t border-border py-16 px-8 md:px-16 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-2xl font-bold italic text-foreground mb-2">人生纪念册</p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
              为每一个认真生活、<br />勇敢做自己的她而生。
            </p>
            <div className="flex gap-2">
              {['🌸', '⭐', '💫'].map((e, i) => (
                <span key={i} className="text-lg">{e}</span>
              ))}
            </div>
          </div>
          {[
            { title: '产品功能', links: ['设立目标', '写日记', 'AI 洞察', '健康记录', '旅行足迹', '资产追踪'] },
            { title: '了解产品', links: ['产品理念', '如何使用', '常见问题', '更新日志'] },
            { title: '关于我们', links: ['隐私政策', '使用条款', '联系我们'] },
          ].map((col, i) => (
            <div key={i}>
              <p className="font-body font-semibold text-sm text-foreground mb-5">{col.title}</p>
              <div className="space-y-3">
                {col.links.map(l => (
                  <p key={l} className="font-body text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">{l}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-display text-base italic text-muted-foreground">
            "你愿意记录自己的故事，本身就是一种勇气。"
          </p>
          <p className="font-body text-sm text-muted-foreground">
            © 2025 人生纪念册 · 用心记录每一天
          </p>
        </div>
      </div>
    </footer>
  );
}
