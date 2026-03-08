
## 调整后产品逻辑 + 全新主页设计

### 核心变更

**1. 产品流程重新排序（Tab顺序调整）**
原来：日记 → 健康 → 资产 → 旅游 → 事件 → 目标+洞察
调整后：**目标 → 日记/上传 → 分析洞察 → 健康 → 资产 → 旅游**

**2. 新增主页 Landing Page（/ 路由）**
应用内部变为 /app 路由

---

### 文件结构

```text
src/
├── pages/
│   ├── Index.tsx              ← 主页 Landing Page（全新）
│   └── App.tsx                ← 应用主界面（6个Tab）
├── components/
│   ├── landing/
│   │   ├── Hero.tsx           ← 主视觉 + Slogan + CTA
│   │   ├── ProductStory.tsx   ← 四个产品意义模块
│   │   ├── Demo.tsx           ← 产品 Demo 展示
│   │   ├── AuthModal.tsx      ← 注册/登录弹窗
│   │   └── Footer.tsx
│   └── memoir/
│       ├── Layout.tsx
│       ├── tab0/ GoalsTab.tsx   ← Step 1：设立目标
│       ├── tab1/ DiaryTab.tsx   ← Step 2：写日记/上传
│       ├── tab2/ InsightTab.tsx ← Step 3：分析洞察（目标vs现实）
│       ├── tab3/ HealthTab.tsx
│       ├── tab4/ AssetsTab.tsx
│       └── tab5/ TravelTab.tsx
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useClaude.ts
│   └── useAuth.ts             ← 账户状态（localStorage模拟）
├── lib/
│   ├── claudeApi.ts
│   └── pdfParser.ts
└── types/memoir.ts
```

---

### 主页设计（女性化 + 情感价值 + 轻女权）

**Hero 区**
- 全屏渐变背景（玫瑰粉 → 薰衣草紫 → 靛蓝）
- 主标题：「你的人生，值得被好好记录」
- 副标题：「不是为了证明给谁看，而是为了不辜负自己」
- CTA 按钮：「开始我的纪念册」→ 触发注册弹窗

**四大产品意义模块（横排卡片）**
| 图标 | 标题 | 文案 |
|------|------|------|
| 📝 | 记录生成 | 「每一天都是证据，证明你正在认真活着」 |
| 🎯 | 设立追求 | 「先问自己想要什么，再出发」 |
| ✨ | 达成目标 | 「AI陪你看清差距，不评判，只支持」 |
| 🌸 | 回顾过往 | 「未来的你，会感谢今天没有放弃记录的自己」 |

**Demo 展示区**
- 截图卡片展示3个关键界面（目标设立 / 日记上传 / AI分析报告）
- 带动画入场效果

**注册/登录弹窗（AuthModal）**
- 邮箱 + 密码（localStorage 模拟，无需后端）
- 注册成功后跳转 /app
- 已有账号可直接登录

---

### 调整后的 Tab 流程逻辑

```text
Step 1 — 目标（GoalsTab）
  设立年度/季度目标 → 分类（健康/财务/学习/旅行）→ 进度条

Step 2 — 日记 & 上传（DiaryTab）
  写日记/上传图片/PDF → Claude 解析内容
  → 自动更新健康/资产/旅游/事件数据

Step 3 — AI 洞察分析（InsightTab）★核心
  读取：所有日记内容 + 已设目标列表
  Claude 分析：
    - 目标完成度评估（逐条对比）
    - 目标 vs 真实生活的差距分析
    - 心态变化趋势
    - 具体可执行建议
  展示：差距柱状图 + 心态曲线 + 文字报告

Tab 4-6 — 健康/资产/旅游（辅助记录）
```

---

### 实现顺序

1. `src/index.css` 更新配色（玫瑰粉 + 靛蓝主色）
2. 类型定义 `types/memoir.ts` + `lib/claudeApi.ts` + `lib/pdfParser.ts`
3. `useLocalStorage.ts` + `useAuth.ts`
4. Landing Page（`pages/Index.tsx`）：Hero + Story + Demo + AuthModal
5. App 主界面框架（`pages/App.tsx`）：Layout + Tab 路由
6. GoalsTab（Step 1）
7. DiaryTab（Step 2）+ Claude 解析
8. InsightTab（Step 3）+ 差距分析 + Recharts图表
9. HealthTab / AssetsTab / TravelTab（辅助）
10. `App.tsx` 路由配置（/ 和 /app）

---

### 配色方案

```text
主色：靛蓝 #4F6EF7（行动/按钮）
渐变：玫瑰粉 #F7B8C4 → 薰衣草 #C8A8F7 → 靛蓝 #A8B8F7
背景：纯白 #FFFFFF
文字：深灰 #1A1A2E
卡片：白色 + 微阴影
```
