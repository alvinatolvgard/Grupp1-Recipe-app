import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import Footer from "./components/Footer/Footer";
{
  /* lades till */
}
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
      </Routes>
      <Footer /> {/* lades till */}
    </BrowserRouter>
  );
}

export default App;
