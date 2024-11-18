import QuestionAnswers from './QuestionAnswers';
import classes from './Quiz.module.css';
import QUESTIONS from '../utils/questions';
import { useState } from 'react';
import QuizResults from './QuizResults';

function Quiz() {
  const [quizData, setQuizData] = useState(QUESTIONS);
  const [answers, setAnswers] = useState([]);
  let activeQuestion;

  function handleSelectAnswer(answer) {
    setAnswers((prevAnswers) => [...prevAnswers, answer]);
  }

  if (quizData.length === answers.length) {
    return <QuizResults />;
  } else {
    activeQuestion = quizData[answers.length];
  }

  return (
    <section className="flex flex-col gap-y-3 mx-[20vw] my-12 px-[10vw] py-10 rounded-md items-center bg-gradient-to-b from-[#3e2a60] to-[#321061] shadow-[1px_1px_8px_4px_rgba(12,5,32,0.6)]">
      <progress value={80} max={100} className={classes.progress} />
      <QuestionAnswers
        question={activeQuestion}
        onSelectAnswer={handleSelectAnswer}
      />
    </section>
  );
}

export default Quiz;
