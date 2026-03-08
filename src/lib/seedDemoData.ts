/**
 * Demo account seeder
 * Account: demo@memoir.com / demo123
 * Seeds full data covering all 6 tabs
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

    // Only seed if demo account doesn't already exist
    if (users[DEMO_EMAIL]) return;

    const account: UserAccount = {
      id: 'demo-user-001',
      email: DEMO_EMAIL,
      name: DEMO_NAME,
      createdAt: '2025-01-01T00:00:00.000Z',
    };

    users[DEMO_EMAIL] = { password: DEMO_PASSWORD, account };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Seed memoir data for the demo user
    const dataKey = `memoir_data_demo-user-001`;
    const existingData = localStorage.getItem(dataKey);
    if (existingData) return; // Don't overwrite if already exists

    const demoData: MemoirData = {
      goals: [
        {
          id: 'goal-001',
          year: 2025,
          category: 'health',
          title: '每周运动 3 次，坚持全年',
          progress: 65,
          note: '主要以瑜伽和慢跑为主',
        },
        {
          id: 'goal-002',
          year: 2025,
          category: 'finance',
          title: '年度储蓄 10 万元',
          progress: 48,
          note: '每月定投 + 减少非必要消费',
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
          note: '有时工作忙会忘记，需要主动',
        },
        {
          id: 'goal-006',
          year: 2025,
          category: 'other',
          title: '学会做 5 道新菜',
          progress: 80,
          note: '已学会：日式煮物、法式炖鸡、抹茶蛋糕、意大利面、墨西哥塔可',
        },
      ],

      diaries: [
        {
          id: 'diary-001',
          date: '2025-03-01',
          content:
            '今天早上 6 点半起床去公园跑步，5 公里，天气很好，樱花快开了。下午读完了《被讨厌的勇气》，很多触动。收到了季度奖金 8000 元，准备全部存入定投账户。',
          files: [],
          createdAt: '2025-03-01T08:30:00.000Z',
        },
        {
          id: 'diary-002',
          date: '2025-03-05',
          content:
            '瑜伽课上教练说我的平衡感进步了很多，开心。今天体重 52.3kg，感觉身体越来越轻盈。晚上和大学室友 Anna 视频了两个小时，聊了很多彼此的生活状态，感觉被充电了。',
          files: [],
          createdAt: '2025-03-05T21:00:00.000Z',
        },
        {
          id: 'diary-003',
          date: '2025-03-10',
          content:
            '这周工作压力很大，连续加班到 10 点，运动计划没能坚持，有点自责。但我提醒自己：偶尔的停顿不是失败，是身体在说需要休息。翻了翻上个月的日记，发现自己真的成长了很多。',
          files: [],
          createdAt: '2025-03-10T22:15:00.000Z',
        },
        {
          id: 'diary-004',
          date: '2025-02-14',
          content:
            '情人节，一个人去咖啡馆读书，意外地很治愈。读的是《一个人住第 9 年》，有很多共鸣。今天股票账户涨了 3%，总资产已经到了 38 万左右。血压测了一下 112/72，很健康。',
          files: [],
          createdAt: '2025-02-14T15:30:00.000Z',
        },
        {
          id: 'diary-005',
          date: '2025-01-20',
          content:
            '去了上海自然博物馆，拍了很多照片。回来做了一道新的菜：日式南瓜煮物，成功了！妈妈尝了说很好吃。这周存了 6000 元进储蓄账户，今年储蓄目标已完成 48%。',
          files: [],
          createdAt: '2025-01-20T19:00:00.000Z',
        },
        {
          id: 'diary-006',
          date: '2024-11-10',
          content:
            '京都！终于来了。岚山的枫叶太美了，红得像燃烧。住的是百年老町家，早上喝抹茶看庭院，觉得人生某个愿望就这样完成了。买了一本手账，决定把每次旅行都认真记录下来。',
          files: [],
          createdAt: '2024-11-10T20:00:00.000Z',
        },
      ],

      health: {
        height: 163,
        weight: 52.3,
        bloodPressure: '112/72',
        events: [
          {
            id: 'he-001',
            date: '2025-03-01',
            type: 'exercise',
            description: '晨跑 5 公里，用时 32 分钟',
          },
          {
            id: 'he-002',
            date: '2025-03-05',
            type: 'exercise',
            description: '瑜伽 60 分钟，重点练习平衡体式',
          },
          {
            id: 'he-003',
            date: '2025-02-20',
            type: 'medical',
            description: '年度体检，各项指标正常，血压 112/72',
          },
          {
            id: 'he-004',
            date: '2025-02-10',
            type: 'exercise',
            description: '室内骑车 45 分钟',
          },
          {
            id: 'he-005',
            date: '2025-01-15',
            type: 'exercise',
            description: '瑜伽 + 普拉提，共 90 分钟',
          },
          {
            id: 'he-006',
            date: '2025-01-08',
            type: 'other',
            description: '开始记录睡眠数据，平均 7.2 小时/晚',
          },
        ],
      },

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
          { year: 2024, total: 330000 },
          { year: 2025, total: 385000 },
        ],
      },

      travel: [
        {
          id: 'travel-001',
          city: '京都',
          country: '日本',
          date: '2024-11',
          note: '岚山红叶，百年町家，人生清单✓',
        },
        {
          id: 'travel-002',
          city: '大理',
          country: '中国',
          date: '2024-07',
          note: '洱海边骑行，苍山下写生，最放松的一次旅行',
        },
        {
          id: 'travel-003',
          city: '首尔',
          country: '韩国',
          date: '2024-04',
          note: '南山公园赏樱，益善洞探店，和朋友的春日约定',
        },
        {
          id: 'travel-004',
          city: '巴黎',
          country: '法国',
          date: '2023-09',
          note: '一个人的巴黎，卢浮宫整整待了一天，买了第一支 Hermès 香水',
        },
        {
          id: 'travel-005',
          city: '成都',
          country: '中国',
          date: '2023-05',
          note: '宽窄巷子、锦里、都江堰，感受到了那种慢下来的城市节奏',
        },
      ],

      lifeEvents: [
        {
          id: 'event-001',
          year: 2025,
          title: '晋升为高级产品经理',
          description: '三年的积累，终于在这一刻得到了认可。',
          category: 'work',
        },
        {
          id: 'event-002',
          year: 2024,
          title: '独自完成京都旅行',
          description: '人生第一次一个人出国旅行，完全靠自己规划和执行。',
          category: 'travel',
        },
        {
          id: 'event-003',
          year: 2024,
          title: '开始系统学习瑜伽',
          description: '从完全不会到获得初级瑜伽证书，身体和心理都更稳了。',
          category: 'health',
        },
        {
          id: 'event-004',
          year: 2023,
          title: '巴黎一个人旅行',
          description: '在巴黎完全独立生活了 10 天，找到了与自己相处的方式。',
          category: 'travel',
        },
        {
          id: 'event-005',
          year: 2023,
          title: '攒下第一个 20 万',
          description: '工作 4 年，通过储蓄和投资实现了第一个理财里程碑。',
          category: 'other',
        },
      ],

      insights: [
        {
          id: 'insight-001',
          period: '2025-Q1',
          periodType: 'quarterly',
          createdAt: '2025-03-08T10:00:00.000Z',
          data: {
            period: '2025 年第一季度',
            goalProgress: [
              {
                goal: '每周运动 3 次，坚持全年',
                category: 'health',
                estimated: '65%',
                gap: '一月份执行较好，二月工作繁忙导致频率下降，实际平均每周约 2 次',
              },
              {
                goal: '年度储蓄 10 万元',
                category: 'finance',
                estimated: '48%',
                gap: '储蓄进度良好，一季度存入 4.8 万，如保持节奏可超额完成',
              },
              {
                goal: '读完 20 本书',
                category: 'learning',
                estimated: '75%',
                gap: '阅读习惯养成很好，15 本已完成，超前于计划进度',
              },
            ],
            mindsetChange: {
              summary:
                '这一季度，你展现出一种成熟而有力的内在韧性。工作高压时期，你没有沉溺于自责，而是选择善待自己。日记中频繁出现"轻盈"、"治愈"、"充电"等词，说明你在主动寻找让自己复原的方式。这种自我关怀的能力，正是独立女性最珍贵的品质之一。',
              keySignals: [
                '工作压力下选择自我接纳而非自责',
                '主动维护重要的人际连接',
                '用读书和旅行作为情绪调节工具',
              ],
              trend: 'positive',
            },
            gapAnalysis:
              '你的目标完成情况整体良好，尤其是阅读和储蓄两项超出预期。运动略有落后，但这背后是工作强度增加的现实压力，不是意志力的问题。值得关注的是：你在工作繁忙时会自动压缩运动时间，这说明运动对你来说尚未成为"不可侵犯的边界"。建议为运动设定一个最低底线，哪怕是 20 分钟散步，让它比休息更优先一点点。',
            recommendations: [
              '为运动设定每周最低底线：即使工作再忙，保证每周至少 2 次 20 分钟以上的活动',
              '每月 15 号做一次储蓄检视，确保定投不因消费波动而中断',
              '读书目标已超前，可以考虑增加一本"让自己不舒服"的书，拓展思维边界',
              '建立一个"快速充电清单"，在高压时期快速激活：如散步、音乐、给朋友发一条消息',
            ],
          },
        },
      ],
    };

    localStorage.setItem(dataKey, JSON.stringify(demoData));
    console.log('[Demo] Test account seeded: demo@memoir.com / demo123');
  } catch (e) {
    console.error('[Demo] Seed failed:', e);
  }
}
