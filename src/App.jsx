import './App.css'
import RecipeCard from './components/RecipeCard/RecipeCard'; // Sanel receptkort
import SearchBar from './components/SearchBar'; // Alvina SeachBar

function App() {

  const recipes = [
    {
      id: 1,
      title: "Krämig Tryffelpasta",
      description: "En elegant pastarätt med en rik tryffelkräm, perfekt för en lyxig middag hemma.",
      image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=500",
      time: "30 min",
      difficulty: "Enkel",
      servings: 4,
      rating: 4.8,
      category: "Middag"
    },
    {
      id: 2,
      title: "Smoothie Bowl",
      description: "En fräsch och nyttig frukost fylld med vitaminer och toppad med nötter.",
      image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=500",
      time: "10 min",
      difficulty: "Enkel",
      servings: 1,
      rating: 4.5,
      category: "Frukost"
    },
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: '#F9F5F2', minHeight: '100vh' }}>
      <h1 style={{ fontFamily: 'Georgia, serif', marginBottom: '10px' }}>Alla recept</h1>

      <SearchBar />

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {recipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </div>
  );
}

export default App;