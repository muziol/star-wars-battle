export const getRandomIndexesFromList = (
  randomNumbers: number,
  min: number,
  max: number,
): number[] => {
  const randomIndexes: number[] = [];
  for (let i = 0; i < randomNumbers; i++) {
    randomIndexes.push(Math.floor(Math.random() * (max - min) + min));
  }
  return randomIndexes;
};
