import { useState } from 'react';
import useAuthStore from '../stores/useAuthStore';

const ProfilePage = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const myRecipes = useAuthStore((state) => state.myRecipes);
    const addMyRecipe = useAuthStore((state) => state.addMyRecipe);
    const deleteMyRecipe = useAuthStore((state) => state.deleteMyRecipe);

    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newRecipe = {
            id: Date.now(),
            title: title,
            ingredients: ingredients
        };

        addMyRecipe(newRecipe);
        setTitle('');
        setIngredients('');
    };

    return (
        <div style={{ padding: 'var(--spacing-xl)', maxWidth: 'var(--container-max-width)', margin: '0 auto' }}>
            <h1> Welcome, {user?.name}!</h1>

            <section style={{ marginBottom: '40px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <h2>Create New Recipe</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                    type="text"
                    placeholder="Recipe Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                        style={{ padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc' }}
                    />

                    <textarea
                    placeholder="Ingredients (e.g. 2 eggs, flour...)"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                        style={{ padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc', minHeight: '80px' }}
                    ></textarea>

                    <button type="submit" style={{ padding: '10px', backgroundColor: 'var(--color-secondary)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                        Save Recipe
                    </button>
                </form>
            </section>

            <section>
                <h2>My Creations</h2>
                {myRecipes.length === 0 ? (
                    <p>You haven't created any recipes yet.</p>
                ) : (
                    <div style={{ display: 'grid', gap: '15px' }}>
                        {myRecipes.map((recipe) => (
                            <div key={recipe.id} style={{ border: '1px solid #eee', padding: '15px', borderRadius: 'var(--radius-sm)', position: 'relative' }}>
                                <h3>{recipe.title}</h3>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{recipe.ingredients}</p>
                                <button
                                    onClick={() => deleteMyRecipe(recipe.id)}
                                    style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                                    >
                                        Remove
                                    </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <button
                onClick={logout}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default ProfilePage;