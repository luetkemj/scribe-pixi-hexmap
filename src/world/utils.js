import { sample, times, uniq } from 'lodash';

// Much faster to get random ids
// unique = true : length is not guaranteed to be === n
// unique = false : length === n, uniqueness not guaranteed
export function getRandomHexesSample(array, n, unique) {
  const newArray = [];

  times(n, () => newArray.push(sample(array)));

  if (unique) {
    return uniq(newArray);
  }

  return newArray;
}
