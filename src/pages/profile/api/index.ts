import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Request } from '@/shared/api'

export const useProfileChanges = (id: number) => {
    const queryClient = useQueryClient()

    const profileChanges = useMutation({
        mutationFn: async (data: {
            email: string
            password: string
            username: string
            rating: number
            formAvatar: FormData | undefined
        }) => {
            if (
                data.password !== '' &&
                data.formAvatar?.get('avatar') !== 'undefined'
            ) {
                return Request.patchWithToken(`users/me/`, {
                    email: data.email,
                    password: data.password,
                    username: data.username,
                    rating: 0,
                    avatar: data.formAvatar?.get('avatar'),
                })
            } else if (data.formAvatar?.get('avatar') !== 'undefined') {
                return Request.patchWithToken(`users/me/`, {
                    email: data.email,
                    username: data.username,
                    rating: 0,
                    avatar: data.formAvatar?.get('avatar'),
                })
            } else if (data.password !== '') {
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users', id] })
            queryClient.invalidateQueries({ queryKey: ['me'] })
        },
    })
    return { Success: profileChanges.isSuccess, ...profileChanges }
}
