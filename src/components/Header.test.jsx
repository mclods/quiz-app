import { describe, expect } from 'vitest';
import Header from './Header';
import { render } from '@testing-library/react';

describe('Test Header Component', () => {
  it('Component renders successfully', () => {
    const { getByTestId } = render(<Header />);

    const headerlogo = getByTestId('header-logo');
    const headerTitle = getByTestId('header-title');

    expect(headerlogo).toBeInTheDocument();
    expect(headerTitle).toHaveTextContent('Quiz App');
  });
});
