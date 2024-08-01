import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { Request } from '@/shared/api'
import { getToken } from '@/shared/config/storage'
import { IReviewResponse, IUsers } from '../model'

export const useGetUsers = (id: number) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users', id],
        queryFn: async () => {
            const token = getToken()
            if (token) {
                const result = await Request.getWithToken<IUsers>(`users/${id}`)
                return result
            } else {
                const result = await Request.get<IUsers>(`users/${id}`)
                return result
            }
        },
    })
    return {
        data,
        isLoading,
        error,
        isError,
    }
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
            const reviews = await Request.get<IReviewResponse>(
                `reviews/${id}/`,
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
