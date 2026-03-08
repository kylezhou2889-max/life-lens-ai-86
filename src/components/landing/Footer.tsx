export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div className="text-xl font-bold text-foreground mb-1">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--gradient-cta)' }}>
              我的人生纪念册
            </span>
          </div>
          <p className="text-muted-foreground text-sm">为每一个认真活着的你而生</p>
        </div>
        <div className="flex gap-8 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">隐私政策</a>
          <a href="#" className="hover:text-foreground transition-colors">使用条款</a>
          <a href="#" className="hover:text-foreground transition-colors">联系我们</a>
        </div>
        <p className="text-muted-foreground text-xs">
          © 2024 人生纪念册. Made with 🌸
        </p>
      </div>
    </footer>
  );
}
