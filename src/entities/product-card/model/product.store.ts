import { create } from 'zustand'
import { combine, devtools } from 'zustand/middleware'

export const useProducts = create(
    devtools(
        combine(
            {
                minPrice: 0,
                maxPrice: 0,
            },
            (set) => ({
                setMinPrice: (minPrice: number) => set({ minPrice }),
                setMaxPrice: (maxPrice: number) => set({ maxPrice }),
            }),
        ),
    ),
)
