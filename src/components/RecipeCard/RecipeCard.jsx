// Sanel receptkort
import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";
import { Star, Globe, Users, Heart } from "lucide-react";
import getDifficulty from "../../utilities/getDifficulty";
import useFavoritesStore from "../../stores/useFavoritesStore";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  // Hämtar favourites-åtgärder och -status från Zustand store
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();

  if (!recipe) return null;

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  // hämtar alla recipe-objekt, filtrerar sedan ut dom som behövs
  // och ser till att värdet inte är null, resultatet är sen en array
  const ingredientCount = Object.keys(recipe).filter(
    (key) => key.startsWith("strIngredient") && recipe[key],
  );

  return (
    <article
      className="recipe-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="card-header">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="card-image"
        />
        <span className="category-badge">{recipe.strCategory}</span>
        <button
          className="favorite-circle"
          onClick={(e) => {
            e.stopPropagation();
            // Togglar favoritstatus för receptet i Zustand store
            if (isFavorite(recipe.idMeal)) {
              removeFavorite(recipe.idMeal);
            } else {
              addFavorite(recipe);
            }
          }}
          style={{
            color: isFavorite(recipe.idMeal) ? "#c85a54" : "var(--color-text)",
          }}
        >
          <Heart
            size={20}
            fill={isFavorite(recipe.idMeal) ? "#c85a54" : "none"}
            style={{ transition: "all 0.3s ease" }}
          />
        </button>
      </div>

      <div className="card-body">
        <h2>{recipe.strMeal}</h2>
        <p className="recipe-desc">{recipe.strArea}</p>

        <div className="rating-row">
          <div className="stars-list">
            <span className="star-filled">
              <Star size={18} fill="currentColor" />
            </span>
            <span className="star-filled">
              <Star size={18} fill="currentColor" />
            </span>
            <span className="star-filled">
              <Star size={18} fill="currentColor" />
            </span>
            <span className="star-filled">
              <Star size={18} fill="currentColor" />
            </span>
            <span className="star-empty">
              <Star size={18} fill="none" />
            </span>
          </div>
          <span className="rating-number">4.2 (24)</span>
        </div>

        <div className="card-footer">
          <div className="meta-info">
            <span className="icon-text">
              <Globe size={16} /> {recipe.strArea}
            </span>
            <span className="icon-text">
              <Users size={16} /> {"4 servings"}
            </span>
          </div>
          <span className="difficulty-tag">
            {getDifficulty(ingredientCount)}
          </span>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
// Sanel receptkort
