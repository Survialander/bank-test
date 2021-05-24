import { Container } from "../styles";
import { FormEvent, useState } from "react";
import { IFormProps } from './formType';

export function DepositForm({ handleFormSubmit }: IFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    handleFormSubmit({description, amount})

    setDescription('');
    setAmount(0);
  }

  return (
    <Container>
      <form 
        data-testid="deposit-form" 
        onSubmit={(e) => handleSubmit(e)}
      >
        <input 
          type="text" 
          data-testid="description-input"
          placeholder="Descrição"
          className="mt" 
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        <input 
          type="number" 
          data-testid="amount-input"
          placeholder="Valor"
          className="mt" 
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />
        <button type="submit">
          Depositar
        </button>
      </form>
    </Container>
  )
}