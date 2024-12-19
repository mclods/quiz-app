import { describe, vi } from 'vitest';
import Answers from './Answers';
import { act, render, fireEvent } from '@testing-library/react';

describe('Test Answers Component', () => {
  const mockAnswers = [
    {
      id: 'a1',
      text: 'Answer 1',
    },
    { id: 'a2', text: 'Answer 2' },
    {
      id: 'a3',
      text: 'Answer 3',
    },
    {
      id: 'a4',
      text: 'Answer 4',
    },
  ];

  const onSelectAnswer = vi.fn();

  it('renders the answers', () => {
    const { getAllByRole } = render(
      <Answers options={mockAnswers} onSelectAnswer={onSelectAnswer} />
    );

    const answerOptions = getAllByRole('button');
    answerOptions.forEach((answerOption, index) => {
      expect(answerOption).toHaveTextContent(mockAnswers[index].text);
    });
  });

  it('calls onSelectAnswer when an answer is clicked', () => {
    const { getAllByRole } = render(
      <Answers options={mockAnswers} onSelectAnswer={onSelectAnswer} />
    );

    const answerOptions = getAllByRole('button');
    act(() => {
      fireEvent.click(answerOptions[2]);
    });
    expect(onSelectAnswer).toHaveBeenCalledWith(mockAnswers[2]);
  });
});
