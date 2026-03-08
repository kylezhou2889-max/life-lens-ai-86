import { MemoirData } from '@/types/memoir';

interface TravelTabProps {
  data: MemoirData;
  onUpdate: (data: MemoirData) => void;
}

export default function TravelTab({ data, onUpdate }: TravelTabProps) {
  const { travel } = data;
  const cities = travel.length;
  const countries = new Set(travel.map(t => t.country).filter(Boolean)).size;

  const deleteTravel = (id: string) => {
    onUpdate({ ...data, travel: travel.filter(t => t.id !== id) });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">🗺 旅行记录</h2>
        <p className="text-muted-foreground text-sm mt-1">AI 自动从日记中提取旅行足迹</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-5 border border-purple-200 shadow-card text-center">
          <p className="text-4xl font-black text-primary">{cities}</p>
          <p className="text-sm text-muted-foreground mt-1">到访城市</p>
        </div>
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 border border-rose-200 shadow-card text-center">
          <p className="text-4xl font-black text-foreground">{countries}</p>
          <p className="text-sm text-muted-foreground mt-1">到访国家</p>
        </div>
      </div>

      {/* Travel list */}
      {travel.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-border p-16 text-center">
          <div className="text-5xl mb-4">✈️</div>
          <p className="text-foreground font-semibold mb-2">还没有旅行记录</p>
          <p className="text-muted-foreground text-sm">写日记时提到旅行地点，AI 会自动提取到这里</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {travel.map(t => (
            <div key={t.id} className="bg-white rounded-2xl p-5 border border-border shadow-card hover:shadow-soft transition-all">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground text-base">📍 {t.city}</h3>
                  {t.country && <p className="text-xs text-muted-foreground">{t.country}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">{t.date}</span>
                  <button
                    onClick={() => deleteTravel(t.id)}
                    className="text-xs text-muted-foreground hover:text-destructive px-1"
                  >
                    ✕
                  </button>
                </div>
              </div>
              {t.note && <p className="text-sm text-muted-foreground leading-relaxed">{t.note}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
