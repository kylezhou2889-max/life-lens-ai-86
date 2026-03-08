import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MemoirData, InsightRecord, InsightData } from '@/types/memoir';
import { generateInsight } from '@/lib/claudeApi';
import { getApiKey } from '@/lib/claudeApi';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface InsightTabProps {
  data: MemoirData;
  onUpdate: (data: MemoirData) => void;
}

const periodTypeLabels = { quarterly: '按季度', annual: '按年' };

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
    if (!getApiKey()) {
      setError('请先在「日记」页面输入 Claude API Key');
      return;
    }
    setError('');
    setLoading(true);
    setViewingHistory(null);

    try {
      // Filter diaries by period
      const diaries = data.diaries.filter(d => {
        const year = parseInt(d.date.split('-')[0]);
        const month = parseInt(d.date.split('-')[1]);
        if (periodType === 'annual') return year === selectedYear;
        const q = Math.ceil(month / 3);
        return year === selectedYear && q === selectedQ;
      });

      const goals = data.goals.filter(g => {
        if (periodType === 'annual') return g.year === selectedYear;
        return g.year === selectedYear;
      });

      const raw = await generateInsight({ diaries, goals, period, periodType });

      const record: InsightRecord = {
        id: crypto.randomUUID(),
        period,
        periodType,
        createdAt: new Date().toISOString(),
        data: raw as InsightData,
      };

      const insights = [record, ...data.insights.filter(i => i.period !== period)];
      onUpdate({ ...data, insights });
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

  const trendColor = {
    positive: 'text-green-600',
    negative: 'text-rose-500',
    stable: 'text-primary',
  };

  const trendEmoji = {
    positive: '📈',
    negative: '📉',
    stable: '➡️',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">✨ AI 洞察分析</h2>
        <p className="text-muted-foreground text-sm mt-1">看清目标与现实的差距，不评判，只支持</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl p-5 border border-border shadow-card space-y-4">
        <div className="flex gap-2">
          {(['quarterly', 'annual'] as const).map(t => (
            <button
              key={t}
              onClick={() => setPeriodType(t)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium border transition-all',
                periodType === t
                  ? 'gradient-cta text-white border-transparent'
                  : 'border-border text-muted-foreground hover:border-primary/40'
              )}
            >
              {periodTypeLabels[t]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">年份</span>
            <select
              className="text-sm border border-border rounded-xl px-3 py-2 bg-background"
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
                    'px-3 py-2 rounded-xl text-sm border transition-all',
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
            className="gradient-cta text-white border-0 rounded-xl hover:opacity-90 ml-auto"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? '⏳ 分析中…' : `✨ 生成 ${period} 分析`}
          </Button>
        </div>

        {error && (
          <p className="text-destructive text-sm bg-destructive/10 px-4 py-2 rounded-xl border border-destructive/20">
            ❌ {error}
          </p>
        )}
      </div>

      {/* Insight result */}
      {currentInsight ? (
        <div className="space-y-5">
          {/* Period badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                📊 {currentInsight.period} 分析报告
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(currentInsight.createdAt).toLocaleDateString('zh-CN')}
              </span>
            </div>
          </div>

          {/* Goal progress chart */}
          {chartData.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-border shadow-card">
              <h3 className="font-semibold text-foreground mb-4">目标完成度评估</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 20, left: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload?.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-white border border-border rounded-xl p-3 text-xs shadow-soft max-w-48">
                            <div className="font-semibold mb-1">{d.fullName}</div>
                            <div className="text-primary">完成度：{d.estimated}%</div>
                            <div className="text-muted-foreground mt-1">{d.gap}</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="estimated" radius={[8, 8, 0, 0]}>
                    {chartData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={`hsl(${231 + i * 20} 80% ${60 + i * 5}%)`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-4 space-y-2">
                {currentInsight.data.goalProgress?.map((gp, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-primary font-bold mt-0.5">→</span>
                    <div>
                      <span className="font-medium text-foreground">{gp.goal}</span>
                      <span className="text-muted-foreground ml-2">{gp.gap}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mindset change */}
          {currentInsight.data.mindsetChange && (
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-5 border border-purple-200 shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold text-foreground">心态变化</h3>
                <span className={cn('text-base', trendColor[currentInsight.data.mindsetChange.trend])}>
                  {trendEmoji[currentInsight.data.mindsetChange.trend]}
                </span>
                <span className={cn('text-xs font-medium', trendColor[currentInsight.data.mindsetChange.trend])}>
                  {{ positive: '趋向积极', negative: '有些低落', stable: '保持稳定' }[currentInsight.data.mindsetChange.trend]}
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-3">
                {currentInsight.data.mindsetChange.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {currentInsight.data.mindsetChange.keySignals?.map((signal, i) => (
                  <span key={i} className="text-xs bg-white/70 text-foreground px-3 py-1 rounded-full border border-purple-200">
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Gap analysis */}
          {currentInsight.data.gapAnalysis && (
            <div className="bg-white rounded-2xl p-5 border border-border shadow-card">
              <h3 className="font-semibold text-foreground mb-3">差距分析</h3>
              <p className="text-sm text-foreground leading-relaxed">{currentInsight.data.gapAnalysis}</p>
            </div>
          )}

          {/* Recommendations */}
          {currentInsight.data.recommendations?.length > 0 && (
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 border border-rose-200 shadow-card">
              <h3 className="font-semibold text-foreground mb-3">🌸 AI 建议</h3>
              <div className="space-y-2">
                {currentInsight.data.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-primary font-bold text-sm mt-0.5">{i + 1}.</span>
                    <p className="text-sm text-foreground">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-border p-16 text-center">
          <div className="text-5xl mb-4">✨</div>
          <p className="text-foreground font-semibold mb-2">还没有 {period} 的分析报告</p>
          <p className="text-muted-foreground text-sm mb-6">
            先在「目标」和「日记」页面记录数据，再生成 AI 洞察分析
          </p>
        </div>
      )}

      {/* History */}
      {data.insights.length > 1 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">历史报告</h3>
          <div className="flex flex-wrap gap-2">
            {data.insights.map(record => (
              <button
                key={record.id}
                onClick={() => setViewingHistory(viewingHistory?.id === record.id ? null : record)}
                className={cn(
                  'text-xs px-3 py-2 rounded-xl border transition-all',
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
