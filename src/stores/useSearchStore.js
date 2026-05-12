import { create } from "zustand";

/**
 * Store för att hantera sökning och filtrering av recept
 * @author Maryam
 */
const useSearchStore = create((set) => ({
    searchTerm: '',
    hasSearched: false,
    activeFilter: 'Breakfast',
    searchResults: [],
    featuredRecipe: null,
    categoryCache: {},

    // Uppdaterar söktermen som skickas till API:et
    setSearchTerm: (term) => {
        set({ searchTerm: term })
    },

    // Uppdaterar aktivt filter
    setActiveFilter: (filter) => {
        set({ activeFilter: filter })
    },

    // Sparar hela resultatlistan från API-anropet
    setSearchResults: (results) => {
        set({ searchResults: results })
    },

    // Markerar om en sökning har genomförts - styr vilket UI som visas
    setHasSearched: (bool) => set({ hasSearched: bool }),

    // Återställer sökning, filter resultat och sökstatus till ursprungsläget
    resetSearch: () => {
        set({ searchTerm: '', activeFilter: 'Breakfast', searchResults: [], hasSearched: false })
    },

    setFeaturedRecipe: (recipe) => set({ featuredRecipe: recipe }),

    // Cachar recept per kategori för att undvika onödiga API-anrop
    setCategoryCache: (category, recipes, allMealsIds) => set((state) => ({
        categoryCache: { ...state.categoryCache, [category]: {recipes, allMealsIds } }
    })),

}))

export default useSearchStore