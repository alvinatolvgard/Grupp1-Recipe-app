import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import RecipeDetailPage from './pages/RecipeDetailPage';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/recipe/:id' element={<RecipeDetailPage />} />
        </Routes>
      </BrowserRouter>
      <SearchBar />
    </>
  )
}

export default App