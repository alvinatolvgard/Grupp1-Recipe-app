import { useParams } from 'react-router-dom'
import { useRecipeById } from '../api/mealdb'

/**
 * Sida för att visa detaljerad information om ett enskilt recept
 * @author Maryam
 */
function RecipeDetailPage() {
    const { id } = useParams()
    const { recipe, loading, error } = useRecipeById(id);

    if (loading) return <div>Loading...</div>
    if (error) return <div>Something went wrong: {error}</div>
    if (!recipe) return <div>Recipe not found</div>
    
    return (
        <div>
            <section className='hero'>
                <div className='hero-info'>
                    <span>{recipe.strCategory}</span>
                    <h1>{recipe.strMeal}</h1>
                </div>
            </section>
        </div>
    )
}

export default RecipeDetailPage
