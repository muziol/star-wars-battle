export const getIndexListFromRandomNum = (randomNum: number, min: number, max: number): number => {
    return Math.floor(randomNum * (max - min) + min);
}