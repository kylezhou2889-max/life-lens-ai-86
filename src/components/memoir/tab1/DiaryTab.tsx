import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MemoirData, Diary, UploadedFile } from '@/types/memoir';
import { parseDiaryContent } from '@/lib/claudeApi';
import { extractTextFromPdf, fileToBase64 } from '@/lib/pdfParser';
import { getApiKey, setApiKey } from '@/lib/claudeApi';
import { cn } from '@/lib/utils';

interface DiaryTabProps {
  data: MemoirData;
  onUpdate: (data: MemoirData) => void;
}

export default function DiaryTab({ data, onUpdate }: DiaryTabProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [apiKey, setApiKeyState] = useState(getApiKey);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = async (rawFiles: FileList | File[]) => {
    const processed: UploadedFile[] = [];
    for (const file of Array.from(rawFiles)) {
      try {
        if (file.type.startsWith('image/')) {
          const base64 = await fileToBase64(file);
          processed.push({ name: file.name, type: 'image', content: base64 });
        } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
          const text = await extractTextFromPdf(file);
          processed.push({ name: file.name, type: 'pdf', content: text });
        } else {
          const text = await file.text();
          processed.push({ name: file.name, type: 'txt', content: text });
        }
      } catch (e) {
        console.error('File processing error:', e);
      }
    }
    setFiles(prev => [...prev, ...processed]);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      await handleFileProcess(e.dataTransfer.files);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim() && files.length === 0) return;
    if (!apiKey.trim()) {
      setStatusMsg('❌ 请先输入 Claude API Key');
      return;
    }

    setApiKey(apiKey);
    setLoading(true);
    setStatusMsg('⏳ AI 正在解析你的日记…');

    try {
      const imageFiles = files
        .filter(f => f.type === 'image')
        .map(f => ({
          data: f.content,
          mediaType: 'image/jpeg',
        }));

      const textContent = [
        content,
        ...files.filter(f => f.type !== 'image').map(f => `[文件 ${f.name}]\n${f.content}`),
      ].join('\n\n');

      const parsed = await parseDiaryContent({ text: textContent, imageBase64List: imageFiles });

      // Save diary
      const diary: Diary = {
        id: crypto.randomUUID(),
        date,
        content,
        files,
        createdAt: new Date().toISOString(),
      };

      // Merge parsed data
      const newData: MemoirData = {
        ...data,
        diaries: [diary, ...data.diaries],
      };

      // Merge health
      if (parsed.health) {
        const h = parsed.health;
        newData.health = {
          ...data.health,
          height: h.height ?? data.health.height,
          weight: h.weight ?? data.health.weight,
          bloodPressure: h.bloodPressure || data.health.bloodPressure,
          events: [...(data.health.events || []), ...(h.events || []).map((e: any) => ({ ...e, id: crypto.randomUUID() }))],
        };
      }

      // Merge assets
      if (parsed.assets?.items?.length) {
        const newItems = parsed.assets.items.map((item: any) => ({ ...item, id: crypto.randomUUID() }));
        newData.assets = {
          ...data.assets,
          items: [...data.assets.items, ...newItems],
          total: parsed.assets.total || data.assets.total,
        };
      }

      // Merge travel
      if (parsed.travel?.length) {
        const newTravel = parsed.travel.map((t: any) => ({ ...t, id: crypto.randomUUID() }));
        newData.travel = [...data.travel, ...newTravel];
      }

      // Merge life events
      if (parsed.lifeEvents?.length) {
        const newEvents = parsed.lifeEvents.map((e: any) => ({ ...e, id: crypto.randomUUID() }));
        newData.lifeEvents = [...data.lifeEvents, ...newEvents];
      }

      onUpdate(newData);
      setContent('');
      setFiles([]);
      setStatusMsg('✅ 解析完成！健康、资产、旅游数据已自动更新');
    } catch (e: any) {
      setStatusMsg(`❌ ${e.message || '解析失败，请重试'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">📝 写日记 & 上传资料</h2>
        <p className="text-muted-foreground text-sm mt-1">每一天都是证据，证明你正在认真活着</p>
      </div>

      {/* API Key */}
      <div className="bg-white rounded-2xl p-5 border border-border shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold">Claude API Key</Label>
          <span className="text-xs text-muted-foreground">仅存于本次会话</span>
        </div>
        <Input
          type="password"
          placeholder="sk-ant-..."
          value={apiKey}
          onChange={e => {
            setApiKeyState(e.target.value);
            setApiKey(e.target.value);
          }}
          className="rounded-xl font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">API Key 仅保存在浏览器 sessionStorage，页面关闭后自动清除</p>
      </div>

      {/* Date + Content */}
      <div className="bg-white rounded-2xl p-5 border border-border shadow-card space-y-4">
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <Label>日期</Label>
            <Input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="rounded-xl w-40"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>今天想说些什么？</Label>
          <Textarea
            placeholder="记录今天的点滴——运动了吗？心情如何？有什么收获或感悟？AI 会帮你从中提取有价值的信息……"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="rounded-xl min-h-36 resize-none text-sm"
          />
        </div>
      </div>

      {/* File upload */}
      <div
        className={cn(
          'border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all',
          dragOver ? 'border-primary bg-primary/5' : 'border-border bg-white hover:border-primary/40'
        )}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="text-3xl mb-2">📎</div>
        <p className="text-foreground font-medium text-sm">拖拽上传或点击选择文件</p>
        <p className="text-muted-foreground text-xs mt-1">支持 图片（JPG/PNG）、PDF、TXT</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.txt"
          className="hidden"
          onChange={e => e.target.files && handleFileProcess(e.target.files)}
        />
      </div>

      {/* Attached files */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20">
              <span>{f.type === 'image' ? '🖼' : f.type === 'pdf' ? '📄' : '📝'}</span>
              <span>{f.name}</span>
              <button
                onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}
                className="hover:text-destructive ml-1"
              >×</button>
            </div>
          ))}
        </div>
      )}

      {/* Status */}
      {statusMsg && (
        <div className={cn(
          'rounded-xl px-4 py-3 text-sm',
          statusMsg.startsWith('✅') ? 'bg-green-50 text-green-700 border border-green-200' :
          statusMsg.startsWith('❌') ? 'bg-destructive/10 text-destructive border border-destructive/20' :
          'bg-primary/10 text-primary border border-primary/20'
        )}>
          {statusMsg}
        </div>
      )}

      <Button
        className="w-full gradient-cta text-white border-0 rounded-xl py-6 text-base hover:opacity-90"
        onClick={handleSubmit}
        disabled={loading || (!content.trim() && files.length === 0)}
      >
        {loading ? '⏳ AI 解析中…' : '✨ 提交并解析'}
      </Button>

      {/* Recent diaries */}
      {data.diaries.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">最近记录</h3>
          {data.diaries.slice(0, 5).map(d => (
            <div key={d.id} className="bg-white rounded-2xl p-4 border border-border shadow-card">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-primary font-medium">{d.date}</span>
                {d.files && d.files.length > 0 && (
                  <span className="text-xs text-muted-foreground">· {d.files.length} 个附件</span>
                )}
              </div>
              <p className="text-sm text-foreground line-clamp-3">{d.content || '（无文字内容）'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
