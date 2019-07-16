import { getRandomWord, } from '../utils';

const currentWord = getRandomWord();
const remainingLetters = currentWord.length;

const INITIAL_STATE = {
  gameLength: 60,
  draggableLettersCount: 9,
  isTimeout: false,
  gameFinished: false,
  successfullyDropped: false,
  failsCount: 0,
  remainingLetters,
  currentWord,
}

export default INITIAL_STATE;
