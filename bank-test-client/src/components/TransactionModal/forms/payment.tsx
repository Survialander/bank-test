import { FormEvent, useMemo, useState } from 'react';
import { Container, BillInfo } from '../styles';
import { IFormProps } from './formType';

export function PaymentForm({ handleFormSubmit }: IFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [code, setCode] = useState('');
  const [billInfo, setBillInfo] = useState({
    code: '',
    description: '',
    value: 0
  });
 
  useMemo(() => {
    const bills = [
      {
        code: '7947212',
        description: "Conta de luz",
        value: 150.00
      },
      {
        code: '4721930',
        description: "Conta de Internet",
        value: 90.00
      },
      {
        code: '583010',
        description: "Fatura cartão de crédito",
        value: 3000.00
      }
    ]

    const bill = bills.find((bill) => bill.code === code);
    
    if(bill) {
      setAmount(bill.value)
      return setBillInfo(bill);
    }

    setBillInfo({
      code: '',
      description: '',
      value: 0
    })
  }, [code]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    handleFormSubmit({description, amount, code})
    
    setDescription('');
    setAmount(0);
    setCode('');
  }

  return (
    <Container>
      <form 
        data-testid="payment-form"  
        onSubmit={(e) => handleSubmit(e)}
      >
        <input 
          type="text"
          placeholder="Descrição" 
          data-testid="description-input"
          className="mt" 
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        <input 
          type="text"
          data-testid="code-input"
          placeholder="Código da Conta" 
          className="mt" 
          value={code}
          onChange={event => setCode(event.target.value)}
        />
         {code && !billInfo.code && (
          <small>Código de conta inválido</small>
        )}
        <input 
          type="number"
          placeholder="Valor" 
          data-testid="amount-input"
          className="mt" 
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />
        {!!billInfo.code && (
          <BillInfo  data-testid="billInfo-div">
            <div>{billInfo.description}</div>
            <div>Código: {billInfo.code}</div>
            <div>Valor: {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(billInfo.value)}</div>
          </BillInfo>
        )}

        <button type="submit">
          Pagar
        </button>
      </form>
    </Container>
  )
}