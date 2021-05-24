// import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from './index';

describe('given Header component', () => {
  const onOpenDepositModal = jest.fn();

  it('should render without crash', () => {
    render(<Header onOpenDepositModal={onOpenDepositModal}/>);
  });

  describe('when transactions button is clicked', () => {
    beforeEach(() => {
      render(<Header onOpenDepositModal={onOpenDepositModal}/>);
    });

    it('should call open modal function', () => {
      const modalButton = screen.getByRole('button');
      fireEvent.click(modalButton);

      expect(onOpenDepositModal).toBeCalledTimes(1);
    })
  })
});
