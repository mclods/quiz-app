function Answers() {
  return (
    <section>
      <ol className="flex flex-col gap-y-2 w-full">
        {['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'].map(
          (answer, index) => (
            <li key={index} className="">
              <button className="w-full py-2 px-4 rounded-[24px] shadow-lg bg-blue-400 hover:bg-purple-400 font-sourGummy text-xl">
                {answer}
              </button>
            </li>
          )
        )}
      </ol>
    </section>
  );
}

export default Answers;
