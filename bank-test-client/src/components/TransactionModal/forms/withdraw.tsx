import { FormEvent, useState } from "react";
import { Container } from "../styles";
import { IFormProps } from './formType';

export function WithdrawForm({ handleFormSubmit }:IFormProps) {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    handleFormSubmit( { description, amount })

    setAmount(0);
    setDescription('');
  }

  return (
    <Container>
      <form
        data-testid="withdraw-form" 
        onSubmit={(e) => handleSubmit(e)}
      >
        <input 
          type="text"
          data-testid="description-input"
          placeholder="Descrição" 
          className="mt" value={description}
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
          Sacar
        </button>
      </form>
    </Container>
  )
}