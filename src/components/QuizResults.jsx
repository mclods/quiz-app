import trophy from '../assets/quiz-complete.png';
import classes from './QuizResults.module.css';

function QuizResults({ questions, answers }) {
  const statsContainerStyles = 'flex flex-col w-24 items-center';
  const statsPercentStyles = 'text-4xl font-thin';
  const statsTextStyles = 'text-md uppercase';
  const correctAnswerStyles = 'text-green-900';
  const wrongAnswerStyles = 'text-red-900';
  const skippedAnswerStyles = 'text-white';

  function getAnswerStyles(question, answer) {
    if (answer === null) {
      return skippedAnswerStyles;
    }

    return answer.id === question.correctAnswer
      ? correctAnswerStyles
      : wrongAnswerStyles;
  }

  function getStatsPercent() {
    let skipped = 0;
    let correct = 0;
    let wrong = 0;

    questions.forEach((question, index) => {
      const answer = answers[index];

      if (answer === null) {
        skipped++;
      } else if (answer.id === question.correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const skippedPercent = (skipped / questions.length) * 100;
    const correctPercent = (correct / questions.length) * 100;
    const wrongPercent = (wrong / questions.length) * 100;

    return {
      skipped: Number.isInteger(skippedPercent)
        ? skippedPercent
        : skippedPercent.toFixed(2),
      correct: Number.isInteger(correctPercent)
        ? correctPercent
        : correctPercent.toFixed(2),
      wrong: Number.isInteger(wrongPercent)
        ? wrongPercent
        : wrongPercent.toFixed(2),
    };
  }

  const { skipped, correct, wrong } = getStatsPercent();

  return (
    <section
      className={`flex flex-col gap-y-6 mx-[30vw] my-12 px-[5vw] py-10 rounded-md items-center shadow-[1px_1px_8px_4px_rgba(12,5,32,0.6)] ${classes.quizResults}`}
      data-testid="quiz-results-container"
    >
      <div
        className="flex justify-center items-center w-36 h-36 rounded-full border-2 border-black bg-purple-400 drop-shadow-[0_0_3px_rgb(0,0,0)]"
        data-testid="trophy-image-container"
      >
        <img
          src={trophy}
          alt="A trophy"
          className="w-20 h-24 drop-shadow-[0_0_3px_rgb(0,0,0)]"
          data-testid="trophy-image"
        />
      </div>

      <p
        className="font-inter text-5xl font-bold uppercase text-zinc-800"
        data-testid="quiz-results-title"
      >
        Quiz Completed!
      </p>
      <div
        className="flex w-full justify-around font-parkinsans text-zinc-800"
        data-testid="stats-container"
      >
        <div
          className={statsContainerStyles}
          data-testid="skipped-answers-stats"
        >
          <p className={statsPercentStyles}>{`${skipped}%`}</p>
          <p className={statsTextStyles}>Skipped</p>
        </div>
        <div
          className={statsContainerStyles}
          data-testid="correct-answers-stats"
        >
          <p className={statsPercentStyles}>{`${correct}%`}</p>
          <p className={statsTextStyles}>Answered Correctly</p>
        </div>
        <div className={statsContainerStyles} data-testid="wrong-answers-stats">
          <p className={statsPercentStyles}>{`${wrong}%`}</p>
          <p className={statsTextStyles}>Answered Incorrectly</p>
        </div>
      </div>
      <hr className="w-full border-1 border-black" />
      <section>
        <ul
          className="flex flex-col gap-y-6"
          data-testid="questions-answers-list-container"
        >
          {questions?.map((question, index) => {
            const answerStyles = getAnswerStyles(question, answers[index]);
            const answerText = answers[index]?.text ?? 'Skipped';

            return (
              <li
                className="flex flex-col gap-y-2 items-start"
                key={question.id}
                data-testid="question-answer-container"
              >
                <div className="flex mb-1 self-center justify-center items-center w-8 h-8 rounded-full bg-zinc-800">
                  <p
                    className="text-white"
                    data-testid={`question-${index}-index`}
                  >
                    {index + 1}
                  </p>
                </div>
                <p
                  className="font-parkinsans text-md text-zinc-900"
                  data-testid={`question-${index}-text`}
                >
                  {question.text}
                </p>
                <p
                  className={`font-inter text-md font-bold ${answerStyles}`}
                  data-testid={`answer-${index}-text`}
                >
                  {answerText}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}

export default QuizResults;
