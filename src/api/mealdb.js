// Alla fetch-funktioner mot TheMealDB API 
// (eller annat API om vi väljer något annat, ändra isåfall filnamn)
// Använder vi ett till API, gör en ny fil med API:ets namn 

import { useEffect, useState } from "react";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

/**
 * Söker efter recept från TheMealDB baserat på sökterm
 * @author Albrim
 */
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
      return data.meals || [];
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { recipes, loading, error, searchRecipes };
}

/**
 * Hämtar ett enskilt recept från TheMealDB baserat på ID
 * @author Maryam
 * @param {string} id - receptets unika ID från URL-parametern
 * @returns {Object} recipe - receptobjektet, loading-status och eventuellt felmeddelande
 */
export function useRecipeById(id) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE}/lookup.php?i=${id}`);

        if (!response.ok) {
          throw new Error(`Something went wrong: ${response.status}`);
        }

        const data = await response.json();
        setRecipe(data.meals[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  return { recipe, loading, error };
}

/**
 * Hämtar recept från TheMealDB baserat på kategori
 * @author Maryam
 * @param {string} category - receptets kategori, tex "Seafood"
 * @returns {Object} recipes - lista med recept, loading-status och eventuellt felmeddelande
 */
export function useRecipesByCategory(category) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE}/filter.php?c=${category}`);

        if (!response.ok) {
          throw new Error(`Something went wrong: ${response.status}`);
        }

        const data = await response.json();
        setRecipes(data.meals);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [category]);

  return { recipes, loading, error };
}

/**
 * Hämtar ett slumpmässigt recept från TheMealDB
 * @author Alvina
 * @returns {object} recipe - receptobjektet, loading-status och eventuellt felmeddelande
 */

export function useRandomRecipe() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE}/random.php`);

        if (!response.ok) {
          throw new Error(`Something went wrong: ${response.status}`);
        }

        const data = await response.json();
        setRecipe(data.meals[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, []);

  return { recipe, loading, error };
}