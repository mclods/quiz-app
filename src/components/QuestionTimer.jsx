import { useEffect, useState } from 'react';
import classes from './QuestionTimer.module.css';

const QUESTION_TIMER_INTERVAL = 10;

function QuestionTimer({ timeout, onTimerExpired }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(() => {
      onTimerExpired();
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimerExpired]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(
        (prevRemainingTime) => prevRemainingTime - QUESTION_TIMER_INTERVAL
      );
    }, QUESTION_TIMER_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      value={remainingTime}
      max={timeout}
      className={classes.progress}
      data-testid="question-timer-progress-bar"
    />
  );
}

export default QuestionTimer;
