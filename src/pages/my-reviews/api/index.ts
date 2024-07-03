import { useQuery, useQueryClient } from '@tanstack/react-query'
import { IReviews, IUsers } from '@/entities/review'
import { Request } from '@/shared/api'

export const useGetMyReviews = () => {
    const queryClient = useQueryClient()
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['me/reviews'],
        queryFn: async () => {
            const reviews = await Request.getWithToken<IReviews[]>('reviews/my')
            const user = queryClient.getQueryData<IUsers>(['me'])
            const myReviews = await Request.get<IReviews[]>(
                `reviews/${user?.id}`,
            )
            return { reviews, user, myReviews }
        },
    })

    return { data, isError, isLoading, error }
}
