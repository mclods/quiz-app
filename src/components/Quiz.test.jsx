import { vi } from 'vitest';
import Quiz from './Quiz';
import { act, fireEvent, render } from '@testing-library/react';

vi.mock('../utils/shuffleQuestions', () => ({
  default: () => [
    {
      id: 'q1',
      text: 'question 1?',
      answers: [
        {
          id: 'a1',
          text: 'answer 1',
        },
        { id: 'a2', text: 'answer 2' },
      ],
      correctAnswer: 'a1',
    },
    {
      id: 'q2',
      text: 'question 2?',
      answers: [
        {
          id: 'a1',
          text: 'answer 1',
        },
        { id: 'a2', text: 'answer 2' },
      ],
      correctAnswer: 'a1',
    },
  ],
}));

describe('Test Quiz Component', () => {
  beforeEach(vi.clearAllMocks);

  it('Component renders successfully', () => {
    const { getByTestId } = render(<Quiz />);

    const quizComponent = getByTestId('quiz-container');
    expect(quizComponent).toBeInTheDocument();
  });

  it('Moves to next question after selecting answer', () => {
    const { getByTestId } = render(<Quiz />);
    expect(getByTestId('question-text')).toHaveTextContent('question 1?');

    act(() => {
      fireEvent.click(getByTestId('answer-0-btn'));
    });
    expect(getByTestId('question-text')).toHaveTextContent('question 2?');
  });

  it('Moves to next question if not answered within 10seconds', () => {
    vi.useFakeTimers();
    const { getByTestId } = render(<Quiz />);
    expect(getByTestId('question-text')).toHaveTextContent('question 1?');

    // After 10 seconds
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(getByTestId('question-text')).toHaveTextContent('question 2?');

    vi.useRealTimers();
  });
});
