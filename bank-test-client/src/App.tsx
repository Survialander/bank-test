import { useState } from 'react';
import { GlobalStyle } from "./styles/global";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { TransactionModal } from './components/TransactionModal';
import { TransactionProvider } from './hooks/useTransaction';
import { UserProvider } from './hooks/useUser';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export function App() {
  const [transactionModalOpen, setTransactionModalOpen] = useState<boolean>(false);

  function handleOpenTransactionModal() {
    setTransactionModalOpen(true);
  }

  function handleCloseTransactionModal() {
    setTransactionModalOpen(false);
  }
  
  return (
    <UserProvider>
      <TransactionProvider>
        <GlobalStyle /> 
        <Header onOpenDepositModal={handleOpenTransactionModal}/>
        <Dashboard />

        <TransactionModal isOpen={transactionModalOpen} onRequestClose={handleCloseTransactionModal}/>
      </TransactionProvider>
    </UserProvider>
  );
}
