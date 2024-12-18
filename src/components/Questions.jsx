import Answers from './Answers';
import classes from './Questions.module.css';

function Questions({ question, onSelectAnswer }) {
  return (
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
      <Answers options={question.answers} onSelectAnswer={onSelectAnswer} />
    </section>
  );
}

export default Questions;
