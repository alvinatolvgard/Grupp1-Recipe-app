import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Tag, Users, ChefHat, Share2, Check } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
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
    const [isShareOpen, setIsShareOpen] = useState(false);
    const shareRef = useRef(null);
    const [isCopied, setIsCopied] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (shareRef.current && !shareRef.current.contains(e.target)) {
                setIsShareOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                                <span><Globe size={15}/> Cuisine</span>
                                <p>{recipe.strArea}</p>
                            </div>
                            <div className='info-item'>
                                <span><Tag size={15}/> Category</span>
                                <p>{recipe.strCategory}</p>
                            </div>
                            <div className='info-item'>
                                <span><Users size={15}/> Servings</span>
                                <p>4</p>
                            </div>
                            <div className='info-item'>
                                <span><ChefHat size={15}/> Difficulty</span>
                                <p>{getDifficulty(ingredients)}</p>
                            </div>
                        </div>

                        {/* Save, Share och Print-knappar */}
                        <div className='action-buttons-wrapper'>
                            <div className='action-buttons'>
                                <button className='save-button' onClick={() => isFavorite(recipe.idMeal)
                                    ? removeFavorite(recipe.idMeal)
                                    : addFavorite(recipe)}>
                                    {isFavorite(recipe.idMeal) ? 'Saved' : 'Save'}
                                </button>
                                <div className='share-wrapper' ref={shareRef}>
                                    <button 
                                        className={`share-button ${isShareOpen ? 'share-button-active' : ''}`} 
                                        onClick={() => setIsShareOpen(!isShareOpen)}>
                                        <Share2 size={15}/> Share
                                    </button>
                                    {isShareOpen && (
                                        <div className='share-dropdown'>
                                            <button onClick={() => {
                                                navigator.clipboard.writeText(window.location.href);
                                                setIsCopied(true);
                                                setTimeout(() => setIsCopied(false), 2000);
                                            }}> Copy Link 
                                                {isCopied && <Check size={13}/>}
                                            </button>
                                            <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')}>
                                                Share on Twitter
                                            </button>
                                            <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}>
                                                Share on Facebook
                                            </button>
                                            <button onClick={() => window.open(`https://pinterest.com/pin/create/button/?url=${window.location.href}`, '_blank')}>
                                                Share on Pinterest
                                            </button>
                                        </div>
                                        )}
                                    </div>
                                <button className='print-button' onClick={() => window.print()}>Print</button>
                            </div>
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
