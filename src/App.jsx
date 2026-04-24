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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Toast />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
      <Footer /> {/* lades till */}
    </BrowserRouter>
  );
}

export default App;
