import Answers from './Answers';
import classes from './QuestionAnswers.module.css';

function QuestionAnswers({ question, onSelectAnswer }) {
  return (
    <section className="flex flex-col gap-y-4 py-4 w-full">
      <p
        className={`font-eduAustralia text-3xl font-bold text-purple-300 ${classes.questionStyles}`}
      >
        {question.text}
      </p>
      <Answers options={question.answers} onSelectAnswer={onSelectAnswer} />
    </section>
  );
}

export default QuestionAnswers;
