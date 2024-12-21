import Questions from './Questions';
import QUESTIONS from '../utils/questions';
import { useState, useCallback } from 'react';
import QuizResults from './QuizResults';
import getShuffleQuestions from '../utils/shuffleQuestions';

const SHUFFLED_QUESTIONS = window.Cypress
  ? QUESTIONS
  : getShuffleQuestions(QUESTIONS);

function Quiz() {
  const [answers, setAnswers] = useState([]);
  let activeQuestion;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setAnswers((prevAnswers) => [...prevAnswers, answer]);
  }, []);

  const handleSkipAnswer = useCallback(
    function () {
      handleSelectAnswer(null);
    },
    [handleSelectAnswer]
  );

  const activeQuestionIndex = answers.length;

  if (activeQuestionIndex === SHUFFLED_QUESTIONS.length) {
    return <QuizResults questions={SHUFFLED_QUESTIONS} answers={answers} />;
  } else {
    activeQuestion = SHUFFLED_QUESTIONS[activeQuestionIndex];
  }

  return (
    <section
      className="flex flex-col gap-y-3 mx-[20vw] my-12 px-[10vw] py-10 rounded-md items-center bg-gradient-to-b from-[#3e2a60] to-[#321061] shadow-[1px_1px_8px_4px_rgba(12,5,32,0.6)]"
      data-testid="quiz-container"
    >
      <Questions
        key={activeQuestionIndex}
        question={activeQuestion}
        handleSelectAnswer={handleSelectAnswer}
        handleSkipAnswer={handleSkipAnswer}
      />
    </section>
  );
}

export default Quiz;
