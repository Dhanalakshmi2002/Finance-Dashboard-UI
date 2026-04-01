import { create } from 'zustand';

export type Transaction = {
  id: number;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
};

type Store = {
  transactions: Transaction[];
  role: 'viewer' | 'admin';
  setRole: (role: 'viewer' | 'admin') => void;
  addTransaction: (t: Transaction) => void;
  updateTransactions: (t: Transaction[]) => void;
};

export const useStore = create<Store>((set) => ({
  role: 'viewer',
  transactions: [],
  setRole: (role) => set({ role }),
  addTransaction: (t) =>
    set((state) => ({ transactions: [...state.transactions, t] })),
  updateTransactions: (t) => set({ transactions: t }),
}));
