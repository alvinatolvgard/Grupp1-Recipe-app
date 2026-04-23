import { useRandomRecipe } from "../api/mealdb";
import SearchBar from "../components/SearchBar";
import useSearchStore from "../stores/useSearchStore";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import { filterRecipes } from "../utilities/searchHelpers";
import "./LandingPage.css";
import { useRecipesByCategory } from "../api/mealdb";
import { Users, Tag, Star, ArrowRight } from 'lucide-react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const { recipe, loading, error } = useRandomRecipe();
    const searchResults = useSearchStore((state) => state.searchResults);
    const activeFilter = useSearchStore((state) => state.activeFilter);
    const { recipes } = useRecipesByCategory(activeFilter);
    const setActiveFilter = useSearchStore((state) => state.setActiveFilter);
    const [hasSearched, setHasSearched] = useState(false);
    const navigate = useNavigate();
    const [visibleCount, setVisibleCount] = useState(15);
    const visibleRecipes = (hasSearched ? filterRecipes(searchResults, activeFilter) : recipes).slice(0, visibleCount);
    console.log('recipes:', recipes);
    console.log('visibleRecipes', visibleRecipes);

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
                    <h1 className="header-h1">{recipe.strMeal}</h1>
                    <div className="header-icons">
                        <span className="category-icon"><Tag size={16} />{recipe.strCategory}</span>
                        <span className="servings-icon"><Users size={16} /> {"4 servings"}</span>
                    </div>
                    <div className="rating">
                        <div className="star-list">
                            <span className="filled-star"><Star size={18} fill="currentColor" /></span>
                            <span className="filled-star"><Star size={18} fill="currentColor" /></span>
                            <span className="filled-star"><Star size={18} fill="currentColor" /></span>
                            <span className="filled-star"><Star size={18} fill="currentColor" /></span>
                            <span className="empty-star"><Star size={18} fill="none" /></span>
                        </div>
                        <span className="rating-numbers">4.2 (24)</span>
                    </div>

                    {/* TODO: länka till receptsida när den är klar */}
                    <button className="view-recipe-btn" onClick={() => navigate(`/recipe/${recipe.idMeal}`)}>View Recipe<span>
                        <ArrowRight size={16} />
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
                        className={activeFilter === "All" ? "category-btn active" : "category-btn"}> All </button>
                )}
                {filters.map((filter) => (
                    <button className={activeFilter === filter ? "category-btn active" : "category-btn"} onClick={() => setActiveFilter(filter)} key={filter}>
                        {filter}</button>
                ))}
            </div >
            <div className="recipe-list-header">
                <h2 className="recipe-category">{activeFilter} recipes</h2>
                <p className="recipe-count">{(hasSearched ? filterRecipes(searchResults, activeFilter) : recipes).length} recipes</p>
            </div>
            {/* Felmeddelande om det inte finns recept som matchar filtreringen */}
            {
                hasSearched && filterRecipes(searchResults, activeFilter).length === 0 && (
                    <p>No recipes found</p>
                )
            }

            {/* Hämtar receptkort och visar dom på sidan */}
            <div className="recipe-cards">
                {visibleRecipes.map((recipe) => (
                    <RecipeCard key={recipe.idMeal} recipe={recipe} />
                ))}
            </div>

            {/* Kollar ifall listan med recept är längre än 15, om den är det visas Show More knappen. om inte visas knappen inte */}
            {/* När knappen klickas ökas visibleCount med 15 och visar därmed 15 recept till */}
            {visibleCount < (hasSearched ? filterRecipes(searchResults, activeFilter) : recipes).length && (
                <button className="show-more-btn" onClick={() => setVisibleCount(visibleCount + 15)}>Show More</button>
            )}


        </>
    )
}

export default LandingPage;