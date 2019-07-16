import { getState, updateState, } from '../store';

const createDropzoneLetter = (letter) => {
  const letterBox = document.createElement('div');

  letterBox.dataset.letter = letter;
  letterBox.classList.add('letter-box', 'letter-box_dropzone');

  letterBox.addEventListener('dragover', (e) => e.preventDefault());

  letterBox.addEventListener('dragenter', (e) => {
    if (!letterBox.classList.contains('letter-box_success')) {
      letterBox.classList.add('letter-box_dropzone-dragenter');
    }
  });

  letterBox.addEventListener('dragleave', (e) => {
    letterBox.classList.remove('letter-box_dropzone-dragenter');
  });

  letterBox.addEventListener('drop', (e) => {
    const { failsCount } = getState();

    letterBox.classList.remove('letter-box_dropzone-dragenter');

    if (letterBox.classList.contains('letter-box_success')) return;

    if (letterBox.dataset.letter === e.dataTransfer.getData('text')) {
      letterBox.classList.remove('letter-box_error');
      letterBox.classList.add('letter-box_success');
      letterBox.innerHTML = letterBox.dataset.letter;

      updateState({ successfullyDropped: true });
    } else {
      letterBox.classList.add('letter-box_error');
      letterBox.innerHTML = e.dataTransfer.getData('text');

      updateState({
        successfullyDropped: false,
        failsCount: failsCount + 1,
      });
    }

    e.dataTransfer.clearData();
  });

  return letterBox;
}

const DropzoneWrapper = () => {
  const { currentWord } = getState();
  const container = document.createElement('div');

  container.classList.add('flex', 'mb40');

  currentWord.split('').forEach((letter) => {
    container.appendChild(createDropzoneLetter(letter));
  });

  return container;
}

export default DropzoneWrapper;
