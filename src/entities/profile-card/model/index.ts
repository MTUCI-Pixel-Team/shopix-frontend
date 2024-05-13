import { create } from 'zustand'
import { combine, devtools } from 'zustand/middleware'

export const useInfo = create(
    devtools(
        combine(
            {
                username: 'Guest',
                image: '',
                stars: 0,
            },
            (set) => ({
                setStars: (stars: number) => set({ stars }),
                setImage: (image: string) => set({ image }),
            }),
        ),
    ),
)
