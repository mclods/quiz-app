import { describe, expect } from 'vitest';
import QuizResults from './QuizResults';
import { render } from '@testing-library/react';

describe('Test QuizResults Component', () => {
  const mockQuestions = [
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
    {
      id: 'q3',
      text: 'question 3?',
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
      id: 'q4',
      text: 'question 4?',
      answers: [
        {
          id: 'a1',
          text: 'answer 1',
        },
        { id: 'a2', text: 'answer 2' },
      ],
      correctAnswer: 'a1',
    },
  ];

  const mockAnswers = [
    { id: 'a1', text: 'answer 1' },
    { id: 'a2', text: 'answer 2' },
    { id: 'a1', text: 'answer 1' },
    null,
  ];

  const mockAllCorrectAnswers = [
    { id: 'a1', text: 'answer 1' },
    { id: 'a1', text: 'answer 1' },
    { id: 'a1', text: 'answer 1' },
    { id: 'a1', text: 'answer 1' },
  ];

  const mockAllWrongAnswers = [
    { id: 'a2', text: 'answer 2' },
    { id: 'a2', text: 'answer 2' },
    { id: 'a2', text: 'answer 2' },
    { id: 'a2', text: 'answer 2' },
  ];

  const mockAllSkippedAnswers = [null, null, null, null];

  it('should render the QuizResults component', () => {
    const { getByTestId } = render(
      <QuizResults questions={mockQuestions} answers={mockAnswers} />
    );

    const quizResultsTitle = getByTestId('quiz-results-title');
    expect(quizResultsTitle).toHaveTextContent('Quiz Completed!');
  });

  it('should render the questions and answers', () => {
    const { getByTestId } = render(
      <QuizResults questions={mockQuestions} answers={mockAnswers} />
    );

    mockQuestions.forEach((question, index) => {
      const questionText = getByTestId(`question-${index}-text`);
      expect(questionText).toHaveTextContent(question.text);

      const answerText = getByTestId(`answer-${index}-text`);
      expect(answerText).toHaveTextContent(
        mockAnswers[index]?.text ?? 'Skipped'
      );
    });
  });

  describe('should render the correct stats', () => {
    it('when all answers are correct', () => {
      const { getByTestId } = render(
        <QuizResults
          questions={mockQuestions}
          answers={mockAllCorrectAnswers}
        />
      );

      const skippedAnswersStats = getByTestId('skipped-answers-stats');
      const correctAnswersStats = getByTestId('correct-answers-stats');
      const wrongAnswersStats = getByTestId('wrong-answers-stats');

      expect(skippedAnswersStats).toHaveTextContent('0%');
      expect(correctAnswersStats).toHaveTextContent('100%');
      expect(wrongAnswersStats).toHaveTextContent('0%');
    });

    it('when all answers are wrong', () => {
      const { getByTestId } = render(
        <QuizResults questions={mockQuestions} answers={mockAllWrongAnswers} />
      );

      const skippedAnswersStats = getByTestId('skipped-answers-stats');
      const correctAnswersStats = getByTestId('correct-answers-stats');
      const wrongAnswersStats = getByTestId('wrong-answers-stats');

      expect(skippedAnswersStats).toHaveTextContent('0%');
      expect(correctAnswersStats).toHaveTextContent('0%');
      expect(wrongAnswersStats).toHaveTextContent('100%');
    });

    it('when all answers are skipped', () => {
      const { getByTestId } = render(
        <QuizResults
          questions={mockQuestions}
          answers={mockAllSkippedAnswers}
        />
      );

      const skippedAnswersStats = getByTestId('skipped-answers-stats');
      const correctAnswersStats = getByTestId('correct-answers-stats');
      const wrongAnswersStats = getByTestId('wrong-answers-stats');

      expect(skippedAnswersStats).toHaveTextContent('100%');
      expect(correctAnswersStats).toHaveTextContent('0%');
      expect(wrongAnswersStats).toHaveTextContent('0%');
    });

    it('when answers are mixed', () => {
      const { getByTestId } = render(
        <QuizResults questions={mockQuestions} answers={mockAnswers} />
      );

      const skippedAnswersStats = getByTestId('skipped-answers-stats');
      const correctAnswersStats = getByTestId('correct-answers-stats');
      const wrongAnswersStats = getByTestId('wrong-answers-stats');

      expect(skippedAnswersStats).toHaveTextContent('25%');
      expect(correctAnswersStats).toHaveTextContent('50%');
      expect(wrongAnswersStats).toHaveTextContent('25%');
    });
  });
});
