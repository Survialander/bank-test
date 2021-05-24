import { render } from '@testing-library/react';
import { App } from './App';
jest.mock('react-modal');

test('should render', () => {
  render(<App />);
});
