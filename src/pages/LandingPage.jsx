import { useRandomRecipe } from "../api/mealdb";
import SearchBar from "../components/SearchBar";
import useSearchStore from "../stores/useSearchStore";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import { filterRecipes } from "../utilities/searchHelpers";
import "./LandingPage.css";
import { useRecipesByCategory } from "../api/mealdb";
import { Users, Tag, Star, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const { recipe, loading, error } = useRandomRecipe();
  const searchResults = useSearchStore((state) => state.searchResults);
  const activeFilter = useSearchStore((state) => state.activeFilter);
  const { recipes, error: recipesError, loading: recipesLoading, fetchMore, allMealsIds } = useRecipesByCategory(activeFilter);
  const setActiveFilter = useSearchStore((state) => state.setActiveFilter);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const visibleRecipes = hasSearched ? filterRecipes(searchResults, activeFilter) : recipes;;
const [showLoading, setShowLoading] = useState(false);
const featuredRecipe = useSearchStore((state) => state.featuredRecipe);
const setFeaturedRecipe = useSearchStore((state) => state.setFeaturedRecipe);
const displayedRecipe = featuredRecipe ?? recipe;

// Loading-meddelande visas först efter 500ms
useEffect(() => {
    if (recipesLoading) {
        const timer = setTimeout(() => setShowLoading(true), 500);
        return () => clearTimeout(timer);
    } else {
        setShowLoading(false);
    }
}, [recipesLoading]);

  useEffect(() => {
    if (recipe && !featuredRecipe) {
        setFeaturedRecipe(recipe) 
    } 
    
  }, [recipe, featuredRecipe])


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
    <>
      {/* --Hero-sektion-- */}
      <div className="hero">
        <div className="hero-text">
          <p className="featured-recipes">FEATURED RECIPE</p>
          <h1 className="header-h1">{displayedRecipe.strMeal}</h1>
          <div className="header-icons">
            <span className="category-icon">
              <Tag size={16} />
              {displayedRecipe.strCategory}
            </span>
            <span className="servings-icon">
              <Users size={16} /> 
              <span className="servings-text">4 servings</span>
            </span>
          </div>
          <div className="rating">
            <div className="star-list">
              <span className="filled-star">
                <Star size={18} fill="currentColor" />
              </span>
              <span className="filled-star">
                <Star size={18} fill="currentColor" />
              </span>
              <span className="filled-star">
                <Star size={18} fill="currentColor" />
              </span>
              <span className="filled-star">
                <Star size={18} fill="currentColor" />
              </span>
              <span className="empty-star">
                <Star size={18} fill="none" />
              </span>
            </div>
            <span className="rating-numbers">4.2 (24)</span>
          </div>

          {/* TODO: länka till receptsida när den är klar */}
          <button
            className="view-recipe-btn"
            onClick={() => navigate(`/recipe/${displayedRecipe.idMeal}`)}
          >
            View Recipe
            <span>
              <ArrowRight size={16} />
            </span>
          </button>
        </div>
        <div>
          <img className="hero-img" src={displayedRecipe.strMealThumb} />
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
            className={
              activeFilter === "All" ? "category-btn active" : "category-btn"
            }
          >
            {" "}
            All{" "}
          </button>
        )}
        {filters.map((filter) => (
          <button
            className={
              activeFilter === filter ? "category-btn active" : "category-btn"
            }
            onClick={() => setActiveFilter(filter)}
            key={filter}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="recipe-list-header">
        <h2 className="recipe-category">{activeFilter} recipes</h2>
        <p className="recipe-count">
          {
            (hasSearched ? filterRecipes(searchResults, activeFilter) : allMealsIds)
              .length
          }{" "}
          recipes
        </p>
      </div>
      {/* Felmeddelande om det inte finns recept som matchar filtreringen */}
      {hasSearched &&
        filterRecipes(searchResults, activeFilter).length === 0 && (
          <p>No recipes found</p>
        )}

        {recipesError && <p>Our recipes seem to have gone missing. The chef is on it!</p>}
        {showLoading && <p>Preparing your recipes...</p>}
      {/* Hämtar receptkort och visar dom på sidan */}
      <div className="recipe-cards">
        {!recipesError && !showLoading && visibleRecipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>

      {/* show more knappen visas om det finns mer än 15 recept att hämtas */}
      {/* recipes.length är hur många recept som hämtats, 15, 30, 45 osv */}
      {recipes.length < (allMealsIds ?? []).length && (
        <button
        className="show-more-btn"
        onClick={fetchMore}
        >Show More</button>
      )}
    </>
  );
}

export default LandingPage;
