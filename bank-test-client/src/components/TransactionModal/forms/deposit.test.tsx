import { screen, render, fireEvent } from '@testing-library/react';
import { DepositForm } from './deposit';

describe('Given deposit form', () => {
  const handleFormSubmit = jest.fn(); 
  function renderComponent() {
    return  render(<DepositForm handleFormSubmit={handleFormSubmit} /> )
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

      fireEvent.change(descriptionInput, { target: { value: 'descricao' }})
      fireEvent.change(valueInput, { target: { value: 1000 }})
      fireEvent.click(submitButton);

      expect(handleFormSubmit).toBeCalledTimes(1);
      expect(handleFormSubmit).toBeCalledWith({ 
        description: 'descricao', 
        amount: 1000, 
      })
    })
  })
})