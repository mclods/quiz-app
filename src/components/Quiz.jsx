import Question from './Question';
import classes from './Quiz.module.css';

function Quiz() {
  return (
    <section className="flex flex-col gap-y-3 mx-[20vw] px-[10vw] py-10 rounded-md items-center bg-gradient-to-b from-[#3e2a60] to-[#321061] shadow-[1px_1px_8px_4px_rgba(12,5,32,0.6)]">
      <progress value={80} max={100} className={classes.progress} />
      <Question />
    </section>
  );
}

export default Quiz;
