import { useEffect, useState } from 'react';

function Answers({ options, onSelectAnswer, answerState }) {
  const [selectedAnswer, setSelectedAnswer] = useState();
  let selectedAnswerStyles;

  switch (answerState) {
    case 'answered':
      selectedAnswerStyles = 'bg-yellow-400 hover:bg-yellow-500';
      break;
    case 'correct':
      selectedAnswerStyles = 'bg-green-400 hover:bg-green-500';
      break;
    case 'wrong':
      selectedAnswerStyles = 'bg-red-400 hover:bg-red-500';
      break;
    default:
      selectedAnswerStyles = '';
  }

  useEffect(() => {
    if (answerState === '') {
      setSelectedAnswer();
    }
  }, [answerState]);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer.id);
    onSelectAnswer(answer);
  };

  return (
    <section data-testid="answers-container">
      <ul className="flex flex-col gap-y-2 w-full" data-testid="answers-list">
        {options?.map((answer, index) => (
          <li key={answer.id} data-testid="answer-list-item">
            <button
              className={`w-full py-2 px-4 rounded-[24px] shadow-lg font-inter text-lg 
                ${selectedAnswer === answer.id ? selectedAnswerStyles : 'bg-blue-400 hover:bg-purple-400 disabled:opacity-50'}
              `}
              onClick={() => handleSelectAnswer(answer)}
              data-testid={`answer-${index}-btn`}
              disabled={!!selectedAnswer}
            >
              {answer.text}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Answers;
