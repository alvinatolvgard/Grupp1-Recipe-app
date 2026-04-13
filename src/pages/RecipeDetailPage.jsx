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

    // Skapar en lista med ingredienser och mängder från TheMealDB (max 20 st)
    // Filtrerar bort tomma ingredienser
    const ingredients = Array.from({ length: 20 }, (_, i) => {
        const ingredient = recipe[`strIngredient${i + 1}`]
        const measure = recipe[`strMeasure${i + 1}`]
        return {ingredient, measure};
    }).filter(item => item.ingredient && item.ingredient.trim() !== '');
    
    // Delar upp instruktionerna i separata steg och filtrerar bort tomma rader
    const instructions = recipe.strInstructions
        .split('\r\n')
        .filter(step => step.trim() !== '');

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
    )
}

export default RecipeDetailPage
