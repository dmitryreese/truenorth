import { getState, updateState, } from '../store';

const Timer = () => {
  let timeout = null;
  let countdown = null;

  const container = document.createElement('div');

  const mapSecondsToMinutes = (seconds) => {
    const pad = (str) => str.length === 1 ? `0${str}` : str;
    const sec = `${seconds % 60}`;
    const minutes = `${(seconds - sec) / 60}`;

    return `${pad(minutes)} : ${pad(sec)}`;
  }

  const decrementCountdown = () => {
    countdown -= 1;
    container.innerHTML = mapSecondsToMinutes(countdown);
  }

  const tick = () => {
    if (countdown > 1) {
      decrementCountdown();
      timeout = setTimeout(tick, 1000);
    } else {
      decrementCountdown();
      stopTimer();
      updateState({ isTimeout: true });
    }
  }

  const stopTimer = () => clearTimeout(timeout);

  const startTimer = () => {
    const { gameLength } = getState();

    countdown = gameLength;
    container.innerHTML = mapSecondsToMinutes(countdown);

    setTimeout(tick, 1000);
  }

  container.classList.add('timer-container', 'mb40');

  return {
    TimerComponent: container,
    stopTimer,
    startTimer,
  };
}

export default Timer;
