// import { useQuery } from '@tanstack/react-query'
// import { Request } from '@/shared/api'

// export const useGetMyProducts = () => {
//     const { data, isLoading, isError, error } = useQuery({
//         queryKey: ['me/products'],
//         queryFn: async () => {
//             const result = await Request.getWithToken('users/me/posts/')
//             return result
//         },
//     })
//     return {
//         data,
//         isLoading,
//         error,
//         isError,
//     }
// }

import { useInfiniteQuery } from '@tanstack/react-query'
import { Request } from '@/shared/api'

export const useGetMyProducts = () => {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        isError,
        refetch,
        status,
    } = useInfiniteQuery({
        queryKey: ['me/posts'],
        queryFn: async ({ pageParam }) => {
            console.log(pageParam)
            const result = await Request.getWithToken('users/me/posts/', {
                params: {
                    page: `${pageParam}`,
                },
            })
            console.log(result)
            return result
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
        refetch,
        status,
        isError,
    }
}
