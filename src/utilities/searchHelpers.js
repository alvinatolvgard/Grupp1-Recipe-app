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

export default filterRecipes