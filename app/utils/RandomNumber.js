/**
 * Returns a random number between min (inclusive) and max (inclusive) that is not equal to currentProfileIconId
 * @param {number} min
 * @param {number} max
 * @param {currentProfileIconId} currentProfileIconId
 * @returns {number}
 */
export const getRandomNumber = (min, max, currentProfileIconId) => {
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    while (randomNumber == currentProfileIconId) {
        randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    }
    return randomNumber;
}