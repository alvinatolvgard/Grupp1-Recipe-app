import { create } from "zustand";

/**
 * Store för att hantera sökning och filtrering av recept
 * @author Maryam
 */
const useSearchStore = create((set) => ({
    searchTerm: '',
    activeFilter: 'Breakfast',
    searchResults: [],

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

    // Återställer sökning, filter och resultat till ursprungsläget
    resetSearch: () => {
        set({ searchTerm: '', activeFilter: 'Breakfast', searchResults: [] })
    }
}))

export default useSearchStore