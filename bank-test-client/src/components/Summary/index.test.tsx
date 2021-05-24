import { render } from '@testing-library/react';
import { Summary } from './index';

function renderSummary() {
  return render(<Summary />);
}

let mockTransactions: Array<any> = [];
let mockUser: object = {
  name: 'name'
}

jest.mock("../../hooks/useTransaction", () => ({
  useTransaction: () => ({ transactions: mockTransactions  }),
}));

jest.mock("../../hooks/useUser", () => ({
  useUser: () => ({ user: mockUser  }),
}));

describe('Given summary componet', () => {

  it('should render without crash', () => {
    renderSummary()
  })

  it('should call reduce on transactions array', () => {
    mockTransactions.reduce = jest.fn(() => {
      return {
        income: 0,
        total: 0,
        outcome: 0,
      }
    });
    
    renderSummary();
    
    expect(mockTransactions.reduce).toBeCalledTimes(1)
  })
})