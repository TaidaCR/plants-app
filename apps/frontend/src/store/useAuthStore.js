import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    isLoggedIn: false,
    logIn: (userData) => set({ 
        isLoggedIn: true,
        user: userData, 
        isAuthenticated: true }),
    logOut: () => set({ 
        isLoggedIn: false,
        user: null, 
        isAuthenticated: false
     }),
}))