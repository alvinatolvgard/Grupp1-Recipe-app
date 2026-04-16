import { useRandomRecipe } from "../api/mealdb";
import SearchBar from "../components/SearchBar";
import useSearchStore from "../stores/useSearchStore";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import "./LandingPage.css";

function LandingPage() {
    const { recipe, loading, error } = useRandomRecipe();
    const searchResults = useSearchStore((state) => state.searchResults);
    const activeFilter = useSearchStore((state) => state.activeFilter);
    const setActiveFilter = useSearchStore((state) => state.setActiveFilter)

    if (recipe) console.log(recipe);

    // Visar loading medan receptet hämtas och error vid fel
    if (loading) {
        return <p>Loading...</p>;
    } 
    if (error) {
        return <p>Something went wrong!</p>;
    }
    if (!recipe) {
        return null;
    }

    return (
        < >
        {/* --Hero-sektion-- */}
            <div className="hero">
                <div className="hero-text">
                    <p className="featured-recipes">FEATURED RECIPES</p>
                    <h1>{recipe.strMeal}</h1>
                    <p>An elegant pasta dish with rich truffle cream sauce, perfect for <br /> a sophisicated dinner at home.</p>
                    <p className="servings"><span className="material-symbols-outlined">
                        group
                    </span>4 Servings</p>

                    {/* TODO: länka till receptsida när den är klar */}
                    <button className="view-recipe-btn">View Recipe<span className="material-symbols-outlined">
                        arrow_forward
                    </span></button>
                </div>
                <div>
                    <img className="hero-img" src={recipe.strMealThumb} />
                </div>
            </div>

            {/* --Search-sektion-- */}
            <div className="search-function">
                <SearchBar />
            </div>

            {/* --Recipecard-sektion-- */}
            {searchResults.map((recipe) => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}

        </>
    )
}

export default LandingPage;