import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useRecipeById, useRecipesByCategory } from '../api/mealdb';
import useFavoritesStore from '../stores/useFavoritesStore';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import getDifficulty from '../utilities/getDifficulty';
import './RecipeDetailPage.css';

/**
 * Sida för att visa detaljerad information om ett enskilt recept
 * @author Maryam
 */
function RecipeDetailPage() {
    const { id } = useParams()
    const { recipe, loading, error } = useRecipeById(id);
    const { recipes } = useRecipesByCategory(recipe?.strCategory);
    const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
    const navigate = useNavigate();

    if (loading) return <div>Loading...</div>
    if (error) return <div>Something went wrong: {error}</div>
    if (!recipe) return <div>Recipe not found</div>

    // Skapar en lista med ingredienser och mängder från TheMealDB (max 20 st)
    // Filtrerar bort tomma ingredienser
    const ingredients = Array.from({ length: 20 }, (_, i) => {
        const ingredient = recipe[`strIngredient${i + 1}`]
        const measure = recipe[`strMeasure${i + 1}`]
        return {ingredient, measure};
    }).filter(item => item.ingredient && item.ingredient.trim() !== '');
    
    // Delar upp instruktionerna i separata steg och filtrerar bort tomma rader
    const instructions = recipe.strInstructions
        .split('\n')
        .filter(step => step.trim() !== '');

    return (
        <div>
            <div className='recipe-detail-page'>
                {/* Tillbaka-knapp */}
                <button className='back-button' onClick={() => navigate(-1)}>
                    <ArrowLeft /> Back
                </button>

                {/* Hero-sektion med bild och grundläggande receptinfo */}
                <section className='hero'>
                    <div className='hero-img-wrapper'>
                        <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                    />
                    </div>
            
                    {/* Kategori, receptnamn, info-kort och knappar*/}
                    <div className='hero-info'>
                        <span className='category-badge'>{recipe.strCategory}</span>
                        <h1>{recipe.strMeal}</h1>
                        {/* Info-kort med ursprungsland, kategori och portioner */}
                        <div className='info-card'>
                            <div className='info-item'>
                                <span>Cuisine</span>
                                <p>{recipe.strArea}</p>
                            </div>
                            <div className='info-item'>
                                <span>Category</span>
                                <p>{recipe.strCategory}</p>
                            </div>
                            <div className='info-item'>
                                <span>Servings</span>
                                <p>4</p>
                            </div>
                            <div className='info-item'>
                                <span>Difficulty</span>
                                <p>{getDifficulty(ingredients)}</p>
                            </div>
                        </div>
                        {/* Save och Print-knappar */}
                        <div className='action-buttons'>
                            <button className='save-button' onClick={() => isFavorite(recipe.idMeal)
                                ? removeFavorite(recipe.idMeal)
                                : addFavorite(recipe)}>
                                {isFavorite(recipe.idMeal) ? 'Saved' : 'Save'}
                            </button>
                            <button className='print-button' onClick={() => window.print()}>Print</button>
                        </div>
                    </div>
                </section>
                <div className='recipe-content'>
                    {/* Ingrediens-lista */}
                    <section className='ingredient-list'>
                        <h2>Ingredients</h2>
                        <ul>
                            {ingredients.map((item, index) =>
                                <li key={index}>{item.measure} {item.ingredient}</li>
                            )}
                        </ul>
                    </section>
                    {/* Instruktioner */}
                    <section className='instructions-list'>
                        <h2>Instructions</h2>
                        <ol>
                            {instructions.map((step, index) =>
                                <li key={index}>{step}</li>
                            )}
                        </ol>
                    </section>
                </div>
            </div>
            {/* More Recipes-sektion */}
            <section className='more-recipes'>
                <div className='more-recipes-content'>
                    <h2>More {recipe.strCategory} Recipes</h2>
                    <div className='more-recipes-grid'>
                        {recipes && recipes.slice(0, 3).map((r) => (
                            <RecipeCard key={r.idMeal} recipe={r} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default RecipeDetailPage
