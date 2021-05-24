import { render, screen, fireEvent } from '@testing-library/react';
import { TransactionModal } from './index';
import Modal from 'react-modal';
import '@testing-library/jest-dom';

Modal.setAppElement(document.createElement('div'));
describe('given TransactionModal component', () => {
  const onRequestClose = jest.fn();

  function renderModal() {
    return render(
      <TransactionModal isOpen={true} onRequestClose={onRequestClose} />
    );
  }

  it('should render without crash', () => {
    renderModal();
  });

  describe(('when transaction type buttons are clicked'), () => {
    beforeEach(() => {
      renderModal()
    });

    it('Deposit button, should render deposit form', () => {
      const depositButton = screen.getByRole('button', {name: /depósito/i})
      fireEvent.click(depositButton);

      const depositForm = screen.getByTestId('deposit-form');

      expect(depositForm).toBeInTheDocument();
    })

  
    it('Withdraw button, should render withdraw form', () => {
      const withdrawButton = screen.getByRole('button', {name: /saque/i})
      fireEvent.click(withdrawButton);
      
      const withdrawForm = screen.getByTestId('withdraw-form');
      
      expect(withdrawForm).toBeInTheDocument();
    })

    it('Payment button, should render payment form', () => {
      const paymentButton = screen.getByRole('button', {name: /pagamento/i})
      fireEvent.click(paymentButton);

      const paymentForm = screen.getByTestId('payment-form');
      
      expect(paymentForm).toBeInTheDocument();
    })
  
    it('Close Button, should call onRequestClose', () => {
      const closeButton = screen.getByTestId('modal-close-button');
      fireEvent.click(closeButton);

      expect(onRequestClose).toBeCalledTimes(1);
    })
  
  })
})