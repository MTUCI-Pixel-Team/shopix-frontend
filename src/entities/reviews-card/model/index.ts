import { create } from 'zustand'
import { combine, devtools } from 'zustand/middleware'

export const useInfo = create(
    devtools(
        combine(
            {
                username: '',
                stars: 0,
            },
            (set) => ({
                setUsername: (username: string) => set({ username }),
            }),
        ),
    ),
)
