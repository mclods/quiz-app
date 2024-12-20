import { describe, it, vi, beforeEach } from 'vitest';
import Quiz from './Quiz';
import { act, fireEvent, render } from '@testing-library/react';
import {
  QUESTION_TIMER_TIMEOUT,
  LOCK_QUESTION_TIMEOUT,
  RESULT_TIMEOUT,
} from './Questions';

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
    vi.useFakeTimers();

    const { getByTestId } = render(<Quiz />);
    expect(getByTestId('question-text')).toHaveTextContent('question 1?');

    act(() => {
      fireEvent.click(getByTestId('answer-0-btn'));
      // Advance timers by the lock question timeout and result timeout
      vi.advanceTimersByTime(LOCK_QUESTION_TIMEOUT + RESULT_TIMEOUT);
    });
    expect(getByTestId('question-text')).toHaveTextContent('question 2?');
    vi.useRealTimers();
  });

  it('Moves to next question if not answered within QUESTION_TIMER_TIMEOUT', () => {
    vi.useFakeTimers();
    const { getByTestId } = render(<Quiz />);
    expect(getByTestId('question-text')).toHaveTextContent('question 1?');

    // After 10 seconds
    act(() => {
      vi.advanceTimersByTime(QUESTION_TIMER_TIMEOUT);
    });
    expect(getByTestId('question-text')).toHaveTextContent('question 2?');

    vi.useRealTimers();
  });
});
