/**
 * Filtrerar en lista med recept baserat på kategori
 * @author Alvina
 * @param {Array} recipes - listan med recept från API:t
 * @param {string} activeFilters - valt kategori, tex "dinner" eller "all"
 * @returns filtrerad lista med recept
 */

function filterRecipes(recipes, activeFilters) {
    if (!recipes) return [];

    if (activeFilters === "all") {
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
     */

async function handleSearch(searchTerm, setSearchTerm, setSearchResults) {
        setSearchTerm(searchTerm);
    }

export { filterRecipes, handleSearch }