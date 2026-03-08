import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MemoirData, AssetItem } from '@/types/memoir';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface AssetsTabProps {
  data: MemoirData;
  onUpdate: (data: MemoirData) => void;
}

const categoryLabels: Record<string, string> = {
  cash: '💵 现金/存款',
  stock: '📈 股票/基金',
  realestate: '🏠 房产',
  other: '✨ 其他',
};

function EditableAmount({ item, onSave }: { item: AssetItem; onSave: (amount: number) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(item.amount));

  return (
    <div className="bg-white rounded-2xl p-4 border border-border shadow-card flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">{categoryLabels[item.category] || item.category}</p>
        <p className="text-sm font-medium text-foreground mt-0.5">{item.label}</p>
      </div>
      {editing ? (
        <div className="flex items-center gap-2">
          <Input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            className="rounded-xl h-8 w-28 text-sm"
            autoFocus
          />
          <Button size="sm" className="h-8 text-xs gradient-cta text-white border-0 rounded-lg hover:opacity-90"
            onClick={() => { onSave(parseFloat(draft) || 0); setEditing(false); }}>
            保存
          </Button>
        </div>
      ) : (
        <button
          className="text-lg font-bold text-foreground hover:opacity-70 transition-opacity"
          onClick={() => { setDraft(String(item.amount)); setEditing(true); }}
        >
          ¥{item.amount.toLocaleString()}
        </button>
      )}
    </div>
  );
}

export default function AssetsTab({ data, onUpdate }: AssetsTabProps) {
  const { assets } = data;

  const updateItemAmount = (id: string, amount: number) => {
    const items = assets.items.map(it => it.id === id ? { ...it, amount } : it);
    const total = items.reduce((sum, it) => sum + it.amount, 0);
    onUpdate({ ...data, assets: { ...assets, items, total } });
  };

  const total = assets.items.reduce((sum, it) => sum + it.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">💰 资产状况</h2>
        <p className="text-muted-foreground text-sm mt-1">点击金额即可编辑</p>
      </div>

      {/* Total */}
      <div className="gradient-card rounded-3xl p-6 border border-border shadow-soft">
        <p className="text-sm text-muted-foreground">总资产估算</p>
        <p className="text-4xl font-black text-foreground mt-1">
          ¥{total.toLocaleString()}
        </p>
      </div>

      {/* Items */}
      {assets.items.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-border p-12 text-center">
          <div className="text-4xl mb-3">💰</div>
          <p className="text-muted-foreground text-sm">写日记时提到财务信息，AI 会自动识别并记录在这里</p>
        </div>
      ) : (
        <div className="space-y-3">
          {assets.items.map(item => (
            <EditableAmount key={item.id} item={item} onSave={v => updateItemAmount(item.id, v)} />
          ))}
        </div>
      )}

      {/* History chart */}
      {assets.history.length > 1 && (
        <div className="bg-white rounded-2xl p-5 border border-border shadow-card">
          <h3 className="font-semibold text-foreground mb-4">资产变化趋势</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={assets.history}>
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `¥${(v / 10000).toFixed(0)}万`} />
              <Tooltip formatter={(v: number) => [`¥${v.toLocaleString()}`, '总资产']} />
              <Line type="monotone" dataKey="total" stroke="hsl(231 91% 65%)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
