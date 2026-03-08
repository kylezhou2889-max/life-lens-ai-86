import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Goal, GoalCategory, MemoirData } from '@/types/memoir';
import { cn } from '@/lib/utils';

const categories: { value: GoalCategory; label: string; emoji: string; color: string }[] = [
  { value: 'health', label: '健康', emoji: '💪', color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { value: 'finance', label: '财务', emoji: '💰', color: 'bg-green-100 text-green-700 border-green-200' },
  { value: 'learning', label: '学习', emoji: '📚', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'travel', label: '旅行', emoji: '✈️', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { value: 'relationship', label: '关系', emoji: '🌸', color: 'bg-pink-100 text-pink-700 border-pink-200' },
  { value: 'other', label: '其他', emoji: '✨', color: 'bg-gray-100 text-gray-700 border-gray-200' },
];

function getCategoryStyle(cat: GoalCategory) {
  return categories.find(c => c.value === cat) || categories[categories.length - 1];
}

interface GoalsTabProps {
  data: MemoirData;
  onUpdate: (data: MemoirData) => void;
}

export default function GoalsTab({ data, onUpdate }: GoalsTabProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());

  const [form, setForm] = useState<Partial<Goal>>({
    year: new Date().getFullYear(),
    category: 'health',
    progress: 0,
    title: '',
    note: '',
  });

  const years = Array.from(
    new Set([new Date().getFullYear(), new Date().getFullYear() + 1, ...data.goals.map(g => g.year)])
  ).sort((a, b) => b - a);

  const filteredGoals = data.goals.filter(g => g.year === filterYear);

  const openNew = () => {
    setForm({ year: filterYear, category: 'health', progress: 0, title: '', note: '' });
    setEditingGoal(null);
    setDialogOpen(true);
  };

  const openEdit = (goal: Goal) => {
    setForm(goal);
    setEditingGoal(goal);
    setDialogOpen(true);
  };

  const saveGoal = () => {
    if (!form.title?.trim()) return;
    const goal: Goal = {
      id: editingGoal?.id || crypto.randomUUID(),
      year: form.year || new Date().getFullYear(),
      category: form.category as GoalCategory,
      title: form.title,
      progress: form.progress || 0,
      note: form.note || '',
      deadline: form.deadline,
    };
    const goals = editingGoal
      ? data.goals.map(g => g.id === editingGoal.id ? goal : g)
      : [...data.goals, goal];
    onUpdate({ ...data, goals });
    setDialogOpen(false);
  };

  const deleteGoal = (id: string) => {
    onUpdate({ ...data, goals: data.goals.filter(g => g.id !== id) });
  };

  const updateProgress = (id: string, progress: number) => {
    onUpdate({
      ...data,
      goals: data.goals.map(g => g.id === id ? { ...g, progress } : g),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">🎯 设立目标</h2>
          <p className="text-muted-foreground text-sm mt-1">先问自己想要什么，再出发</p>
        </div>
        <Button
          className="gradient-cta text-white border-0 rounded-xl hover:opacity-90"
          onClick={openNew}
        >
          + 添加目标
        </Button>
      </div>

      {/* Year filter */}
      <div className="flex gap-2 flex-wrap">
        {years.map(y => (
          <button
            key={y}
            onClick={() => setFilterYear(y)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium border transition-all',
              filterYear === y
                ? 'gradient-cta text-white border-transparent'
                : 'border-border bg-white text-muted-foreground hover:border-primary/40'
            )}
          >
            {y} 年
          </button>
        ))}
      </div>

      {/* Goals list */}
      {filteredGoals.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-border p-16 text-center">
          <div className="text-5xl mb-4">🎯</div>
          <p className="text-foreground font-semibold mb-2">还没有 {filterYear} 年的目标</p>
          <p className="text-muted-foreground text-sm mb-6">先问自己想要什么，再出发</p>
          <Button
            className="gradient-cta text-white border-0 rounded-xl hover:opacity-90"
            onClick={openNew}
          >
            设立第一个目标
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGoals.map(goal => {
            const cat = getCategoryStyle(goal.category);
            return (
              <div
                key={goal.id}
                className="bg-white rounded-2xl p-5 shadow-card border border-border hover:shadow-soft transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={cn('text-xs px-2 py-1 rounded-full border font-medium', cat.color)}>
                      {cat.emoji} {cat.label}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEdit(goal)}
                      className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-lg hover:bg-muted transition-colors"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-xs text-muted-foreground hover:text-destructive px-2 py-1 rounded-lg hover:bg-destructive/10 transition-colors"
                    >
                      删除
                    </button>
                  </div>
                </div>

                <h3 className="font-semibold text-foreground text-base mb-1">{goal.title}</h3>
                {goal.note && <p className="text-muted-foreground text-xs mb-3">{goal.note}</p>}

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>完成进度</span>
                    <span className="font-semibold text-foreground">{goal.progress}%</span>
                  </div>
                  <Slider
                    value={[goal.progress]}
                    onValueChange={([v]) => updateProgress(goal.id, v)}
                    min={0}
                    max={100}
                    step={5}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Goal dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle>{editingGoal ? '编辑目标' : '新增目标'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label>目标标题</Label>
              <Input
                placeholder="例：每周运动 3 次"
                value={form.title || ''}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label>年份</Label>
              <Input
                type="number"
                value={form.year}
                onChange={e => setForm(f => ({ ...f, year: parseInt(e.target.value) || new Date().getFullYear() }))}
                className="rounded-xl"
                min={2020}
                max={2030}
              />
            </div>

            <div className="space-y-1.5">
              <Label>类别</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, category: cat.value }))}
                    className={cn(
                      'text-xs px-3 py-1.5 rounded-full border font-medium transition-all',
                      form.category === cat.value ? cat.color + ' ring-2 ring-offset-1 ring-primary/30' : 'border-border text-muted-foreground hover:border-primary/40'
                    )}
                  >
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>当前进度：{form.progress}%</Label>
              <Slider
                value={[form.progress || 0]}
                onValueChange={([v]) => setForm(f => ({ ...f, progress: v }))}
                min={0}
                max={100}
                step={5}
              />
            </div>

            <div className="space-y-1.5">
              <Label>备注（可选）</Label>
              <Input
                placeholder="补充说明..."
                value={form.note || ''}
                onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                className="rounded-xl"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setDialogOpen(false)}>
                取消
              </Button>
              <Button
                className="flex-1 gradient-cta text-white border-0 rounded-xl hover:opacity-90"
                onClick={saveGoal}
              >
                保存
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
