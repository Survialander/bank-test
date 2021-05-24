import { render, screen } from '@testing-library/react';
import { Transactions } from './index';
import '@testing-library/jest-dom';

let mockTransactions: Array<any> = [];
  
jest.mock("../../hooks/useTransaction", () => ({
  useTransaction: () => ({ transactions: mockTransactions  }),
}));

describe('given Transactions components', () => {  
  it('should render without crash', () => {
    render(<Transactions />)
  });

  describe('given transactions array', () => {
    describe('and .length greater than 0', () => {
      it('should render table rows', () => {
        mockTransactions = [
          {           
            id: 1,
            description: 'descrição da transação',
            amount: 4000.50,
            type: 'deposit',
            created_at: String(new Date()),
          }
        ]
      
        render(<Transactions />)

        const transactionRow = screen.getByTestId('transaction-row');

        expect(transactionRow).toBeInTheDocument();
      })
    })
     
    describe('and .length is 0', () => {
      beforeAll(() => {
        mockTransactions = [];
      })  
      
      it('shouldnt render table rows', async () => {
        render(<Transactions />)

        const tableRow = await screen.findByTestId('transaction-row')
        .then(element => element)
        .catch(() => false)

        expect(tableRow).toBeFalsy();
      })
    })
  })
})