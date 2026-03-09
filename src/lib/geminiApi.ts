// Google Gemini API integration
// API key should be provided via environment variable VITE_GEMINI_API_KEY
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-3-flash-preview';
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

if (!GEMINI_API_KEY) {
  console.error('Error: VITE_GEMINI_API_KEY environment variable is not set. Please configure your .env file with your Gemini API key.');
}

interface GeminiPart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

async function callGemini(parts: GeminiPart[], systemInstruction?: string): Promise<string> {
  const body: any = {
    contents: [{ role: 'user', parts }],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 4096,
    },
  };

  if (systemInstruction) {
    body.system_instruction = { parts: [{ text: systemInstruction }] };
  }

  const response = await fetch(`${BASE_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = err?.error?.message || `API 错误: ${response.status}`;
    if (response.status === 429) throw new Error('请求过于频繁，请稍后重试');
    if (response.status === 403) throw new Error('API Key 无效或权限不足');
    throw new Error(msg);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// Parse diary/file content into structured memoir data
export async function parseDiaryContent(params: {
  text: string;
  imageBase64List: { data: string; mediaType: string }[];
}): Promise<Partial<{
  health: { height?: number; weight?: number; bloodPressure?: string; events?: any[] };
  assets: { items?: any[]; total?: number };
  travel: any[];
  lifeEvents: any[];
}>> {
  const parts: GeminiPart[] = [];

  for (const img of params.imageBase64List) {
    parts.push({
      inlineData: {
        mimeType: img.mediaType || 'image/jpeg',
        data: img.data,
      },
    });
  }

  parts.push({
    text: `你是一个细腻的信息提取助手，帮助用户从日记和文件中提取结构化的生活数据。

请从以下内容中提取结构化信息，只返回 JSON，不要有任何说明文字或代码块标记。

日记/文件内容：
${params.text}

返回格式（JSON）：
{
  "health": {
    "height": null或数字(cm),
    "weight": null或数字(kg),
    "bloodPressure": ""或"120/80",
    "events": [
      { "date": "YYYY-MM-DD", "type": "exercise或medical或other", "description": "..." }
    ]
  },
  "assets": {
    "items": [
      { "label": "...", "amount": 数字, "category": "cash或stock或realestate或other" }
    ],
    "total": 数字或0
  },
  "travel": [
    { "city": "...", "country": "...", "date": "YYYY-MM", "note": "..." }
  ],
  "lifeEvents": [
    { "year": 数字, "title": "...", "description": "...", "category": "work或family或travel或health或other" }
  ]
}

如果没有相关信息，返回空数组或null。`,
  });

  const raw = await callGemini(parts);

  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('AI 返回格式异常，请重试');

  return JSON.parse(jsonMatch[0]);
}

// Generate insight analysis comparing goals vs reality
export async function generateInsight(params: {
  diaries: { date: string; content: string }[];
  goals: { title: string; category: string; progress: number; year: number }[];
  period: string;
  periodType: 'quarterly' | 'annual';
  health?: {
    height: number | null;
    weight: number | null;
    bloodPressure: string;
    events: { date: string; type: string; description: string }[];
  };
  assets?: {
    total: number;
    items: { label: string; amount: number; category: string }[];
    history: { year: number; total: number }[];
  };
  travel?: { city: string; country: string; date: string; note: string }[];
}): Promise<{
  period: string;
  goalProgress: any[];
  mindsetChange: any;
  gapAnalysis: string;
  recommendations: string[];
}> {
  const diaryText = params.diaries
    .map(d => `【${d.date}】${d.content}`)
    .join('\n\n');

  const goalsText = params.goals.length > 0
    ? params.goals.map(g => {
        const categoryLabel: Record<string, string> = {
          health: '健康', finance: '财务', learning: '学习',
          travel: '旅行', relationship: '人际关系', other: '其他',
        };
        return `• ${g.title}（分类：${categoryLabel[g.category] || g.category}，用户自评进度：${g.progress}%）`;
      }).join('\n')
    : '（用户暂未设立目标）';

  // Build health context
  let healthContext = '';
  if (params.health) {
    const h = params.health;
    const parts: string[] = [];
    if (h.height) parts.push(`身高：${h.height}cm`);
    if (h.weight) parts.push(`体重：${h.weight}kg`);
    if (h.bloodPressure) parts.push(`血压：${h.bloodPressure}`);
    const recentEvents = (h.events || []).slice(0, 5).map(e => `  - ${e.date} [${e.type}] ${e.description}`).join('\n');
    if (parts.length > 0 || recentEvents) {
      healthContext = `\n\n💪 健康数据：\n${parts.join('，')}\n近期健康记录：\n${recentEvents || '（无记录）'}`;
    }
  }

  // Build asset context
  let assetContext = '';
  if (params.assets && params.assets.total > 0) {
    const a = params.assets;
    const itemsText = (a.items || []).map(i => `  - ${i.label}：${i.amount.toLocaleString()} 元`).join('\n');
    const historyText = (a.history || []).slice(-3).map(h => `  - ${h.year}年：${h.total.toLocaleString()} 元`).join('\n');
    assetContext = `\n\n💰 资产数据：\n当前总资产：${a.total.toLocaleString()} 元\n资产构成：\n${itemsText}\n历年变化：\n${historyText}`;
  }

  // Build travel context
  let travelContext = '';
  if (params.travel && params.travel.length > 0) {
    const travelText = params.travel.slice(0, 5).map(t => `  - ${t.date} ${t.city}（${t.country}）：${t.note}`).join('\n');
    travelContext = `\n\n✈️ 旅行记录：\n${travelText}`;
  }

  const systemPrompt = `你是一位温柔而睿智的人生陪伴者，专注于帮助女性深度认识自我、看见成长。你的分析充满洞察力，语言温暖有力，既能看见差距，也能看见光。请务必结合用户提供的所有数据（目标、日记、健康、资产、旅行）进行综合分析。`;

  const prompt = `请为用户生成一份深度人生洞察报告，综合分析她在各个生活维度的目标达成情况。

📅 分析时间段：${params.period}（${params.periodType === 'quarterly' ? '季度分析' : '年度总结'}）

🎯 用户设立的目标：
${goalsText}

📔 用户在此时间段的日记记录：
${diaryText || '（此时间段暂无日记记录，请基于目标和其他数据进行分析）'}${healthContext}${assetContext}${travelContext}

请综合以上所有维度的数据，分析目标达成情况、真实生活状态，以温暖、不评判的语气撰写报告。
- goalProgress 必须包含用户设立的每一个目标，结合日记、健康、资产、旅行数据来估算真实完成度
- 对于健康目标，参考健康记录数据；对于财务目标，参考资产数据；对于旅行目标，参考旅行记录
- 只返回 JSON，不要代码块标记

{
  "period": "${params.period}",
  "goalProgress": [
    {
      "goal": "目标名称（与用户设立的目标完全一致）",
      "category": "分类英文key：health/finance/learning/travel/relationship/other",
      "estimated": "结合所有数据估算的完成度，如 65%",
      "gap": "差距与原因分析，30-60字，温暖具体，结合实际数据"
    }
  ],
  "mindsetChange": {
    "summary": "本时间段心态与情绪变化的深度观察，120-160字，温暖有力，帮助用户看见自己的内在成长",
    "keySignals": ["从日记中发现的心态信号1", "信号2", "信号3"],
    "trend": "positive或negative或stable"
  },
  "gapAnalysis": "目标与现实差距的综合分析，160-200字。结合健康、资产、旅行等多维数据，用温暖的视角解读差距背后的原因",
  "recommendations": [
    "具体可执行的建议1，结合用户实际生活数据",
    "建议2",
    "建议3",
    "建议4"
  ]
}`;

  const raw = await callGemini([{ text: prompt }], systemPrompt);

  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('AI 返回格式异常，请重试');

  return JSON.parse(jsonMatch[0]);
}
