import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Sidor
import LandingPage from "./pages/LandingPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import Favourites from "./pages/Favourites";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

// Komponenter
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Toast from "./components/Toast/Toast";
import ProtectedRoute from "./components/ProtectedRoute";

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
