function Answers({ options, onSelectAnswer }) {
  return (
    <section data-testid="answers-container">
      <ul className="flex flex-col gap-y-2 w-full" data-testid="answers-list">
        {options?.map((answer, index) => (
          <li key={answer.id} data-testid="answer-list-item">
            <button
              className="w-full py-2 px-4 rounded-[24px] shadow-lg bg-blue-400 hover:bg-purple-400 font-inter text-lg"
              onClick={() => onSelectAnswer(answer)}
              data-testid={`answer-${index}-btn`}
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
