import { useState } from 'react';
import { Button } from '@/components/ui/button';
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

      const raw = await generateInsight({ diaries, goals, period, periodType });

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
    name: gp.goal.length > 7 ? gp.goal.slice(0, 7) + '…' : gp.goal,
    fullName: gp.goal,
    estimated: parseInt(gp.estimated) || 0,
    gap: gp.gap,
  })) || [];

  const trendMeta = {
    positive: { label: '趋向积极', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', emoji: '↑' },
    negative: { label: '有些低落', color: 'text-rose-500', bg: 'bg-rose-50 border-rose-200', emoji: '↓' },
    stable: { label: '平稳前行', color: 'text-primary', bg: 'bg-secondary border-border', emoji: '→' },
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-foreground">洞察分析</h2>
        <p className="text-muted-foreground text-sm mt-1 font-body italic">看清目标与真实生活的距离，不评判，只陪伴</p>
      </div>

      {/* Controls */}
      <div className="bg-card rounded-2xl p-5 border border-border shadow-card space-y-4">
        <div className="flex gap-2">
          {(['quarterly', 'annual'] as const).map(t => (
            <button
              key={t}
              onClick={() => setPeriodType(t)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-body border transition-all',
                periodType === t
                  ? 'gradient-cta text-primary-foreground border-transparent shadow-soft'
                  : 'border-border text-muted-foreground hover:border-primary/40'
              )}
            >
              {t === 'quarterly' ? '按季度' : '按年度'}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground font-body">年份</span>
            <select
              className="text-sm border border-border rounded-xl px-3 py-2 bg-background font-body"
              value={selectedYear}
              onChange={e => setSelectedYear(parseInt(e.target.value))}
            >
              {[2023, 2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          {periodType === 'quarterly' && (
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(q => (
                <button
                  key={q}
                  onClick={() => setSelectedQ(q)}
                  className={cn(
                    'px-3 py-2 rounded-xl text-sm font-body border transition-all',
                    selectedQ === q
                      ? 'bg-primary text-primary-foreground border-transparent'
                      : 'border-border text-muted-foreground hover:border-primary/40'
                  )}
                >
                  Q{q}
                </button>
              ))}
            </div>
          )}

          <Button
            className="gradient-cta text-primary-foreground border-0 rounded-xl hover:opacity-90 ml-auto font-body"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? '✦ 分析中…' : `✦ 生成 ${period} 洞察`}
          </Button>
        </div>

        {error && (
          <p className="text-destructive text-sm bg-destructive/10 px-4 py-2 rounded-xl border border-destructive/20 font-body">
            {error}
          </p>
        )}
      </div>

      {/* Insight result */}
      {currentInsight ? (
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="font-body text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
              ✦ {currentInsight.period} · 洞察报告
            </span>
            <span className="text-xs text-muted-foreground font-body">
              {new Date(currentInsight.createdAt).toLocaleDateString('zh-CN')}
            </span>
          </div>

          {/* Goal progress chart */}
          {chartData.length > 0 && (
            <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
              <h3 className="font-display text-base font-semibold text-foreground mb-4">目标完成度</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 20, left: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: 'Lora, serif' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload?.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-card border border-border rounded-xl p-3 text-xs shadow-soft max-w-52 font-body">
                            <div className="font-semibold mb-1 text-foreground">{d.fullName}</div>
                            <div className="text-primary">完成度：{d.estimated}%</div>
                            <div className="text-muted-foreground mt-1 leading-relaxed">{d.gap}</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="estimated" radius={[8, 8, 0, 0]}>
                    {chartData.map((_, i) => {
                      const hues = [348, 300, 270, 240, 210, 180];
                      return <Cell key={i} fill={`hsl(${hues[i % hues.length]} 45% 62%)`} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-4 space-y-3">
                {currentInsight.data.goalProgress?.map((gp, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-0.5 text-base">·</span>
                    <div>
                      <span className="font-semibold text-foreground text-sm font-body">{gp.goal}</span>
                      <span className="text-xs text-primary ml-2 bg-primary/10 px-2 py-0.5 rounded-full">{gp.estimated}</span>
                      <p className="text-xs text-muted-foreground mt-0.5 font-body leading-relaxed">{gp.gap}</p>
                    </div>
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
              <div className={cn('rounded-2xl p-5 border shadow-card', meta.bg)}>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-display text-base font-semibold text-foreground">心态变化</h3>
                  <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full border', meta.color, meta.bg)}>
                    {meta.emoji} {meta.label}
                  </span>
                </div>
                <p className="text-sm text-foreground font-body leading-relaxed mb-4">
                  {currentInsight.data.mindsetChange.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentInsight.data.mindsetChange.keySignals?.map((signal: string, i: number) => (
                    <span key={i} className="text-xs bg-card/80 text-foreground px-3 py-1 rounded-full border border-border font-body">
                      {signal}
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Gap analysis */}
          {currentInsight.data.gapAnalysis && (
            <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
              <h3 className="font-display text-base font-semibold text-foreground mb-3">差距洞察</h3>
              <p className="text-sm text-foreground font-body leading-relaxed">{currentInsight.data.gapAnalysis}</p>
            </div>
          )}

          {/* Recommendations */}
          {currentInsight.data.recommendations?.length > 0 && (
            <div className="bg-parchment rounded-2xl p-5 border border-border shadow-card">
              <h3 className="font-display text-base font-semibold text-foreground mb-4">给自己的建议</h3>
              <div className="space-y-3">
                {currentInsight.data.recommendations.map((rec: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center font-semibold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-foreground font-body leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-border p-16 text-center bg-card/50">
          <div className="font-display text-4xl mb-4 text-muted-foreground/30">✦</div>
          <p className="font-display text-foreground font-semibold mb-2">还没有 {period} 的洞察报告</p>
          <p className="text-muted-foreground text-sm font-body italic mb-6">
            先在「目标」和「日记」Tab 积累数据，再生成属于你的专属洞察
          </p>
        </div>
      )}

      {/* History */}
      {data.insights.length > 1 && (
        <div className="space-y-3">
          <h3 className="font-display text-base font-semibold text-foreground">历史报告</h3>
          <div className="flex flex-wrap gap-2">
            {data.insights.map(record => (
              <button
                key={record.id}
                onClick={() => setViewingHistory(viewingHistory?.id === record.id ? null : record)}
                className={cn(
                  'text-xs px-3 py-2 rounded-xl border font-body transition-all',
                  viewingHistory?.id === record.id
                    ? 'bg-primary text-primary-foreground border-transparent'
                    : 'border-border text-muted-foreground hover:border-primary/40'
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
