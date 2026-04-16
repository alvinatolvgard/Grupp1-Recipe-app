import { create } from 'zustand'

/**
 * Store för att hantera användarens favoritrecept
 * @author Maryam
 */
const useFavoritesStore = create((set, get) => ({
    favorites: [],

    // Lägger till ett recept i favoritlistan
    addFavorite: (recipe) => {
        set((state) => ({
            favorites: [...state.favorites, recipe]
        }))
    },

    // Tar bort ett recept från favoritlistan
    removeFavorite: (recipeId) => {
        set((state) => ({
            favorites: state.favorites.filter((recipe) => recipe.idMeal !== recipeId)
        }))
    },

    // Returnerar true om receptet finns i favoritlistan, annars false
    isFavorite: (recipeId) => {
        return get().favorites.some((recipe) => recipe.idMeal === recipeId)
    }
}))

export default useFavoritesStore