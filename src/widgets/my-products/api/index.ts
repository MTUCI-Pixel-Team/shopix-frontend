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

import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import { post } from 'node_modules/axios/index.d.cts'
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
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (values: { status: string; id: number }) => {
            console.log(values)
            const result = await Request.putWithToken(`posts/${values.id}/`, {
                post: JSON.stringify(values),
            })
            return result
        },
        onSettled: () => {
            queryClient.invalidateQueries(['me/posts/', 'active'])
            queryClient.invalidateQueries(['me/posts/', 'inactive'])
        },
    })
    return mutation
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (id: number) => {
            const result = await Request.deleteWithToken(`posts/${id}/`)
            return result
        },
        onSettled: () => {
            queryClient.invalidateQueries(['me/posts/', 'active'])
            queryClient.invalidateQueries(['me/posts/', 'inactive'])
        },
    })
    return mutation
}
