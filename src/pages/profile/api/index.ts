import { useMutation } from '@tanstack/react-query'
import { Request } from '@/shared/api'

export const useProfileChanges = () => {
    const profileChanges = useMutation({
        mutationFn: async (data: {
            email: string
            password: string
            username: string
            rating: number
        }) => {
            if (data.password !== '') {
                return Request.patchWithToken(`users/me/`, {
                    email: data.email,
                    password: data.password,
                    username: data.username,
                    rating: 0,
                })
            } else {
                return Request.patchWithToken(`users/me/`, {
                    email: data.email,
                    username: data.username,
                    rating: 0,
                })
            }
        },
    })
    return profileChanges
}
