import { useInfiniteQuery } from '@tanstack/react-query'
import { Request } from '@/shared/api'
import { getToken } from '@/shared/config/storage'

export const useGetProducts = () => {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: async ({ pageParam }) => {
            console.log(pageParam)
            const token = getToken()
            if (token) {
                return await Request.getWithToken('posts', {
                    params: {
                        page: `${pageParam}`,
                    },
                })
            } else {
                return await Request.get('posts', {
                    params: {
                        page: `${pageParam}`,
                    },
                })
            }
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.next?.split('?page=')[1]

            return nextPage
        },
    })
    return {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    }
}
