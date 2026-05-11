import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecipeSearch } from "../api/mealdb";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import "./SearchResultsPage.css";

/**
 * SearchResultsPage-komponent
 *
 * Visar sökresultat baserat på sökord i search bar. Använder useRecipeSearch hook för att hämta data från TheMealDB API.
 * @author Ivana
 * @returns {JSX.Element} Search results page
 */
function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { recipes, loading, error, searchRecipes } = useRecipeSearch();
  const lastSearchedQuery = useRef("");

  useEffect(() => {
    if (query && query !== lastSearchedQuery.current) {
      lastSearchedQuery.current = query;
      searchRecipes(query);
    }
  }, [query, searchRecipes]);

  if (loading) {
    return (
      <div className="search-results-page">
        <div className="search-results-container">
          <div className="loading">Searching for recipes...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results-page">
        <div className="search-results-container">
          <div className="error">
            <h2>Search Error</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-page">
      <div className="search-results-container">
        <div className="search-results-header">
          <h1>Search Results</h1>
          {query && (
            <p className="search-query">
              Showing results for: <strong>"{query}"</strong>
            </p>
          )}
        </div>

        <div className="search-results-content">
          {recipes.length > 0 ? (
            <>
              <div className="search-results-list-header">
                <p className="results-count">
                  {recipes.length} recipe{recipes.length !== 1 ? "s" : ""} found
                </p>
              </div>
              <div className="search-results-grid">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.idMeal} recipe={recipe} />
                ))}
              </div>
            </>
          ) : (
            query && (
              <div className="no-results">
                <h2>No recipes found</h2>
                <p>
                  We couldn't find any recipes matching "{query}". Try searching
                  for a different term or ingredient.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResultsPage;
