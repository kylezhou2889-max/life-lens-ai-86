import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MemoirData, HealthData } from '@/types/memoir';

interface HealthTabProps {
  data: MemoirData;
  onUpdate: (data: MemoirData) => void;
}

function EditableMetric({ label, value, unit, onSave }: {
  label: string;
  value: string | number | null;
  unit: string;
  onSave: (v: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value ?? ''));

  return (
    <div className="bg-white rounded-2xl p-5 border border-border shadow-card">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {editing ? (
        <div className="flex gap-2 items-center mt-2">
          <Input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            className="rounded-xl h-8 text-sm w-24"
            autoFocus
          />
          <span className="text-sm text-muted-foreground">{unit}</span>
          <Button size="sm" className="h-8 text-xs gradient-cta text-white border-0 rounded-lg hover:opacity-90"
            onClick={() => { onSave(draft); setEditing(false); }}>
            保存
          </Button>
        </div>
      ) : (
        <button
          className="flex items-baseline gap-1 hover:opacity-70 transition-opacity mt-1"
          onClick={() => { setDraft(String(value ?? '')); setEditing(true); }}
        >
          <span className="text-2xl font-bold text-foreground">{value ?? '--'}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </button>
      )}
    </div>
  );
}

export default function HealthTab({ data, onUpdate }: HealthTabProps) {
  const h = data.health;

  const bmi = h.height && h.weight
    ? (h.weight / ((h.height / 100) ** 2)).toFixed(1)
    : null;

  const updateField = (key: keyof HealthData, value: any) => {
    onUpdate({ ...data, health: { ...h, [key]: value } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">💪 健康状态</h2>
        <p className="text-muted-foreground text-sm mt-1">点击数值即可编辑</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <EditableMetric label="身高" value={h.height} unit="cm"
          onSave={v => updateField('height', parseFloat(v) || null)} />
        <EditableMetric label="体重" value={h.weight} unit="kg"
          onSave={v => updateField('weight', parseFloat(v) || null)} />
        <EditableMetric label="血压" value={h.bloodPressure} unit="mmHg"
          onSave={v => updateField('bloodPressure', v)} />
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 border border-rose-200 shadow-card">
          <p className="text-xs text-muted-foreground mb-1">BMI</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-foreground">{bmi ?? '--'}</span>
            {bmi && (
              <span className="text-xs text-muted-foreground ml-1">
                {parseFloat(bmi) < 18.5 ? '偏瘦' : parseFloat(bmi) < 24 ? '正常' : parseFloat(bmi) < 28 ? '偏重' : '肥胖'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="bg-white rounded-2xl p-5 border border-border shadow-card">
        <h3 className="font-semibold text-foreground mb-4">运动 & 就医记录</h3>
        {h.events.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-6">
            写日记时提到运动或就医，AI 会自动提取到这里
          </p>
        ) : (
          <div className="space-y-3">
            {h.events.slice(0, 10).map(event => (
              <div key={event.id} className="flex items-start gap-3">
                <span className="text-lg">{event.type === 'exercise' ? '🏃' : event.type === 'medical' ? '🏥' : '📌'}</span>
                <div>
                  <span className="text-xs text-primary font-medium">{event.date}</span>
                  <p className="text-sm text-foreground">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
