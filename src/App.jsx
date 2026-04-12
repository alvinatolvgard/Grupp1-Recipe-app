import './App.css'
import './css/App.css'
import RecipeCard from './components/RecipeCard/RecipeCard'; // Sanel receptkort

function App() {
  return (
    <div style={{ padding: '40px', backgroundColor: '#F9F5F2', minHeight: '100vh' }}>
      <h1 style={{ fontFamily: 'Georgia, serif', marginBottom: '30px', }}>Alla recept</h1>
      <RecipeCard />
    </div>
  );
}

export default App;

