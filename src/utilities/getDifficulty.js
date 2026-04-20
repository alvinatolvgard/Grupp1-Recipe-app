/**
 * Beräknar svårighetsgraden för ett recept baserat på antal ingredienser
 * @author Maryam
 * @param {Array} ingredients - lista med ingredienser
 * @returns {string} "Easy", "Medium" eller "Hard" baserat på antal ingredienser
 */
function getDifficulty(ingredients) {
    if (ingredients.length <= 5) {
        return "Easy";
    } else if (ingredients.length >= 6 && ingredients.length <= 12) {
        return "Medium";
    } else {
        return "Hard";
    }
}

export default getDifficulty;