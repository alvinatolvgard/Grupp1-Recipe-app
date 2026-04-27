import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Store för att hantera användarens inloggningsstatus, favoriter och egna recept.
 * @author Maryam & Sanel
 */
const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isLoggedIn: false,
            favorites: [],
            myRecipes: [],

            login: (userData) => {
                set({ user: userData, isLoggedIn: true });
            },

            logout: () => {
                set({ user: null, isLoggedIn: false });
            },

            toggleFavorite: (recipeId) => set((state) => ({
                favorites: state.favorites.includes(recipeId)
                ? state.favorites.filter((id) => id !== recipeId)
                : [...state.favorites, recipeId]
            })),

            addMyRecipe: (newRecipe) => set((state) => ({
                myRecipes: [...state.myRecipes, newRecipe]
            })),

            deleteMyRecipe: (recipeId) => set((state) => ({
                myRecipes: state.myRecipes.filter((r) => r.id !== recipeId)
            }))
        }),
        {
            name: "auth-storage",
        }
    )
);

export default useAuthStore;
