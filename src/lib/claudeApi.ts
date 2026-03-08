export function getApiKey(): string {
  return sessionStorage.getItem('claude_api_key') || '';
}

export function setApiKey(key: string) {
  sessionStorage.setItem('claude_api_key', key);
}

interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string | ClaudeContentBlock[];
}

interface ClaudeContentBlock {
  type: 'text' | 'image';
  text?: string;
  source?: {
    type: 'base64';
    media_type: string;
    data: string;
  };
}

async function callClaude(messages: ClaudeMessage[], systemPrompt?: string): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('请先输入 Claude API Key');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 4096,
      system: systemPrompt,
      messages,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API 错误: ${response.status}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text || '';
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
  const content: ClaudeContentBlock[] = [];

  for (const img of params.imageBase64List) {
    content.push({
      type: 'image',
      source: { type: 'base64', media_type: img.mediaType, data: img.data },
    });
  }

  content.push({
    type: 'text',
    text: `请从以下日记/文件内容中提取结构化信息，严格以 JSON 格式返回，不要有任何说明文字，只返回 JSON。

日记内容：
${params.text}

返回格式：
{
  "health": {
    "height": null 或 数字(cm),
    "weight": null 或 数字(kg),
    "bloodPressure": "" 或 "120/80",
    "events": [{ "date": "YYYY-MM-DD", "type": "exercise|medical|other", "description": "..." }]
  },
  "assets": {
    "items": [{ "label": "...", "amount": 数字, "category": "cash|stock|realestate|other" }],
    "total": 数字或0
  },
  "travel": [{ "city": "...", "country": "...", "date": "YYYY-MM", "note": "..." }],
  "lifeEvents": [{ "year": 数字, "title": "...", "description": "...", "category": "work|family|travel|health|other" }]
}

如果某类信息在日记中没有提到，对应字段返回空数组或null。`,
  });

  const raw = await callClaude([{ role: 'user', content }]);
  
  // Extract JSON from response
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('AI 返回格式异常，请重试');
  
  return JSON.parse(jsonMatch[0]);
}

// Generate insight analysis
export async function generateInsight(params: {
  diaries: { date: string; content: string }[];
  goals: { title: string; category: string; progress: number; year: number; quarter?: number }[];
  period: string;
  periodType: 'quarterly' | 'annual';
}): Promise<{
  period: string;
  goalProgress: any[];
  mindsetChange: any;
  gapAnalysis: string;
  recommendations: string[];
}> {
  const diaryText = params.diaries
    .map(d => `[${d.date}] ${d.content}`)
    .join('\n\n');

  const goalsText = params.goals
    .map(g => `- ${g.title}（分类：${g.category}，当前进度：${g.progress}%）`)
    .join('\n');

  const prompt = `你是一位温暖、有洞察力的人生导师，专注于帮助女性认清自我、实现目标。

分析时间段：${params.period}
分析维度：${params.periodType === 'quarterly' ? '季度' : '年度'}

用户设定的目标：
${goalsText || '（暂无设定目标）'}

用户日记记录：
${diaryText || '（暂无日记记录）'}

请深度分析目标与真实生活之间的差距，以温暖鼓励的语气，严格以 JSON 格式返回分析报告（不要有任何说明文字，只返回 JSON）：

{
  "period": "${params.period}",
  "goalProgress": [
    {
      "goal": "目标名称",
      "category": "分类",
      "estimated": "预估完成度，如 40%",
      "gap": "差距描述，如 落后约20%，需要每周增加运动频率"
    }
  ],
  "mindsetChange": {
    "summary": "本时间段心态变化总结，100-150字，温暖有力",
    "keySignals": ["信号1", "信号2", "信号3"],
    "trend": "positive 或 negative 或 stable"
  },
  "gapAnalysis": "目标与现实差距的综合分析，150-200字，不评判，只分析和支持",
  "recommendations": ["具体可执行建议1", "建议2", "建议3", "建议4"]
}`;

  const raw = await callClaude([{ role: 'user', content: prompt }]);
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('AI 返回格式异常，请重试');
  
  return JSON.parse(jsonMatch[0]);
}
