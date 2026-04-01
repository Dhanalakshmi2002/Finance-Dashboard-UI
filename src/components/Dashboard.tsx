import { useStore } from '../store/useStore';
import { SummaryCard } from './SummaryCard';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

export const Dashboard = () => {
  const { transactions } = useStore();

  const income = transactions.filter(t => t.type === 'income').reduce((a,b)=>a+b.amount,0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((a,b)=>a+b.amount,0);

  const categoryData = Object.values(
    transactions.reduce((acc:any,t)=>{
      if(t.type==='expense'){
        acc[t.category] = acc[t.category] || {name:t.category,value:0};
        acc[t.category].value += t.amount;
      }
      return acc;
    },{})
  );

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4">
        <SummaryCard title="Balance" value={income-expense}/>
        <SummaryCard title="Income" value={income}/>
        <SummaryCard title="Expense" value={expense}/>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="h-64 bg-white p-4 rounded shadow">
          <ResponsiveContainer>
            <LineChart data={transactions}>
              <XAxis dataKey="date"/>
              <YAxis/>
              <Tooltip/>
              <Line dataKey="amount"/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="h-64 bg-white p-4 rounded shadow">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={categoryData} dataKey="value">
                {categoryData.map((_,i)=><Cell key={i}/>)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
