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

export interface IUsers {
    email: string
    username: string
    rating: number
    full_name: string | null
    avatar: string | null
    created_at: string
    updated_at: string
    is_active: boolean
    id: string
}
