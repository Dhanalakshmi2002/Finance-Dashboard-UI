import { useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Transactions } from './components/Transactions';
import { Insights } from './components/Insights';
import { RoleSwitcher } from './components/RoleSwitcher';
import { useStore } from './store/useStore';
import { mockData } from './data/mockData';

export default function App() {
  const { transactions } = useStore();

  useEffect(()=>{
    if(transactions.length===0){
      useStore.setState({ transactions: mockData });
    }
  },[]);

  return (
    <div className="p-6 space-y-6">
      <RoleSwitcher/>
      <Dashboard/>
      <Transactions/>
      <Insights/>
    </div>
  );
}
