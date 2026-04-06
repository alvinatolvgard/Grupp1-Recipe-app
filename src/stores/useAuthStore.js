import { create } from "zustand";

/**
 * Store för att hantera användarens inloggningsstatus
 * @author Maryam
 */
const useAuthStore = create((set) => ({
    user: null,
    isLoggedIn: false,

    // Loggar in användaren och sparar användardatan
    login: (userData) => {
        set({ user: userData, isLoggedIn: true })
    },

    // Loggar ut användaren och rensar användardatan
    logout: () => {
        set({ user: null, isLoggedIn: false })
    }
}))

export default useAuthStore