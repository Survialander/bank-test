import { screen, render, fireEvent } from '@testing-library/react';
import { WithdrawForm } from './withdraw';

describe('Given withdraw form', () => {
  const handleFormSubmit = jest.fn(); 
  function renderComponent() {
    return  render(<WithdrawForm handleFormSubmit={handleFormSubmit} /> )
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

      fireEvent.change(descriptionInput, { target: { value: 'descricao do saque' }})
      fireEvent.change(valueInput, { target: { value: 150 }})
      fireEvent.click(submitButton);

      expect(handleFormSubmit).toBeCalledTimes(1);
      expect(handleFormSubmit).toBeCalledWith({ 
        description: 'descricao do saque', 
        amount: 150, 
      })
    })
  })
})