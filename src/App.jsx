import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import RecipeDetailPage from './pages/RecipeDetailPage'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/recipe/:id' element={<RecipeDetailPage />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
