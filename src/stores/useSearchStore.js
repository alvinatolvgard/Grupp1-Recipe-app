import { create } from "zustand";

/**
 * Store för att hantera sökning och filtrering av recept
 * @author Maryam
 */
const useSearchStore = create((set) => ({
    searchTerm: '',
    activeFilter: 'Breakfast',
    searchResults: [],
    featuredRecipe: null,
    categoryCache: {},
    searchInput: '',
    scrollPosition: 0,

    // Uppdaterar söktermen
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

    setSearchInput: (input) => set({ searchInput: input }),

    // Återställer sökning, filter och resultat till ursprungsläget
    resetSearch: () => {
        set({ searchTerm: '', activeFilter: 'Breakfast', searchResults: [], searchInput: '' })
    },

    setFeaturedRecipe: (recipe) => set({ featuredRecipe: recipe }),


    setCategoryCache: (category, recipes, allMealsIds) => set((state) => ({
        categoryCache: { ...state.categoryCache, [category]: {recipes, allMealsIds } }
    })),

    setScrollPosition: (pos) => set({ scrollPosition: pos }),
}))

export default useSearchStore