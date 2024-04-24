import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Request } from '@/shared/api'

export const useAddFavorite = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (id: number) => {
            return Request.postWithToken(`posts/favorites/${id}/`, {
                post_id: id,
            })
        },
        onSuccess: () => {
            console.log('success')
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    })

    return mutation
}

export const useRemoveFavorite = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (id: number) => {
            return Request.deleteWithToken(`posts/favorites/${id}/`)
        },
        onSuccess: () => {
            console.log('success')
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            queryClient.invalidateQueries({ queryKey: ['posts/favorites'] })
        },
    })

    return mutation
}
