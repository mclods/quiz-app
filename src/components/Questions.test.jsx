import { render, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Questions from './Questions';

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

  it('renders the question text', () => {
    const { getByTestId } = render(
      <Questions question={mockQuestion} onSelectAnswer={mockOnSelectAnswer} />
    );

    const questionText = getByTestId('question-text');
    expect(questionText).toHaveTextContent('What is the capital of France?');
  });

  it('renders all answer options', () => {
    const { getAllByRole } = render(
      <Questions question={mockQuestion} onSelectAnswer={mockOnSelectAnswer} />
    );

    const answerOptions = getAllByRole('button');
    expect(answerOptions).toHaveLength(4);
  });

  it('calls onSelectAnswer when an answer is clicked', () => {
    const { getAllByRole } = render(
      <Questions question={mockQuestion} onSelectAnswer={mockOnSelectAnswer} />
    );

    const answerOptions = getAllByRole('button');
    act(() => {
      fireEvent.click(answerOptions[2]);
    });
    expect(mockOnSelectAnswer).toHaveBeenCalledWith(mockQuestion.answers[2]);
  });
});
