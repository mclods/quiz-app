function Answers({ options, onSelectAnswer }) {
  return (
    <section>
      <ul className="flex flex-col gap-y-2 w-full">
        {options.map((answer) => (
          <li key={answer.id} className="">
            <button
              className="w-full py-2 px-4 rounded-[24px] shadow-lg bg-blue-400 hover:bg-purple-400 font-sourGummy text-xl"
              onClick={() => onSelectAnswer(answer)}
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
