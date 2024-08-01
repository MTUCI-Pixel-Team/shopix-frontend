import { useInfiniteQuery } from '@tanstack/react-query'
import { IReviewResponse } from '@/entities/review'
import { Request } from '@/shared/api'

// export const useGetMyReviews = () => {
//     const queryClient = useQueryClient()
//     const { data, isError, isLoading, error } = useQuery({
//         queryKey: ['me/reviews'],
//         queryFn: async () => {
//             const reviews = await Request.getWithToken<IReviews[]>('reviews/my/')
//             const user = queryClient.getQueryData<IUsers>(['me'])
//             const myReviews = await Request.get<IReviews[]>(
//                 `reviews/${user?.id}`,
//             )
//             return { reviews, user, myReviews }
//         },
//     })

//     return { data, isError, isLoading, error }
// }

export const useGetMyReviews = () => {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetching,
        isFetchingNextPage,
        refetch,
        isError,
        status,
    } = useInfiniteQuery({
        queryKey: ['me/reviews'],
        queryFn: async ({ pageParam }) => {
            const reviews = await Request.getWithToken<IReviewResponse>(
                `reviews/my/`,
                {
                    params: {
                        page: pageParam,
                    },
                },
            )

            if (!reviews) {
                throw new Error('Reviews not found')
            }

            return reviews
        },
        initialPageParam: '1',
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.next?.split('page=')[1].split('&')[0]
            return nextPage ?? null
        },
    })

    return {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        isError,
        refetch,
        status,
        isLoading,
    }
}
