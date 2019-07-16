import { subscribe, getState, updateState, } from './store';
import INITIAL_STATE from './store/initialState';
import { getRandomWord, } from './utils';

// components
import Timer from './components/Timer';
import RestartButton from './components/RestartButton';
import GameState from './components/GameState';
import DraggableWrapper from './components/DraggableWrapper';
import DropzoneWrapper from './components/DropzoneWrapper';

// setup game
const setupGame = () => {
  const container = document.createElement('div');

  const { TimerComponent, stopTimer, startTimer } = Timer();
  const DraggableWrapperComponent = DraggableWrapper();
  const DropzoneWrapperComponent = DropzoneWrapper();
  
  container.classList.add('countdown-container');

  try {
    document.body.removeChild(document.querySelector('.countdown-container'));
  } catch (err) {}

  container.appendChild(TimerComponent);
  container.appendChild(DraggableWrapperComponent);
  container.appendChild(DropzoneWrapperComponent);

  container.addEventListener('StateUpdated', (e) => {
    const { failsCount, remainingLetters, isTimeout, } = getState();
    
    if (failsCount === 3 || remainingLetters === 0 || isTimeout) {
      if (isTimeout) TimerComponent.classList.add('timer-container_timeout');
      
      const GameStateComponent = GameState(remainingLetters === 0 ? 'Success' : 'Fail');
      const RestartButtonComponent = RestartButton(() => {
        const currentWord = getRandomWord();
        const remainingLetters = currentWord.length;
        
        updateState({
          ...INITIAL_STATE,
          isTimeout: false,
          gameFinished: false,
          currentWord,
          remainingLetters,
        });
        startTimer();
        setupGame();
      });
      
      container.appendChild(GameStateComponent);
      container.appendChild(RestartButtonComponent);
      stopTimer();
    }
  });

  subscribe(container);
  startTimer();
  document.body.appendChild(container);
}

setupGame();
