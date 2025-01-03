import { render } from '@testing-library/react';
import App from './App';
import { describe, it } from 'vitest';

describe('Test App Component', () => {
  it('Component renders successfully', () => {
    const { getByTestId } = render(<App />);

    const headerComponent = getByTestId('header-container');
    const quizComponent = getByTestId('quiz-container');
    expect(headerComponent).toBeInTheDocument();
    expect(quizComponent).toBeInTheDocument();
  });
});
