// Alla fetch-funktioner mot TheMealDB API 
// (eller annat API om vi väljer något annat, ändra isåfall filnamn)
// Använder vi ett till API, gör en ny fil med API:ets namn 

import { useState } from "react";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

export function useRecipeSearch() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchRecipes = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/search.php?s=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error(`HTTP-fel: ${response.status}`);
      }

      const data = await response.json();
      setRecipes(data.meals || []); // null om inga resultat
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { recipes, loading, error, searchRecipes };
}