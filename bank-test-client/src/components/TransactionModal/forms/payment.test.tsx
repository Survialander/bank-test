import { screen, render, fireEvent } from '@testing-library/react';
import { PaymentForm } from './payment';
import '@testing-library/jest-dom';

describe('Given payment form', () => {
  const handleFormSubmit = jest.fn(); 
  function renderComponent() {
    return  render(<PaymentForm handleFormSubmit={handleFormSubmit} /> )
  }

  it('should render without crash', () => {
    renderComponent();
  })

  describe('when submiting form', () => {
    beforeEach(() => {
      renderComponent();
    });

    it('should call handleFormSubmit with params', () => {
      const descriptionInput = screen.getByTestId('description-input');
      const valueInput = screen.getByTestId('amount-input');
      const submitButton = screen.getByRole('button');

      fireEvent.change(descriptionInput, { target: { value: 'pagamento de conta' }})
      fireEvent.change(valueInput, { target: { value: 500 }})
      fireEvent.click(submitButton);

      expect(handleFormSubmit).toBeCalledTimes(1);
      expect(handleFormSubmit).toBeCalledWith({ 
        description: 'pagamento de conta', 
        amount: 500,
        code: "" 
      })
    })

    it('when code input filled shoud show respective bill', () => {
      const codeInput = screen.getByTestId('code-input')

      fireEvent.change(codeInput, { target: { value: '7947212'}});

      const billInfoDiv = screen.getByTestId('billInfo-div');

      expect(billInfoDiv).toBeInTheDocument()
    })
  })
})