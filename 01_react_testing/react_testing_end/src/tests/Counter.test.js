import Counter from '../components/Counter'
import { render, fireEvent } from '@testing-library/react';

describe('Counter', () => {

  let container;
  beforeEach(() => {
    container = render(<Counter />);
  });

  it('should have a counter equal to 0', () => {
    expect(container.getByTestId('counter')).toHaveTextContent(0);
  });

  it('increments counter', () => {
    fireEvent.click(container.getByTestId('button-up'));
    expect(container.getByTestId('counter')).toHaveTextContent('1');
  });

  it('decrements counter', () => {
    fireEvent.click(container.getByTestId('button-down'));
    expect(container.getByTestId('counter')).toHaveTextContent('-1');
  });

});
