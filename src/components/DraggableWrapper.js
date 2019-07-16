import { getState, updateState, } from '../store';
import { shuffle, getRandomLetter, } from '../utils';
import { subscribe } from '../store';

const createDraggableLetter = (letter) => {
  const letterBox = document.createElement('div');

  letterBox.draggable = true;
  letterBox.dataset.letter = letter;
  letterBox.classList.add('letter-box', 'letter-box_draggable');

  letterBox.innerHTML = letter;

  letterBox.addEventListener('dragstart', (e) => {
    letterBox.classList.add('letter-box_dragging');

    e.dataTransfer.setData('text/plain', e.currentTarget.dataset.letter);
  });

  letterBox.addEventListener('dragend', (e) => {
    const { successfullyDropped, remainingLetters, } = getState();

    letterBox.classList.remove('letter-box_dragging');

    if (successfullyDropped) {
      letterBox.classList.add('letter-box_disabled');
      letterBox.draggable = false;

      updateState({
        successfullyDropped: false,
        remainingLetters: remainingLetters - 1,
      });
    }
  });

  return letterBox;
}

const DraggableWrapper = () => {
  const { currentWord, draggableLettersCount } = getState();
  const container = document.createElement('div');
  const draggableLetters = shuffle([
    ...currentWord,
    ...Array(draggableLettersCount - currentWord.length).fill(0).map(word => getRandomLetter()),
  ]).map(letter => createDraggableLetter(letter));

  container.classList.add('flex', 'mb40');

  draggableLetters.forEach((draggableLetter) => {
    subscribe(draggableLetter);

    draggableLetter.addEventListener('StateUpdated', (e) => {
      const { failsCount, remainingLetters, isTimeout, } = getState();

      if (failsCount === 3 || remainingLetters === 0 || isTimeout) {
        draggableLetter.draggable = false;
        draggableLetter.classList.add('letter-box_disabled');
      }
    });

    container.appendChild(draggableLetter);
  });

  return container;
}

export default DraggableWrapper;
