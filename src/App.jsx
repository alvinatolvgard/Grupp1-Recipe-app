import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import RecipeDetailPage from './pages/RecipeDetailPage';
import Footer from './components/Footer/Footer'; {/* lades till */}

// ta bort ---
import RecipeCard from './components/RecipeCard/RecipeCard'
import { useState, useEffect } from 'react'
// ---

function App() {
  // ta bort ---
  const [recipe, setRecipe] = useState(null)

useEffect(() => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => setRecipe(data.meals[0]))
}, [])
// ----

  return (
    <BrowserRouter>
      <Routes>
        {/* ta bort */}
        <Route path='/' element={recipe && <RecipeCard recipe={recipe} />} />
        {/* --- */}
        <Route path='/recipe/:id' element={<RecipeDetailPage />} />
      </Routes>
      <Footer /> {/* lades till */}
    </BrowserRouter>
  );
}

export default App;