import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { IUsers } from '@/entities/profile-card'
import { IReviews, IReviewsResponse } from '@/entities/review'
import { Request } from '@/shared/api'

export const useGetUserById = (id: string | undefined) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            const user = await Request.get<IUsers>(`users/${id}/`)
            return user
        },
        enabled: !!id,
    })

    return { data, isLoading, isError }
}

export const useReviewsById = (id: string | undefined) => {
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
        queryKey: ['reviews', id],
        queryFn: async ({ pageParam }) => {
            const reviews = await Request.get<IReviews>(`reviews/${id}/`, {
                params: {
                    page: pageParam,
                },
            })

            if (!reviews) {
                throw new Error('Reviews not found')
            }

            return reviews
        },
        enabled: !!id,
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
