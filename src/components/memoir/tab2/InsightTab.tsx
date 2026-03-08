import { useState } from 'react';
import { MemoirData, InsightRecord, InsightData } from '@/types/memoir';
import { generateInsight } from '@/lib/geminiApi';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface InsightTabProps {
  data: MemoirData;
  onUpdate: (data: MemoirData) => void;
}

export default function InsightTab({ data, onUpdate }: InsightTabProps) {
  const [periodType, setPeriodType] = useState<'quarterly' | 'annual'>('quarterly');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedQ, setSelectedQ] = useState(Math.ceil((new Date().getMonth() + 1) / 3));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewingHistory, setViewingHistory] = useState<InsightRecord | null>(null);

  const period = periodType === 'quarterly'
    ? `${selectedYear}-Q${selectedQ}`
    : `${selectedYear}`;

  const currentInsight = viewingHistory || data.insights.find(i => i.period === period);

  const handleGenerate = async () => {
    setError('');
    setLoading(true);
    setViewingHistory(null);

    try {
      const diaries = data.diaries.filter(d => {
        const year = parseInt(d.date.split('-')[0]);
        const month = parseInt(d.date.split('-')[1]);
        if (periodType === 'annual') return year === selectedYear;
        return year === selectedYear && Math.ceil(month / 3) === selectedQ;
      });

      const goals = data.goals.filter(g => g.year === selectedYear);
      const raw = await generateInsight({
        diaries,
        goals,
        period,
        periodType,
        health: data.health,
        assets: data.assets,
        travel: data.travel,
      });

      const record: InsightRecord = {
        id: crypto.randomUUID(),
        period,
        periodType,
        createdAt: new Date().toISOString(),
        data: raw as InsightData,
      };

      onUpdate({ ...data, insights: [record, ...data.insights.filter(i => i.period !== period)] });
    } catch (e: any) {
      setError(e.message || '生成失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const chartData = currentInsight?.data.goalProgress?.map(gp => ({
    name: gp.goal.length > 8 ? gp.goal.slice(0, 8) + '…' : gp.goal,
    fullName: gp.goal,
    estimated: parseInt(gp.estimated) || 0,
    gap: gp.gap,
  })) || [];

  const trendMeta = {
    positive: { label: '趋向积极', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', emoji: '↑' },
    negative: { label: '有些低落', color: 'text-rose-600', bg: 'bg-rose-50 border-rose-200', emoji: '↓' },
    stable: { label: '平稳前行', color: 'text-foreground', bg: 'bg-secondary border-border', emoji: '→' },
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-border pb-6">
        <div>
          <p className="label-sm text-muted-foreground mb-2">Step 03</p>
          <h2 className="font-display text-4xl font-light italic text-foreground">AI 洞察分析</h2>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-5">
        {/* Period type */}
        <div className="flex gap-0 border-b border-border">
          {(['quarterly', 'annual'] as const).map(t => (
            <button
              key={t}
              onClick={() => setPeriodType(t)}
              className={cn(
                'label-sm px-6 py-3 border-b-2 -mb-px transition-all',
                periodType === t ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {t === 'quarterly' ? '季度分析' : '年度总结'}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          {/* Year */}
          <div className="flex items-center gap-3">
            <span className="label-sm text-muted-foreground">年份</span>
            <select
              className="label-sm border-b border-border bg-transparent text-foreground py-1 focus:outline-none focus:border-foreground transition-colors"
              value={selectedYear}
              onChange={e => setSelectedYear(parseInt(e.target.value))}
            >
              {[2023, 2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          {/* Quarter */}
          {periodType === 'quarterly' && (
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(q => (
                <button
                  key={q}
                  onClick={() => setSelectedQ(q)}
                  className={cn(
                    'label-sm px-3 py-1.5 border transition-all',
                    selectedQ === q ? 'border-foreground text-foreground bg-foreground/5' : 'border-border text-muted-foreground hover:border-foreground/50'
                  )}
                >
                  Q{q}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="ml-auto label-sm border border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground transition-all px-8 py-2.5 disabled:opacity-50"
          >
            {loading ? '分析中…' : `生成 ${period} 报告`}
          </button>
        </div>

        {error && (
          <p className="font-body text-sm text-destructive border-l-2 border-destructive pl-4">{error}</p>
        )}
      </div>

      {/* Insight result */}
      {currentInsight ? (
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <p className="label-sm text-muted-foreground">{currentInsight.period} · 洞察报告</p>
            <div className="h-px flex-1 bg-border" />
            <span className="label-sm text-muted-foreground">
              {new Date(currentInsight.createdAt).toLocaleDateString('zh-CN')}
            </span>
          </div>

          {/* Goal progress chart */}
          {chartData.length > 0 && (
            <div>
              <p className="label-sm text-muted-foreground mb-6">目标完成度</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 20, left: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: "'Noto Serif SC', serif" }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} unit="%" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload?.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-background border border-border p-3 text-xs shadow-lift max-w-52 font-body">
                            <div className="font-medium mb-1 text-foreground">{d.fullName}</div>
                            <div className="text-foreground">完成度：{d.estimated}%</div>
                            <div className="text-muted-foreground mt-1 leading-relaxed">{d.gap}</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="estimated" radius={[2, 2, 0, 0]}>
                    {chartData.map((_, i) => {
                      const colors = ['hsl(24 30% 55%)', 'hsl(36 35% 55%)', 'hsl(44 40% 58%)', 'hsl(20 25% 50%)', 'hsl(30 28% 52%)', 'hsl(40 32% 56%)'];
                      return <Cell key={i} fill={colors[i % colors.length]} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div className="divide-y divide-border mt-4">
                {currentInsight.data.goalProgress?.map((gp, i) => (
                  <div key={i} className="py-4 grid grid-cols-12 gap-4 items-start">
                    <div className="col-span-5 font-body text-sm text-foreground">{gp.goal}</div>
                    <div className="col-span-2 label-sm text-muted-foreground">{gp.estimated}</div>
                    <div className="col-span-5 font-body text-xs text-muted-foreground leading-relaxed">{gp.gap}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mindset change */}
          {currentInsight.data.mindsetChange && (() => {
            const trend = currentInsight.data.mindsetChange.trend as 'positive' | 'negative' | 'stable';
            const meta = trendMeta[trend] || trendMeta.stable;
            return (
              <div className={cn('p-6 border', meta.bg)}>
                <div className="flex items-center gap-3 mb-4">
                  <p className="label-sm text-muted-foreground">心态变化</p>
                  <span className={cn('label-sm', meta.color)}>{meta.emoji} {meta.label}</span>
                </div>
                <p className="font-body text-sm text-foreground leading-relaxed mb-4">
                  {currentInsight.data.mindsetChange.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentInsight.data.mindsetChange.keySignals?.map((signal: string, i: number) => (
                    <span key={i} className="label-sm border border-border px-3 py-1.5 text-muted-foreground bg-background">
                      {signal}
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Gap analysis */}
          {currentInsight.data.gapAnalysis && (
            <div>
              <p className="label-sm text-muted-foreground mb-4">差距洞察</p>
              <p className="font-body text-sm text-foreground leading-relaxed border-l-2 border-border pl-6">
                {currentInsight.data.gapAnalysis}
              </p>
            </div>
          )}

          {/* Recommendations */}
          {currentInsight.data.recommendations?.length > 0 && (
            <div>
              <p className="label-sm text-muted-foreground mb-6">给自己的建议</p>
              <div className="divide-y divide-border">
                {currentInsight.data.recommendations.map((rec: string, i: number) => (
                  <div key={i} className="flex items-start gap-6 py-4">
                    <span className="font-display text-2xl font-light text-muted-foreground/30 flex-shrink-0 w-6">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="font-body text-sm text-foreground leading-relaxed pt-1">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="font-display text-5xl font-light italic text-muted-foreground/20 mb-6">
            目标与现实<br />之间的距离
          </p>
          <p className="font-body text-sm text-muted-foreground mb-8 italic">
            先在「目标」和「日记」积累记录，再生成你的专属洞察
          </p>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="label-sm border border-border px-8 py-3 hover:border-foreground transition-all text-muted-foreground hover:text-foreground"
          >
            {loading ? '分析中…' : `生成 ${period} 分析报告`}
          </button>
        </div>
      )}

      {/* History */}
      {data.insights.length > 1 && (
        <div className="border-t border-border pt-8 space-y-4">
          <p className="label-sm text-muted-foreground">历史报告</p>
          <div className="flex flex-wrap gap-2">
            {data.insights.map(record => (
              <button
                key={record.id}
                onClick={() => setViewingHistory(viewingHistory?.id === record.id ? null : record)}
                className={cn(
                  'label-sm px-4 py-2 border transition-all',
                  viewingHistory?.id === record.id
                    ? 'border-foreground text-foreground bg-foreground/5'
                    : 'border-border text-muted-foreground hover:border-foreground/50'
                )}
              >
                {record.period}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
