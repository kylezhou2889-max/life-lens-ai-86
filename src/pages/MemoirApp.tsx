import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MemoirLayout from '@/components/memoir/Layout';
import GoalsTab from '@/components/memoir/tab0/GoalsTab';
import DiaryTab from '@/components/memoir/tab1/DiaryTab';
import InsightTab from '@/components/memoir/tab2/InsightTab';
import HealthTab from '@/components/memoir/tab3/HealthTab';
import AssetsTab from '@/components/memoir/tab4/AssetsTab';
import TravelTab from '@/components/memoir/tab5/TravelTab';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAuth } from '@/hooks/useAuth';
import { MemoirData, defaultMemoirData } from '@/types/memoir';

export default function MemoirApp() {
  const [activeTab, setActiveTab] = useState('goals');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const storageKey = currentUser ? `memoir_data_${currentUser.id}` : 'memoir_data_guest';
  const [data, setData] = useLocalStorage<MemoirData>(storageKey, defaultMemoirData);

  useEffect(() => {
    if (!currentUser) navigate('/');
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const renderTab = () => {
    switch (activeTab) {
      case 'goals':   return <GoalsTab data={data} onUpdate={setData} />;
      case 'diary':   return <DiaryTab data={data} onUpdate={setData} />;
      case 'health':  return <HealthTab data={data} onUpdate={setData} />;
      case 'assets':  return <AssetsTab data={data} onUpdate={setData} />;
      case 'travel':  return <TravelTab data={data} onUpdate={setData} />;
      case 'insight': return <InsightTab data={data} onUpdate={setData} />;
      default:        return <GoalsTab data={data} onUpdate={setData} />;
    }
  };

  return (
    <MemoirLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTab()}
    </MemoirLayout>
  );
}
