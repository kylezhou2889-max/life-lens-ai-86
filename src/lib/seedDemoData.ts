/**
 * Demo account seeder
 * Account: demo@memoir.com / demo123
 * Seeds full data covering all 6 tabs with logically consistent entries
 */
import { MemoirData, UserAccount } from '@/types/memoir';

const DEMO_EMAIL = 'demo@memoir.com';
const DEMO_PASSWORD = 'demo123';
const DEMO_NAME = '林晓';
const USERS_KEY = 'memoir_users';

export function seedDemoAccountIfNeeded() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const users: Record<string, any> = raw ? JSON.parse(raw) : {};
    if (users[DEMO_EMAIL]) return;

    const account: UserAccount = {
      id: 'demo-user-001',
      email: DEMO_EMAIL,
      name: DEMO_NAME,
      createdAt: '2025-01-01T00:00:00.000Z',
    };
    users[DEMO_EMAIL] = { password: DEMO_PASSWORD, account };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const dataKey = `memoir_data_demo-user-001`;
    if (localStorage.getItem(dataKey)) return;

    const demoData: MemoirData = {
      // ─── GOALS (2025) ─────────────────────────────────────────────
      goals: [
        {
          id: 'goal-001',
          year: 2025,
          category: 'health',
          title: '每周运动 3 次，坚持全年',
          progress: 65,
          note: '主要以瑜伽和慢跑为主，工作忙时会压缩',
        },
        {
          id: 'goal-002',
          year: 2025,
          category: 'finance',
          title: '年度储蓄 10 万元',
          progress: 48,
          note: '每月定投 + 减少非必要消费，Q1 已存 4.8 万',
        },
        {
          id: 'goal-003',
          year: 2025,
          category: 'learning',
          title: '读完 20 本书',
          progress: 75,
          note: '已读 15 本，以文学和心理学为主',
        },
        {
          id: 'goal-004',
          year: 2025,
          category: 'travel',
          title: '去京都看一次秋叶',
          progress: 100,
          note: '11月已完成，美到流泪',
        },
        {
          id: 'goal-005',
          year: 2025,
          category: 'relationship',
          title: '每月至少与老朋友深度聊天一次',
          progress: 55,
          note: '一、二、三月各聊了一次，四五月有所遗漏',
        },
        {
          id: 'goal-006',
          year: 2025,
          category: 'other',
          title: '学会做 5 道新菜',
          progress: 80,
          note: '已学会：日式煮物、法式炖鸡、抹茶蛋糕、意大利面，还差最后一道',
        },
      ],

      // ─── DIARIES (与目标高度一致，AI 可从日记中推断各目标达成率) ───
      diaries: [
        {
          id: 'diary-001',
          date: '2025-03-15',
          content:
            '本周运动情况：周一晨跑 5km、周三瑜伽 60min、周六骑行 45min，圆满完成"每周运动3次"的目标。' +
            '今天发了季度奖金 8000 元，全部转入理财账户。Q1 累计储蓄 48000 元，完成年度储蓄目标的 48%。' +
            '下午读完了《被讨厌的勇气》——今年第 8 本，距离 20 本目标完成 40%。' +
            '晚上和大学室友 Anna 视频了 2 小时，聊了彼此的工作状态，三月的"深度聊天"任务达成✓。',
          files: [],
          createdAt: '2025-03-15T22:00:00.000Z',
        },
        {
          id: 'diary-002',
          date: '2025-03-05',
          content:
            '瑜伽课教练说我的平衡感进步了很多，真的很开心。今天体重 52.3kg，血压 112/72，非常健康。' +
            '这是本月第 2 次运动（周一跑步 + 今天瑜伽），还差一次就完成本周目标。' +
            '今天在书店买了《蛤蟆先生去看心理医生》，是今年的第 7 本书。' +
            '同时把 2000 元零花钱存入了余额宝，Q1 储蓄进度继续推进。',
          files: [],
          createdAt: '2025-03-05T21:00:00.000Z',
        },
        {
          id: 'diary-003',
          date: '2025-03-10',
          content:
            '这周工作连续加班到 10 点，只运动了 1 次（周三瑜伽），没能达到每周 3 次的目标，有点自责。' +
            '但想起日记里写过：偶尔的停顿不是失败，是身体说需要休息。' +
            '翻了翻 2 月的日记，2 月共运动 9 次（每周约 2.3 次），还差一点点达到每周 3 次。' +
            '阅读进度很好：2 月读了《一个人住第 9 年》《被嫌弃的松子的一生》2 本，累计 9 本。',
          files: [],
          createdAt: '2025-03-10T23:00:00.000Z',
        },
        {
          id: 'diary-004',
          date: '2025-02-14',
          content:
            '情人节，一个人去咖啡馆读书，读的是《一个人住第 9 年》，今年第 6 本，共读书目标 30% 完成。' +
            '股票账户今天涨了 3%，资产总额已到 385000 元，离年度储蓄目标 100000 还差一半。' +
            '今天做了一道新菜：法式炖鸡，成功！今年学会的第 2 道菜，离"学会 5 道新菜"目标完成 40%。' +
            '血压 112/72，非常健康，体重维持在 52kg 左右。',
          files: [],
          createdAt: '2025-02-14T15:00:00.000Z',
        },
        {
          id: 'diary-005',
          date: '2025-01-20',
          content:
            '去了上海自然博物馆，回来做了一道新菜：日式南瓜煮物，成功！今年第 1 道新菜 ✓。' +
            '妈妈尝了说很好吃，超有成就感。' +
            '本月储蓄进展：1 月存了 16000 元（定投 10000 + 零花钱 6000），完成年度目标 16%。' +
            '本月运动：1/6 慢跑、1/8 瑜伽、1/13 骑行、1/15 瑜伽+普拉提、1/20 慢跑，共 5 次，' +
            '月度完成约 1.25 次/周，低于每周 3 次目标，需要在 2 月加强。' +
            '今年第一本书《百年孤独》读完，感觉打开了新世界。',
          files: [],
          createdAt: '2025-01-20T19:00:00.000Z',
        },
        {
          id: 'diary-006',
          date: '2024-11-10',
          content:
            '京都！！终于来了！岚山枫叶太美了，红得像燃烧一样。住的是百年老町家，早上喝抹茶看庭院。' +
            '"去京都看一次秋叶"这个目标，完成了 ✓✓✓ 太有成就感。' +
            '旅途中还买了一本手账，决定把每次旅行都认真记录下来。' +
            '顺便研究了一下旅行中遇到的日式料理，打算回去学着做抹茶蛋糕。',
          files: [],
          createdAt: '2024-11-10T20:00:00.000Z',
        },
        {
          id: 'diary-007',
          date: '2025-02-22',
          content:
            '和高中同学 小涵 吃了一顿饭，两个小时聊了很多——她最近换了工作，我们聊到了人生选择与自我期待。' +
            '二月的"深度聊天"任务打卡 ✓。' +
            '今天做了意大利面（肉酱版），是今年第 3 道新菜！煮的时候差点忘了放盐，下次要注意。' +
            '本月第 3 次运动（今天快走 40min），2 月运动进度追上来了，本周已达 3 次目标 ✓。',
          files: [],
          createdAt: '2025-02-22T20:30:00.000Z',
        },
        {
          id: 'diary-008',
          date: '2025-03-28',
          content:
            '3 月运动总结：共运动 10 次（跑步 4 次 + 瑜伽 4 次 + 骑行 2 次），均值约 2.5 次/周，' +
            '比目标的 3 次/周稍低，但已比 1 月有明显进步。' +
            '3 月读完《蛤蟆先生去看心理医生》《人间失格》，Q1 共读 9 本书，年度目标完成 45%，' +
            '超过时间进度（3/12=25%），阅读目标非常顺利！' +
            'Q1 储蓄汇总：1 月 16000 + 2 月 16000 + 3 月 16000（奖金 8000 + 日常 8000）= 48000 元，' +
            '完成年度目标 48%。按此节奏，年底完成 10 万储蓄目标没有问题。' +
            '今天做了抹茶蛋糕卷，是今年第 4 道新菜！还差最后一道就完成年度目标。',
          files: [],
          createdAt: '2025-03-28T22:00:00.000Z',
        },
      ],

      // ─── HEALTH (与日记一致) ──────────────────────────────────────
      health: {
        height: 163,
        weight: 52.3,
        bloodPressure: '112/72',
        events: [
          { id: 'he-001', date: '2025-03-15', type: 'exercise', description: '晨跑 5km，用时 32 分钟' },
          { id: 'he-002', date: '2025-03-12', type: 'exercise', description: '骑行 45 分钟' },
          { id: 'he-003', date: '2025-03-10', type: 'exercise', description: '瑜伽 60 分钟' },
          { id: 'he-004', date: '2025-03-05', type: 'exercise', description: '瑜伽 60 分钟，重点练习平衡体式' },
          { id: 'he-005', date: '2025-03-03', type: 'exercise', description: '晨跑 5km' },
          { id: 'he-006', date: '2025-02-22', type: 'exercise', description: '快走 40 分钟' },
          { id: 'he-007', date: '2025-02-20', type: 'medical', description: '年度体检，各项指标正常，血压 112/72，体重 52.3kg' },
          { id: 'he-008', date: '2025-02-15', type: 'exercise', description: '瑜伽 60 分钟' },
          { id: 'he-009', date: '2025-02-10', type: 'exercise', description: '骑行 45 分钟' },
          { id: 'he-010', date: '2025-01-20', type: 'exercise', description: '晨跑 5km' },
          { id: 'he-011', date: '2025-01-15', type: 'exercise', description: '瑜伽 + 普拉提，共 90 分钟' },
          { id: 'he-012', date: '2025-01-13', type: 'exercise', description: '骑行 45 分钟' },
        ],
      },

      // ─── ASSETS (与日记一致，Q1 总储蓄 +48000) ───────────────────
      assets: {
        total: 385000,
        items: [
          { id: 'asset-001', label: '现金及活期存款', amount: 85000, category: 'cash' },
          { id: 'asset-002', label: '基金定投（沪深 300）', amount: 120000, category: 'stock' },
          { id: 'asset-003', label: 'A 股股票账户', amount: 95000, category: 'stock' },
          { id: 'asset-004', label: '余额宝', amount: 45000, category: 'cash' },
          { id: 'asset-005', label: '父母房产（估值份额）', amount: 40000, category: 'realestate' },
        ],
        history: [
          { year: 2022, total: 180000 },
          { year: 2023, total: 260000 },
          { year: 2024, total: 337000 },
          { year: 2025, total: 385000 },
        ],
      },

      // ─── TRAVEL ───────────────────────────────────────────────────
      travel: [
        { id: 'travel-001', city: '京都', country: '日本', date: '2024-11', note: '岚山红叶，百年町家，人生清单✓ 完成' },
        { id: 'travel-002', city: '大理', country: '中国', date: '2024-07', note: '洱海边骑行，苍山下写生，最放松的一次旅行' },
        { id: 'travel-003', city: '首尔', country: '韩国', date: '2024-04', note: '南山公园赏樱，益善洞探店，和朋友的春日约定' },
        { id: 'travel-004', city: '巴黎', country: '法国', date: '2023-09', note: '一个人的巴黎，卢浮宫整整待了一天，买了第一支 Hermès 香水' },
        { id: 'travel-005', city: '成都', country: '中国', date: '2023-05', note: '宽窄巷子、锦里、都江堰，感受到那种慢下来的城市节奏' },
      ],

      // ─── LIFE EVENTS ──────────────────────────────────────────────
      lifeEvents: [
        { id: 'event-001', year: 2025, title: '晋升为高级产品经理', description: '三年积累，终于得到认可。', category: 'work' },
        { id: 'event-002', year: 2024, title: '独自完成京都旅行并完成年度旅行目标', description: '人生第一次一个人出国旅行，完全靠自己规划执行。', category: 'travel' },
        { id: 'event-003', year: 2024, title: '开始系统学习瑜伽', description: '从完全不会到获得初级瑜伽证书，身体和心理都更稳了。', category: 'health' },
        { id: 'event-004', year: 2023, title: '巴黎独自旅行 10 天', description: '在巴黎完全独立生活，找到了与自己相处的方式。', category: 'travel' },
        { id: 'event-005', year: 2023, title: '攒下第一个 20 万', description: '工作 4 年，通过储蓄和投资实现第一个理财里程碑。', category: 'other' },
      ],

      // ─── AI INSIGHT REPORTS (pre-seeded, placed at end) ──────────
      insights: [
        {
          id: 'insight-q1-2025',
          period: '2025-Q1',
          periodType: 'quarterly',
          createdAt: '2025-03-31T10:00:00.000Z',
          data: {
            period: '2025 年第一季度',
            goalProgress: [
              {
                goal: '每周运动 3 次，坚持全年',
                category: 'health',
                estimated: '73%',
                gap: 'Q1 共运动约 28 次（目标 39 次），均值约 2.2 次/周。一月最弱（1.3次/周），三月已提升至 2.5 次/周，趋势向好。体重 52.3kg、血压 112/72，身体状态优秀。',
              },
              {
                goal: '年度储蓄 10 万元',
                category: 'finance',
                estimated: '48%',
                gap: 'Q1 共储蓄 48000 元（月均 16000 元），完成年度目标 48%，超过时间进度（25%），表现出色。资产总额已达 385000 元，较年初增长约 48000 元。',
              },
              {
                goal: '读完 20 本书',
                category: 'learning',
                estimated: '45%',
                gap: 'Q1 读完 9 本，完成年度目标 45%，超过时间进度（25%）近一倍，阅读习惯养成极好。涵盖文学、心理学、成长类书籍，质量与数量并重。',
              },
              {
                goal: '去京都看一次秋叶',
                category: 'travel',
                estimated: '100%',
                gap: '已于 2024 年 11 月完成，岚山红叶，百年町家，人生清单圆满打卡✓。',
              },
              {
                goal: '每月至少与老朋友深度聊天一次',
                category: 'relationship',
                estimated: '75%',
                gap: 'Q1 共完成 3 次深度聊天（1月 Anna、2月 小涵、3月 Anna），每月一次的节奏基本保持，感情维护有意识有行动。',
              },
              {
                goal: '学会做 5 道新菜',
                category: 'other',
                estimated: '80%',
                gap: 'Q1 已学会 4 道菜（日式煮物、法式炖鸡、意大利面、抹茶蛋糕卷），完成 80%，仅差最后一道即达成目标。',
              },
            ],
            mindsetChange: {
              summary:
                '这一季度，你展现出一种成熟而有力的内在韧性。工作高压时期，你没有沉溺于自责，而是选择善待自己、接纳"偶尔的停顿不是失败"。日记中频繁出现"完成""打卡""进步"等词，说明你不只在行动，更在主动追踪与庆祝自己的成长。这种"目标感 + 自我接纳"的组合，正是独立女性最珍贵的内在力量。',
              keySignals: [
                '工作压力下主动选择自我接纳而非自责',
                '储蓄和阅读目标均超额完成，正向反馈充足',
                '主动维护友谊连接，人际关系有意识经营',
              ],
              trend: 'positive',
            },
            gapAnalysis:
              '你的 Q1 整体表现超出预期：储蓄完成 48%（目标进度 25%）、阅读完成 45%（目标进度 25%）、新菜学会 4 道（目标进度 80%）——三项均大幅超前。唯有运动目标（均值 2.2 次/周 vs 目标 3 次）略有落后，且背后是真实的工作强度压力，不是意志力问题。值得关注的是：三月运动频次已回升至 2.5 次/周，说明你有自我调整的能力。京都旅行目标已于去年完成，人生愿望单上的钩越来越多。',
            recommendations: [
              '运动：为每周最低底线设为 2 次（哪怕 20 分钟散步），在日历中提前 block 时间，让"动起来"比"不动"更省力',
              '储蓄：已超额完成，建议将多余储蓄（超出月度计划部分）拨入风险稍高的基金，发挥复利潜力',
              '阅读：目标超前，可主动加入一本"让自己不舒服"的书（如认知类、历史类），拓展思维边界',
              '新菜：只差最后一道，建议本月末安排一次"料理挑战日"，邀请朋友来品鉴，同时完成社交目标',
            ],
          },
        },
      ],
    };

    localStorage.setItem(dataKey, JSON.stringify(demoData));
    console.log('[Demo] Seeded: demo@memoir.com / demo123');
  } catch (e) {
    console.error('[Demo] Seed failed:', e);
  }
}
