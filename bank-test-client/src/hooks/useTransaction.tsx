import { useState, createContext, useEffect, ReactNode, useCallback, useContext } from "react";
import { api } from "../services/api";
import { useUser } from "./useUser";

interface TransactionProviderProps {
  children: ReactNode;
}

interface Transaction {
  id: number,
  description?: string,
  amount: number,
  type: string,
  created_at: string
}

interface TransactionData {
  description?: string,
  amount: number,
  account_number?: string,
  type: string
}

interface ITransactionContext {
  transactions: Transaction[],
  createTransaction: (transaction: TransactionData) => Promise<void>,
}

const TransactionContext = createContext<ITransactionContext>(
  {} as ITransactionContext
);

export function TransactionProvider({ children }:TransactionProviderProps) {
  const { user } = useUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const getTransactions = useCallback(async (account_number) => {
    const { data } = await api.get('/transactions', { params: { account_number: account_number }});
    setTransactions(data);
  }, []);

  useEffect(() => {
    if(user?.account) { 
      getTransactions(user.account.number);
    }
  }, [user, getTransactions]);

  async function createTransaction(transaction: TransactionData) {
    try {
      const { data } = await api.post(`/transactions/${transaction.type}`, {
        ...transaction, 
        account_number: user.account.number
      });
      
      const newTransactions = [
        ...transactions, 
        data
      ];
  
      return setTransactions(newTransactions);
    } catch (error) {
      return error.message; 
    }
  }

  return (
    <TransactionContext.Provider value={{transactions, createTransaction}}>
      { children }
    </TransactionContext.Provider>
  )
}

export function useTransaction() {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error('TransactionProvider not found'); 
  }

  return context;
}