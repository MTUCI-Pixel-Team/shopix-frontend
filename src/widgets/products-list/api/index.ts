import { useInfiniteQuery } from '@tanstack/react-query'
import { Request } from '@/shared/api'

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
        queryKey: ['peoples'],
        queryFn: async ({ pageParam }) => {
            console.log(pageParam)
            const result = await Request.get('people', {
                page: `${pageParam}`,
            })
            console.log(result)
            return result
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.next?.split('?page=')[1]
            return lastPage.next ? nextPage : undefined
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
