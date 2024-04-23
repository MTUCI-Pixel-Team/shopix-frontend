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

import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { Request } from '@/shared/api'

export const useGetMyProducts = (type: string) => {
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
        queryKey: ['me/posts/', type],
        queryFn: async ({ pageParam }) => {
            console.log(pageParam)
            const result = await Request.getWithToken('users/me/posts/', {
                params: {
                    page: `${pageParam}`,
                    status: type,
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

export const useUpdateProduct = () => {
    const mutation = useMutation({
        mutationFn: async (values: {
            post: { status: string; id: number; title: string }
        }) => {
            console.log(values)
            const result = await Request.putWithToken(
                `posts/${values.post.id}/`,
                values,
            )
            return result
        },
    })
    return mutation
}
