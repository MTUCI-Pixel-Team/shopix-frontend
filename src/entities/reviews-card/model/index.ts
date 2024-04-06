import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useInfo = create(
    devtools((set) => ({
        username: 0,
        stars: 0,
        setUsername: (username: string) => set({ username }),
    })),
)
