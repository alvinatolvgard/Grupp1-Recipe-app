/**
 * Skapar ett unikt/deterministiskt tal mellan 0 och 1 från ett recept-ID.
 * Samma ID ger alltid samma tal - beräknat från tecknen i ID-strängen
 * med hjälp av deras ASCII-värden, så att resultatet aldrig är slumpmässigt.
 * @author Maryam
 * @param {string} id - receptets unika ID från TheMealDB
 * @returns {number} ett tal mellan 0 och 1
 */
function pseudoRandom(id) {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = (hash * 31 + id.charCodeAt(i)) % 10000;
    }
    return hash / 10000;
}

/**
 * Genererar ett betyg mellan 3.0 och 5.0 baserat på receptets ID
 * Samma recept får alltid samma betyg
 * @author Maryam
 * @param {string} id - receptets unika ID från TheMealDB
 * @returns {number} ett betyg med en decimal t.ex 4.2
 */
export function generateRating(id) {
    const raw = pseudoRandom(id);
    const rating = 3.0 + raw * 2.0;
    return Math.round(rating * 10) / 10;
}

/**
 * Genererar ett antal betyg mellan 20 och 500 baserat på receptets ID.
 * Samma recept får alltid samma antal betyg
 * @author Maryam
 * @param {string} id - receptets unika ID från TheMealDB
 * @returns {number} ett heltal
 */
export function generateRatingCount(id) {
    const raw = pseudoRandom(id + "count");
    return Math.floor(20 + raw * 480);
}