import { create } from "zustand";

const loadFavorites = () => {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn("Could not load favorites from localStorage", error);
    return [];
  }
};

const saveFavorites = (favorites) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.warn("Could not save favorites to localStorage", error);
  }
};

/**
 * Store för att hantera användarens favoritrecept + toast-notiser
 * @author Maryam & Ivana
 * @returns {Object} Zustand store med favoritrecept och toast-funktionalitet
 */
let toastTimeoutId;

const useFavoritesStore = create((set, get) => ({
  /**
   * Initial state:
   * - Favorites laddas direkt från localStorage vid init
   * - Toast är null tills något triggar en notis
   */
  favorites: loadFavorites(),
  toast: null,

  /**
   * Sätter en toast och auto-rensar den efter 2 sekunder.
   * - Rensar tidigare timeout för att undvika "race conditions"
   */
  setToast: (toast) => {
    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }

    set({ toast });

    if (toast) {
      toastTimeoutId = setTimeout(() => {
        set({ toast: null });
      }, 2000);
    }
  },

  // Lägger till ett recept i favoritlistan
  addFavorite: (recipe) => {
    set((state) => {
      const nextFavorites = [...state.favorites, recipe];
      saveFavorites(nextFavorites);
      return { favorites: nextFavorites };
    });

    get().setToast({
      title: recipe.strMeal,
      subtitle: "added to Favourites",
    });
  },

  // Tar bort ett recept från favoritlistan
  removeFavorite: (recipeId) => {
    const removedRecipe = get().favorites.find(
      (recipe) => recipe.idMeal === recipeId,
    );

    set((state) => {
      const nextFavorites = state.favorites.filter(
        (recipe) => recipe.idMeal !== recipeId,
      );
      saveFavorites(nextFavorites);
      return { favorites: nextFavorites };
    });

    get().setToast({
      title: removedRecipe?.strMeal || "Recipe removed",
      subtitle: "removed from Favourites",
    });
  },

  // Returnerar true om receptet finns i favoritlistan, annars false
  isFavorite: (recipeId) => {
    return get().favorites.some((recipe) => recipe.idMeal === recipeId);
  },
}));

export default useFavoritesStore;
