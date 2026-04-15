import './App.css'
import RecipeCard from './components/RecipeCard/RecipeCard'; // Sanel receptkort
import SearchBar from './components/SearchBar'; // Alvina SeachBar
import { useRecipeSearch } from "./api/mealdb";
import { useState } from 'react';

function App() {

  const { recipes, loading, error, searchRecipes } = useRecipeSearch();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    await searchRecipes(searchTerm);
    setHasSearched(true);
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#F9F5F2', minHeight: '100vh' }}>
      <h1 style={{ fontFamily: 'Georgia, serif', marginBottom: '10px' }}>Alla recept</h1>

    <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
      <input
      name="search"
      type="text"
      placeholder="Sök efter recept (t.ex. chicken)"
      style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button type="submit" style={{ marginLeft: '10px', padding: '8px 16px' }}>Sök</button>
    </form>

    {loading && <p>Laddar recept...</p>}
    {error && <p style={{ color: 'red' }}>Fel uppstod vid sökning: {error}</p>}

    {hasSearched && !loading && !error && recipes.length === 0 && (
      <div style={{ textAlign: 'center', marginTop: '40px', width: '100%' }}>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          Hoppsan! Inga recept matchade din sökning. Prova något annat!
        </p>
      </div>
    )}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {recipes.map((r) => (
          <RecipeCard key={r.idMeal} recipe={r} />
        ))}
      </div>
    </div>
  );
}

export default App;