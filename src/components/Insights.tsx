import { useStore } from '../store/useStore';

export const Insights = () => {
  const { transactions } = useStore();

  const expenses = transactions.filter(t=>t.type==='expense');

  const categoryMap:any={};
  expenses.forEach(t=>{
    categoryMap[t.category]=(categoryMap[t.category]||0)+t.amount;
  });

  const highest = Object.entries(categoryMap).sort((a:any,b:any)=>b[1]-a[1])[0];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">Insights</h2>
      <p>Highest Spending: {highest?.[0] || 'N/A'}</p>
    </div>
  );
};
