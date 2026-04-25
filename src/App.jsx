import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Sidor
import LandingPage from './pages/LandingPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import LoginPage from './pages/LoginPage'; // Logga in sidan
import ProfilePage from './pages/ProfilePage'; //Profil sidan

//Komponenter
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer'; {/* lades till */}
import ProtectedRoute from './components/ProtectedRoute'; //Skydd för sidor som kräver inlogg




function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/recipe/:id' element={<RecipeDetailPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile' element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
        />
      </Routes>
      <Footer /> {/* lades till */}
    </BrowserRouter>
  );
}

export default App;
