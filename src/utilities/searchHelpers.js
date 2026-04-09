function filterRecipes(recipes, activeFilters) {
    if (!recipes) return [];
    
    if (activeFilters === "all") {
        return recipes;
    } else {
        return recipes.filter((recipe) => recipe.strCategory === activeFilters)
        }
    }

export default filterRecipes