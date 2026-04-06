import { create } from "zustand";

/**
 * Store för att hantera sökning och filtrering av recept
 * @author Maryam
 */
const useSearchStore = create((set) => ({
    searchTerm: '',
    activeFilter: 'all',

    // Uppdaterar söktermen
    setSearchTerm: (term) => {
        set({ searchTerm: term })
    },

    // Uppdaterar aktivt filter
    setActiveFilter: (filter) => {
        set({ activeFilter: filter })
    },

    // Återställer sökning och filter till ursprungsläget
    resetSearch: () => {
        set({ searchTerm: '', activeFilter: 'all' })
    }
}))

export default useSearchStore