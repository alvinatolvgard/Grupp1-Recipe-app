// React & router
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { Users, Tag, ArrowRight } from "lucide-react";

// API hooks
import { useRandomRecipe, useRecipesByCategory } from "../api/mealdb";

// Store
import useSearchStore from "../stores/useSearchStore";

// Components
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import StarRating from "../components/StarRating/StarRating";

// Utilities & styles
import { filterRecipes } from "../utilities/searchHelpers";
import "./LandingPage.css";

/**
 * LandingPage component
 * 
 * Applikationens startsida. Visar ett slumpmässigt utvalt recept som hero,
 * en sökfunktion samt ett filtrerbart receptbibliotek hämtat från The MealDB.
 * 
 * Funktionalitet:
 * - Visar ett featured recipe i hero-sektionen (sparas i Zustand så att det inte byts vid re-rendering)
 * - Låter användaren söka efter recept via SearchBar
 * - Filtrerar recept per kategori (Breakfast, Dessert, Vegetarian, Vegan)
 * - Laddar fler recept via "Show More"-knapp
 * - Fördröjer loading-indikator med 500ms för att undvika flimmer
 * - Navigerar till receptsida vid klick på "View Recipe"
 * 
 * @author Alvina
 * @component
 * @returns {JSX.Element | null } Renderar startsidan, en loading/error-text, eller null
 */

function LandingPage() {
  // API data
  const { recipe, loading, error } = useRandomRecipe();

  // Store - state (måste deklareras innan useRecipesByCategory)
  const activeFilter = useSearchStore((state) => state.activeFilter);

  // API data (behöver activeFilter)
  const { recipes, error: recipesError, loading: recipesLoading, fetchMore, allMealsIds } = useRecipesByCategory(activeFilter);

  // Store - state
  const searchResults = useSearchStore((state) => state.searchResults);
  const featuredRecipe = useSearchStore((state) => state.featuredRecipe);
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const scrollPosition = useSearchStore((state) => state.scrollPosition);

  // Store - actions
  const setActiveFilter = useSearchStore((state) => state.setActiveFilter);
  const setFeaturedRecipe = useSearchStore((state) => state.setFeaturedRecipe);
  const resetSearch = useSearchStore((state) => state.resetSearch);
  const setScrollPosition = useSearchStore((state) => state.setScrollPosition);

  // Local state
  const [hasSearched, setHasSearched] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  // Router
  const navigate = useNavigate();

  // Derived
  const visibleRecipes = hasSearched ? filterRecipes(searchResults, activeFilter) : recipes;
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

// Återställer scroll-positionen när användaren navigerar tillbaka till landingpage
// Väntar till sidan är tillräckligt lång innan den scrollar.
  useEffect(() => {
    if (scrollPosition === 0) return;

    const interval = setInterval(() => {
      if (document.body.scrollHeight >= scrollPosition) {
        window.scrollTo(0, scrollPosition);
        clearInterval(interval);
      }
    }, 50);
  }, []);

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
            <StarRating recipeId={recipe.idMeal} />
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
            onClick={() => {
              resetSearch();
              setHasSearched(false);
              setActiveFilter("All");
            }}
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
            onClick={() => {
              resetSearch();
              setHasSearched(false);
              setActiveFilter(filter);
            }}
            key={filter}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="recipe-list-header">
        <h2 className="recipe-category">
          {hasSearched ? `${searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)} recipes` : `${activeFilter} recipes`}
        </h2>
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
          <RecipeCard key={recipe.idMeal} recipe={recipe} setScrollPosition={setScrollPosition} />
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
