import { useState } from 'react';
import { useStore } from '../store/useStore';

export const Transactions = () => {
  const { transactions, role, addTransaction, updateTransactions } = useStore();

  const [filter,setFilter]=useState('all');
  const [search,setSearch]=useState('');
  const [sort,setSort]=useState('');

  const filtered = transactions
    .filter(t=>filter==='all'||t.type===filter)
    .filter(t=>t.category.toLowerCase().includes(search.toLowerCase()));

  const sorted = [...filtered].sort((a,b)=>{
    if(sort==='amount') return b.amount-a.amount;
    if(sort==='date') return new Date(b.date).getTime()-new Date(a.date).getTime();
    return 0;
  });

  const handleAdd=()=>{
    addTransaction({
      id:Date.now(),
      date:new Date().toISOString().split('T')[0],
      amount:1000,
      category:'New',
      type:'expense'
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">Transactions</h2>

      <div className="flex gap-3 my-3">
        <input placeholder="Search" onChange={(e)=>setSearch(e.target.value)} className="border p-2"/>
        
        <select onChange={(e)=>setFilter(e.target.value)} className="border p-2">
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select onChange={(e)=>setSort(e.target.value)} className="border p-2">
          <option value="">Sort</option>
          <option value="amount">Amount</option>
          <option value="date">Date</option>
        </select>

        {role==='admin' && (
          <button onClick={handleAdd} className="bg-blue-500 text-white px-3 py-2">
            Add
          </button>
        )}
      </div>

      {sorted.length===0 ? <p>No Data</p> : (
        <table className="w-full border">
          <thead>
            <tr>
              <th>Date</th><th>Amount</th><th>Category</th><th>Type</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(t=>(
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>₹{t.amount}</td>
                <td>{t.category}</td>
                <td>{t.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
