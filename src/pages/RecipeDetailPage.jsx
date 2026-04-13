import { useParams } from 'react-router-dom';
import { useRecipeById } from '../api/mealdb';
import useFavoritesStore from '../stores/useFavoritesStore';

/**
 * Sida för att visa detaljerad information om ett enskilt recept
 * @author Maryam
 */
function RecipeDetailPage() {
    const { id } = useParams()
    const { recipe, loading, error } = useRecipeById(id);
    const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

    if (loading) return <div>Loading...</div>
    if (error) return <div>Something went wrong: {error}</div>
    if (!recipe) return <div>Recipe not found</div>
    
    return (
        <div>
            {/* Hero-sektion med bild och grundläggande receptinfo */}
            <section className='hero'>
                <img 
                    src={recipe.strMealThumb} 
                    alt={recipe.strMeal} 
                />
                {/* Kategori och receptnamn */}
                <div className='hero-info'>
                    <span>{recipe.strCategory}</span>
                    <h1>{recipe.strMeal}</h1>
                </div>

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
                </div>

                {/* Save och Print-knappar */}
                <div className='action-buttons'>
                    <button onClick={() => isFavorite(recipe.idMeal)
                        ? removeFavorite(recipe.idMeal)
                        : addFavorite(recipe)}>
                        {isFavorite(recipe.idMeal) ? 'Saved' : 'Save'}
                    </button>
                    <button onClick={() => window.print()}>Print</button>
                </div>
            </section>
        </div>
    )
}

export default RecipeDetailPage
