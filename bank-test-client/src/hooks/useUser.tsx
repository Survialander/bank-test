import { useEffect, useState, useContext, createContext, useCallback, ReactNode } from "react";
import { api } from "../services/api";

interface UserProviderProps {
  children: ReactNode;
}

interface Account {
  number: number,
  amount: number,
  transactions: Transaction[]
}

interface Transaction {
  id: number,
  description?: string,
  value: number,
  type: string,
  createdAt: string
}

interface User {
  id: number,
  name: string,
  account: Account
}

interface IUserContext {
  user: User,
  getUser(): void,
}

const UserContext = createContext<IUserContext>(
  {} as IUserContext
);

export function UserProvider({ children }:UserProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  const getUser = useCallback(async () => {
    const { data } = await api.get<User>('/users');
    setUser(data);
  }, [])

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      { children }
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('UserProvider not found'); 
  }

  return context;
}