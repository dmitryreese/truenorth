import { WORDS, ABC } from './const';

export const shuffle = (arr) => {
  const array = [...arr];

  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export const getRandomValue = (iterable, min = 0) => {
  const random = Math.floor(Math.random() * (iterable.length - min) + min);

  return iterable[random];
}

export const getRandomWord = () => getRandomValue(WORDS);

export const getRandomLetter = () => getRandomValue(ABC);
