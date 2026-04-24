import useFavoritesStore from "../stores/useFavoritesStore";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import "./Favourites.css";
import { Heart } from "lucide-react";

/**
 * Favourites page - displays all recipes saved by the user
 * @author Ivana
 * @returns {JSX.Element} Favouritsidan som visar alla sparade recept i en grid-layout. Inkluderar en header med ikon och beskrivning, samt hanterar tomt tillstånd när inga favoriter finns.
 */
function Favourites() {
  // Hämtar favoritrecepten från Zustand store
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <div className="favourites-page">
      {/* Header Section */}
      <div className="favourites-header">
        <div className="favourites-icon">
          <Heart size={40} fill="#c85a54" stroke="#c85a54" />
        </div>
        <h1>Your Favourites</h1>
        <p className="favourites-subtitle">
          All your saved recipes in one place. Ready to cook whichever
          inspiration strikes.
        </p>
      </div>

      {/* Favorites Count */}
      <div className="favourites-container">
        <p className="favourites-count">
          {favorites.length} {favorites.length === 1 ? "recipe" : "recipes"}{" "}
          saved
        </p>

        {/* Om inga favouriter finns, visa ett meddelande */}
        {favorites.length === 0 ? (
          <div className="no-favorites">
            <p>You haven't added any recipes to your favorites yet.</p>
            <p>
              Start adding recipes to your favorites by clicking the heart icon
              on recipe cards.
            </p>
          </div>
        ) : (
          // Visar alla favoritrecept i en grid-layout med hjälp av RecipeCard-komponenten
          <div className="favourites-grid">
            {favorites.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favourites;
