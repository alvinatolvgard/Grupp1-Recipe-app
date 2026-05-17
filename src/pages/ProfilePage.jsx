import { useState } from 'react';
import useAuthStore from '../stores/useAuthStore';
import "./ProfilePage.css";

const ProfilePage = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const myRecipes = useAuthStore((state) => state.myRecipes);
    const addMyRecipe = useAuthStore((state) => state.addMyRecipe);
    const deleteMyRecipe = useAuthStore((state) => state.deleteMyRecipe);
    const updateMyRecipe = useAuthStore((state) => state.updateMyRecipe);

    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [instructions, setInstructions] = useState('');
    const [editingId, setEditingId] = useState(null);

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const addIngredientField = () => {
        setIngredients([...ingredients, '']);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const recipeData = {
            id: editingId || Date.now(),
            title: title,
            ingredients: ingredients,
            instructions: instructions
        };

        if (editingId) {
            updateMyRecipe(recipeData);
            setEditingId(null);
        } else {
            addMyRecipe(recipeData);
        }

        setTitle('');
        setIngredients(['']);
        setInstructions('');
    };

    const handleEdit = (recipe) => {
        setEditingId(recipe.id);
        setTitle(recipe.title);
        setIngredients(Array.isArray(recipe.ingredients) ? recipe.ingredients : [recipe.ingredients]);
        setInstructions(recipe.instructions || '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1> Welcome, {user?.name}!</h1>
            </div>

            <section className="profile-card">
                <h2>{editingId ? 'Edit Recipe' : 'Create New Recipe'}</h2>
                <form onSubmit={handleSubmit} className="recipe-form">
                    <input
                    className="recipe-input"
                    type="text"
                    placeholder="Recipe Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />

                    <div className="recipe-form-grid">
                        <div className="ingredients-container">
                            <label>Ingredients</label>
                            {ingredients.map((ingredient, index) => (
                            <input
                                key={index}
                                className="recipe-input"
                                type="text"
                                placeholder={`Ingredient ${index + 1}`}
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                                />
                        ))}

                            <button
                            type="button"
                            className="add-ingredient-line"
                            onClick={addIngredientField}
                            >
                                + Add Ingredient
                            </button>
                        </div>

                        <div className="instructions-container">
                            <label>Directions</label>
                            <textarea
                            className="recipe-textarea"
                            placeholder="Step by step instructions..."
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            required
                            ></textarea>
                        </div>
                    </div>

                    <button type="submit" className="add-recipe-button">
                        {editingId ? 'Update Recipe' : 'Save Recipe'}
                    </button>

                    {editingId && (
                        <button
                        type="button"
                        className="cancel-button"
                        onClick={() => {
                            setEditingId(null);
                            setTitle('');
                            setIngredients(['']);
                            setInstructions('');
                        }}
                        >
                            Cancel Edit
                        </button>
                    )}
                </form>
            </section>

            <section className="my-creations-section">
                <h2>My Creations</h2>
                {myRecipes.length === 0 ? (
                    <p className="empty-message">You havent created any recipes yet.</p>
                ) : (
                    <div className="my-recipes-list">
                        {myRecipes.map((recipe) => (
                            <div key={recipe.id} className="recipe-card-mini">
                                <h3>{recipe.title}</h3>
                                <p className="recipe-preview">
                                    {Array.isArray(recipe.ingredients)
                                    ? recipe.ingredients.filter(i => i.trim() !== "").join(', ')
                                    : recipe.ingredients}
                                </p>

                                <div className="recipe-card-actions">
                                    <button
                                    className="edit-button"
                                    onClick={() => handleEdit(recipe)}
                                    >
                                        Edit
                                    </button>
                                <button
                                    className="delete-button"
                                    onClick={() => deleteMyRecipe(recipe.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            </div>
        );
    };

export default ProfilePage;
