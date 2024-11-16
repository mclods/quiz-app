import Answers from './Answers';

function Question() {
  return (
    <section className="flex flex-col gap-y-4 py-4 w-full">
      <p className="font-eduAustralia text-3xl font-bold text-purple-300">
        Question
      </p>
      <Answers />
    </section>
  );
}

export default Question;
