import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/buscar departamentos en la plata/i);
  expect(headingElement).toBeInTheDocument();
});
