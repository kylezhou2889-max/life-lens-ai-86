export interface Diary {
  id: string;
  date: string;
  content: string;
  files?: UploadedFile[];
  createdAt: string;
}

export interface UploadedFile {
  name: string;
  type: 'image' | 'pdf' | 'txt';
  content: string; // base64 for image, extracted text for pdf/txt
}

export interface HealthData {
  height: number | null;
  weight: number | null;
  bloodPressure: string;
  events: HealthEvent[];
}

export interface HealthEvent {
  id: string;
  date: string;
  type: 'exercise' | 'medical' | 'other';
  description: string;
}

export interface AssetItem {
  id: string;
  label: string;
  amount: number;
  category: 'cash' | 'stock' | 'realestate' | 'other';
}

export interface AssetData {
  total: number;
  items: AssetItem[];
  history: AssetSnapshot[];
}

export interface AssetSnapshot {
  year: number;
  total: number;
}

export interface TravelRecord {
  id: string;
  city: string;
  country: string;
  date: string;
  note: string;
  imageBase64?: string;
}

export interface LifeEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  category: 'work' | 'family' | 'travel' | 'health' | 'other';
}

export type GoalCategory = 'health' | 'finance' | 'learning' | 'travel' | 'relationship' | 'other';

export interface Goal {
  id: string;
  year: number;
  quarter?: number; // 1-4, optional
  title: string;
  category: GoalCategory;
  progress: number; // 0-100
  note: string;
  deadline?: string;
}

export interface InsightGoalProgress {
  goal: string;
  category: GoalCategory;
  estimated: string;
  gap: string;
}

export interface MindsetChange {
  summary: string;
  keySignals: string[];
  trend: 'positive' | 'negative' | 'stable';
}

export interface InsightData {
  period: string; // e.g. "2024-Q1" or "2024"
  goalProgress: InsightGoalProgress[];
  mindsetChange: MindsetChange;
  gapAnalysis: string;
  recommendations: string[];
}

export interface InsightRecord {
  id: string;
  period: string;
  periodType: 'quarterly' | 'annual';
  createdAt: string;
  data: InsightData;
}

export interface MemoirData {
  diaries: Diary[];
  health: HealthData;
  assets: AssetData;
  travel: TravelRecord[];
  lifeEvents: LifeEvent[];
  goals: Goal[];
  insights: InsightRecord[];
}

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export const defaultMemoirData: MemoirData = {
  diaries: [],
  health: {
    height: null,
    weight: null,
    bloodPressure: '',
    events: [],
  },
  assets: {
    total: 0,
    items: [],
    history: [],
  },
  travel: [],
  lifeEvents: [],
  goals: [],
  insights: [],
};
