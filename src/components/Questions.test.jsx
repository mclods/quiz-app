import { render, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Questions from './Questions';
import {
  LOCK_QUESTION_TIMEOUT,
  RESULT_TIMEOUT,
  QUESTION_TIMER_TIMEOUT,
} from './Questions';

describe('Test Questions Component', () => {
  const mockQuestion = {
    id: 'q1',
    text: 'What is the capital of France?',
    answers: [
      {
        id: 'a1',
        text: 'Berlin',
      },
      { id: 'a2', text: 'Delhi' },
      {
        id: 'a3',
        text: 'Paris',
      },
      {
        id: 'a4',
        text: 'London',
      },
    ],
    correctAnswer: 'a1',
  };

  const mockOnSelectAnswer = vi.fn();
  const mockOnSkipAnswer = vi.fn();

  it('renders the question text', () => {
    const { getByTestId } = render(
      <Questions
        question={mockQuestion}
        handleSelectAnswer={mockOnSelectAnswer}
        handleSkipAnswer={mockOnSkipAnswer}
      />
    );

    const questionText = getByTestId('question-text');
    expect(questionText).toHaveTextContent('What is the capital of France?');
  });

  it('renders all answer options', () => {
    const { getAllByRole } = render(
      <Questions
        question={mockQuestion}
        handleSelectAnswer={mockOnSelectAnswer}
        handleSkipAnswer={mockOnSkipAnswer}
      />
    );

    const answerOptions = getAllByRole('button');
    expect(answerOptions).toHaveLength(4);
  });

  it('calls handleSelectAnswer when an answer is clicked', () => {
    vi.useFakeTimers();

    const { getAllByRole } = render(
      <Questions
        question={mockQuestion}
        handleSelectAnswer={mockOnSelectAnswer}
        handleSkipAnswer={mockOnSkipAnswer}
      />
    );

    const answerOptions = getAllByRole('button');
    act(() => {
      fireEvent.click(answerOptions[2]);

      // Advance timers by the lock question timeout and result timeout
      vi.advanceTimersByTime(LOCK_QUESTION_TIMEOUT + RESULT_TIMEOUT);
    });
    expect(mockOnSelectAnswer).toHaveBeenCalledWith(mockQuestion.answers[2]);
    vi.useRealTimers();
  });

  it('calls handleSkipAnswer when an answer is skipped', () => {
    vi.useFakeTimers();

    render(
      <Questions
        question={mockQuestion}
        handleSelectAnswer={mockOnSelectAnswer}
        handleSkipAnswer={mockOnSkipAnswer}
      />
    );

    act(() => {
      vi.advanceTimersByTime(QUESTION_TIMER_TIMEOUT);
    });
    expect(mockOnSkipAnswer).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
