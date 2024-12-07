import { useEffect, useRef, useState } from 'react';
import classes from './QuestionTimer.module.css';

const QUESTION_TIMER_INTERVAL = 10;

function QuestionTimer({ timeout, onTimerExpired }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log('Setting Timer');
    const timer = setTimeout(() => {
      console.log('Timer Complete');
      onTimerExpired();
    }, timeout);

    return () => {
      console.log('Cleaning Timer');
      clearTimeout(timer);
    };
  }, [timeout, onTimerExpired]);

  useEffect(() => {
    console.log('Setting Interval');
    const interval = setInterval(() => {
      console.log('Interval Complete');
      setRemainingTime(
        (prevRemainingTime) => prevRemainingTime - QUESTION_TIMER_INTERVAL
      );
    }, QUESTION_TIMER_INTERVAL);

    return () => {
      console.log('Cleaning Interval');
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      value={remainingTime}
      max={timeout}
      className={classes.progress}
    />
  );
}

export default QuestionTimer;
