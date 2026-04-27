import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import Favourites from "./pages/Favourites";
import Footer from "./components/Footer/Footer";
{
  /* lades till */
}
import Header from "./components/Header/Header";
import Toast from "./components/Toast/Toast";
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
      <Toast />
       <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/login" element={<LoginPage />} />
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
