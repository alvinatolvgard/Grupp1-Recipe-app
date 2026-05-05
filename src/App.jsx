import { BrowserRouter, Routes, Route, ScrollRestoration } from "react-router-dom";
import "./App.css";

// Sidor
import LandingPage from "./pages/LandingPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import Favourites from "./pages/Favourites";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import About from './pages/About';

// Komponenter
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Toast from "./components/Toast/Toast";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Toast />
      <ScrollToTopButton />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/about' element={<About />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
