import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    loading: true,
    user: null,
    isAuthenticated: false,

    setUser: (user) => set({
        user: user ? {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
        } : null,
        loading: false,
        isAuthenticated: !!user
    }),
}));