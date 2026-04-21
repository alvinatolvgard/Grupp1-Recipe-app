import { useRandomRecipe } from "../api/mealdb";
import SearchBar from "../components/SearchBar";
import useSearchStore from "../stores/useSearchStore";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import { filterRecipes } from "../utilities/searchHelpers";
import "./LandingPage.css";
import { useRecipesByCategory } from "../api/mealdb";
import { useState } from "react";

function LandingPage() {
    const { recipe, loading, error } = useRandomRecipe();
    const searchResults = useSearchStore((state) => state.searchResults);
    const activeFilter = useSearchStore((state) => state.activeFilter);
    const { recipes } = useRecipesByCategory(activeFilter);
    const setActiveFilter = useSearchStore((state) => state.setActiveFilter);
    const [hasSearched, setHasSearched] = useState(false);

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

    const filters = ["Breakfast", "Dessert", "Vegetarian", "Vegan"];

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
                <SearchBar setHasSearched={setHasSearched} />
            </div>

            {/* --Recipecard-sektion-- */}
            {/* Skapar filtreringsknappar för All, Breakfast, Dessert, Vegetarian och Vegan */}
            <div className="category-btns">
                {hasSearched && (
                    <button
                        onClick={() => setActiveFilter("All")}
                        className={activeFilter === "All" ? "active" : ""}> All </button>
                )}
                {filters.map((filter) => (
                    <button onClick={() => setActiveFilter(filter)} key={filter}
                        className={activeFilter === filter ? "active" : ""}>
                        {filter}</button>
                ))}
            </div >
            {/* Felmeddelande om det inte finns recept som matchar filtreringen */}
            {
                hasSearched && filterRecipes(searchResults, activeFilter).length === 0 && (
                    <p>No recipes found</p>
                )
            }

            {/* Hämtar receptkort och visar dom på sidan */}
            <div className="recipe-cards">
            {
                (hasSearched ? filterRecipes(searchResults, activeFilter) : recipes).map((recipe) => (
                    <RecipeCard key={recipe.idMeal} recipe={recipe} />
                    ))
            }
            </div>

        </>
    )
}

export default LandingPage;