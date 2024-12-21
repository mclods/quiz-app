import { useState } from 'react';
import Answers from './Answers';
import classes from './Questions.module.css';
import QuestionTimer from './QuestionTimer';

export const QUESTION_TIMER_TIMEOUT = 10000;
export const LOCK_QUESTION_TIMEOUT = 1000;
export const RESULT_TIMEOUT = 2000;

function Questions({ question, handleSelectAnswer, handleSkipAnswer }) {
  const [answerState, setAnswerState] = useState('');
  let timeout;

  switch (answerState) {
    case 'answered':
      timeout = LOCK_QUESTION_TIMEOUT;
      break;
    case 'correct':
    case 'wrong':
      timeout = RESULT_TIMEOUT;
      break;
    default:
      timeout = QUESTION_TIMER_TIMEOUT;
  }

  function onSelectAnswer(answer) {
    setAnswerState('answered');

    setTimeout(() => {
      if (answer.id === question.correctAnswer) {
        setAnswerState('correct');
      } else {
        setAnswerState('wrong');
      }

      setTimeout(() => {
        setAnswerState('');
        handleSelectAnswer(answer);
      }, RESULT_TIMEOUT);
    }, LOCK_QUESTION_TIMEOUT);
  }

  function onSkipAnswer() {
    if (answerState === '') {
      handleSkipAnswer();
    }
  }

  return (
    <>
      <QuestionTimer
        key={answerState}
        timeout={timeout}
        onTimerExpired={onSkipAnswer}
        mode={answerState}
      />
      <section
        className="flex flex-col gap-y-4 py-4 w-full"
        data-testid="question-container"
      >
        <p
          className={`font-parkinsans text-2xl text-purple-300 ${classes.questionStyles}`}
          data-testid="question-text"
        >
          {question.text}
        </p>
        <Answers
          options={question.answers}
          onSelectAnswer={onSelectAnswer}
          answerState={answerState}
        />
      </section>
    </>
  );
}

export default Questions;
