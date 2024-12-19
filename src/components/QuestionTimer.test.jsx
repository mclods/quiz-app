import { act, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import QuestionTimer from './QuestionTimer';

describe('QuestionTimer', () => {
  it('renders the progress bar with correct initial value', () => {
    const { getByTestId } = render(
      <QuestionTimer timeout={1000} onTimerExpired={() => {}} />
    );

    const progressBar = getByTestId('question-timer-progress-bar');
    expect(progressBar).toHaveAttribute('value', '1000');
  });

  it('calls onTimerExpired after timeout', () => {
    vi.useFakeTimers();
    const onTimerExpired = vi.fn();

    render(<QuestionTimer timeout={1000} onTimerExpired={onTimerExpired} />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(onTimerExpired).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('updates the progress bar value over time', () => {
    vi.useFakeTimers();

    const { getByTestId } = render(
      <QuestionTimer timeout={1000} onTimerExpired={() => {}} />
    );

    const progressBar = getByTestId('question-timer-progress-bar');
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(progressBar).toHaveAttribute('value', '500');
    vi.useRealTimers();
  });
});
