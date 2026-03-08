import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Goal, GoalCategory, MemoirData } from '@/types/memoir';
import { cn } from '@/lib/utils';

const categories: { value: GoalCategory; label: string }[] = [
  { value: 'health', label: '健康' },
  { value: 'finance', label: '财务' },
  { value: 'learning', label: '学习' },
  { value: 'travel', label: '旅行' },
  { value: 'relationship', label: '关系' },
  { value: 'other', label: '其他' },
];

interface GoalsTabProps {
  data: MemoirData;
  onUpdate: (data: MemoirData) => void;
}

export default function GoalsTab({ data, onUpdate }: GoalsTabProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());
  const [form, setForm] = useState<Partial<Goal>>({
    year: new Date().getFullYear(), category: 'health', progress: 0, title: '', note: '',
  });

  const years = Array.from(new Set([new Date().getFullYear(), new Date().getFullYear() + 1, ...data.goals.map(g => g.year)])).sort((a, b) => b - a);
  const filteredGoals = data.goals.filter(g => g.year === filterYear);

  const openNew = () => { setForm({ year: filterYear, category: 'health', progress: 0, title: '', note: '' }); setEditingGoal(null); setDialogOpen(true); };
  const openEdit = (goal: Goal) => { setForm(goal); setEditingGoal(goal); setDialogOpen(true); };

  const saveGoal = () => {
    if (!form.title?.trim()) return;
    const goal: Goal = { id: editingGoal?.id || crypto.randomUUID(), year: form.year || new Date().getFullYear(), category: form.category as GoalCategory, title: form.title, progress: form.progress || 0, note: form.note || '' };
    const goals = editingGoal ? data.goals.map(g => g.id === editingGoal.id ? goal : g) : [...data.goals, goal];
    onUpdate({ ...data, goals });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-10">
      <div className="flex items-end justify-between border-b border-border pb-6">
        <div>
          <p className="label-sm text-muted-foreground mb-2">Step 01</p>
          <h2 className="font-display text-4xl font-light italic text-foreground">设立目标</h2>
        </div>
        <button
          onClick={openNew}
          className="label-sm border border-foreground px-6 py-2.5 hover:bg-foreground hover:text-background transition-all"
        >
          添加目标
        </button>
      </div>

      {/* Year tabs */}
      <div className="flex gap-0 border-b border-border">
        {years.map(y => (
          <button
            key={y}
            onClick={() => setFilterYear(y)}
            className={cn(
              'label-sm px-6 py-3 border-b-2 -mb-px transition-all',
              filterYear === y ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            {y}
          </button>
        ))}
      </div>

      {filteredGoals.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display text-5xl font-light italic text-muted-foreground/20 mb-6">先问自己<br />想要什么</p>
          <button onClick={openNew} className="label-sm border border-border px-8 py-3 hover:border-foreground transition-all text-muted-foreground hover:text-foreground">
            设立第一个目标
          </button>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {filteredGoals.map(goal => (
            <div key={goal.id} className="py-6 grid grid-cols-12 gap-6 items-center group">
              <div className="col-span-1">
                <span className="label-sm text-muted-foreground/40">{categories.find(c => c.value === goal.category)?.label}</span>
              </div>
              <div className="col-span-6 md:col-span-7">
                <h3 className="font-body text-base text-foreground">{goal.title}</h3>
                {goal.note && <p className="font-body text-xs text-muted-foreground mt-1">{goal.note}</p>}
              </div>
              <div className="col-span-3 md:col-span-3">
                <Slider
                  value={[goal.progress]}
                  onValueChange={([v]) => onUpdate({ ...data, goals: data.goals.map(g => g.id === goal.id ? { ...g, progress: v } : g) })}
                  min={0} max={100} step={5}
                  className="cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <span className="label-sm text-muted-foreground/50">0</span>
                  <span className="label-sm text-muted-foreground">{goal.progress}%</span>
                </div>
              </div>
              <div className="col-span-2 md:col-span-1 flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(goal)} className="label-sm text-muted-foreground hover:text-foreground">编辑</button>
                <button onClick={() => onUpdate({ ...data, goals: data.goals.filter(g => g.id !== goal.id) })} className="label-sm text-muted-foreground hover:text-destructive">删</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-sm rounded-none border-border bg-background p-10">
          <DialogHeader>
            <p className="label-sm text-muted-foreground mb-3">{editingGoal ? '编辑目标' : '新增目标'}</p>
            <DialogTitle className="font-display text-2xl font-light italic text-foreground">
              {editingGoal ? '修改这个目标' : '写下你想要的'}
            </DialogTitle>
          </DialogHeader>
          <div className="w-8 h-px bg-foreground/20 my-6" />
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="label-sm text-muted-foreground">目标</p>
              <Input value={form.title || ''} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="每周运动 3 次" className="rounded-none border-0 border-b border-border bg-transparent font-body text-sm focus-visible:ring-0 focus-visible:border-foreground px-0 h-9" />
            </div>
            <div className="space-y-2">
              <p className="label-sm text-muted-foreground">年份</p>
              <Input type="number" value={form.year} onChange={e => setForm(f => ({ ...f, year: parseInt(e.target.value) }))} className="rounded-none border-0 border-b border-border bg-transparent font-body text-sm focus-visible:ring-0 focus-visible:border-foreground px-0 h-9" />
            </div>
            <div className="space-y-2">
              <p className="label-sm text-muted-foreground">类别</p>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button key={cat.value} type="button" onClick={() => setForm(f => ({ ...f, category: cat.value }))}
                    className={cn('label-sm px-3 py-1.5 border transition-all', form.category === cat.value ? 'border-foreground text-foreground bg-foreground/5' : 'border-border text-muted-foreground hover:border-foreground/50')}>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="label-sm text-muted-foreground">进度 {form.progress}%</p>
              <Slider value={[form.progress || 0]} onValueChange={([v]) => setForm(f => ({ ...f, progress: v }))} min={0} max={100} step={5} />
            </div>
            <div className="space-y-2">
              <p className="label-sm text-muted-foreground">备注</p>
              <Input value={form.note || ''} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} placeholder="补充说明" className="rounded-none border-0 border-b border-border bg-transparent font-body text-sm focus-visible:ring-0 focus-visible:border-foreground px-0 h-9" />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setDialogOpen(false)} className="flex-1 label-sm border border-border py-3 text-muted-foreground hover:border-foreground hover:text-foreground transition-all">取消</button>
              <button onClick={saveGoal} className="flex-1 label-sm border border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground py-3 transition-all">保存</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
