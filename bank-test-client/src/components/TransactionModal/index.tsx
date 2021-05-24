import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FormValues } from './forms/formType';
import { useTransaction } from '../../hooks/useTransaction';

import closeImg from '../../assets/close.svg';
import { DepositForm } from './forms/deposit';
import { WithdrawForm } from './forms/withdraw';
import { PaymentForm } from './forms/payment';

import { Container, TransactionType, RadioBox } from './styles';

interface ITransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

interface ITransactionTypeForm {
  deposit: JSX.Element,
  payment: JSX.Element,
  withdraw: JSX.Element,
}

export function TransactionModal({ isOpen, onRequestClose } : ITransactionModalProps) {
  const { createTransaction } = useTransaction();

  const [transactionType, setTransactionType] = useState<keyof ITransactionTypeForm>('deposit');
  const transactionTypeForm:ITransactionTypeForm = {
    deposit: <DepositForm handleFormSubmit={handleFormSubmit}/>,
    payment: <PaymentForm handleFormSubmit={handleFormSubmit}/>,
    withdraw: <WithdrawForm handleFormSubmit={handleFormSubmit}/>
  } 

  function renderTransactionTypeForm() {
    return transactionTypeForm[transactionType];
  }

  async function handleFormSubmit (data: FormValues) {
    data.description = data.description ? data.description : transactionType;
    
    await createTransaction({...data, type: transactionType});
    
    onRequestClose();
    setTransactionType('deposit');
  }

  useEffect(() => {
    renderTransactionTypeForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionType]);

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      overlayClassName="transaction-modal-overlay"
      className="transaction-modal"
    >
      <Container>
        <button 
          onClick={onRequestClose} 
          className="modal-close-button"
          data-testid="modal-close-button"
        >
          <img src={closeImg} alt="Fechar Modal"/>
        </button>

        <h2>Escolha a transação:</h2>
        <TransactionType>
          <RadioBox 
            type="button"
            isActive={transactionType === 'deposit'} 
            onClick={() => setTransactionType("deposit")}
          >
            Depósito
          </RadioBox>
          <RadioBox 
            type="button"
            isActive={transactionType === 'withdraw'} 
            onClick={() => setTransactionType("withdraw")}
          >
            Saque
          </RadioBox>
          <RadioBox 
            type="button" 
            isActive={transactionType === 'payment'} 
            onClick={() => setTransactionType("payment")}
          >
            Pagamento
          </RadioBox>
        </TransactionType>
        { renderTransactionTypeForm() }
      </Container>
    </Modal>
  )
}