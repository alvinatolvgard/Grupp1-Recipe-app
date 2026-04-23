/**
 * Filtrerar en lista med recept baserat på kategori
 * @author Alvina
 * @param {Array} recipes - listan med recept från API:t
 * @param {string} activeFilters - valt kategori, tex "dinner" eller "all"
 * @returns filtrerad lista med recept
 */

function filterRecipes(recipes, activeFilters) {
    if (!recipes) return [];

    if (activeFilters === "All") {
        return recipes;
    } else {
        return recipes.filter((recipe) => recipe.strCategory === activeFilters)
    }
}

/**
 * Hanterar sökning av recept och sparar resultatet i storen
 * @author Alvina
 * @param {string} searchTerm - det användaren skrivit i sökfältet
 * @param {function} setSearchTerm - sparar söktermen i Zustand-storen
 * @param {function} setSearchResults - sparar sökresultaten i Zustand-storen
 * @param {function} searchRecipes - anropar API:t och retunerar matchande recept
 * @param {function} setError - uppdaterar felmeddelandet i komponenten
 */

async function handleSearch(searchTerm, setSearchTerm, setSearchResults, searchRecipes, setError, setHasSearched) {
    // Ser till att man inte kan söka på ingenting
    if (!searchTerm.trim()) return;
    try {
        // Sparar söktermen i storen
        setSearchTerm(searchTerm);
        // Anropar API:et med söktermen och inväntar resultat
        const results = await searchRecipes(searchTerm);
        // Sparar resultatet i storen
        setSearchResults(results);
        setHasSearched(true);
    } catch (err) {
        // Visar felmeddelande om något går fel
        setError("Something went wrong. Try again!")
    }
}

export { filterRecipes, handleSearch }