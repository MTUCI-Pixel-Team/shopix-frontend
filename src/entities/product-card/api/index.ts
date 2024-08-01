import { useInfiniteQuery } from '@tanstack/react-query'
import { Request } from '@/shared/api'
import { getToken } from '@/shared/config/storage'
import { useProducts } from '..'
import { IProductResponse } from '../model'

export const useGetProducts = (queryParams = {}) => {
    const setMinPrice = useProducts((state) => state.setMinPrice)
    const setMaxPrice = useProducts((state) => state.setMaxPrice)

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        refetch,
        status,
    } = useInfiniteQuery<IProductResponse>({
        queryKey: ['posts', queryParams],
        queryFn: async ({ pageParam }) => {
            console.log(queryParams)
            const emptyProducts = {
                count: 0,
                next: '',
                previous: '',
                results: [],
                min_price: 0,
                max_price: 0,
            }
            const token = getToken()
            const params = {
                ...queryParams,
                page: String(pageParam).split('&')[0],
            }
            if (token) {
                return (
                    (await Request.getWithToken('posts', {
                        params,
                    })) || emptyProducts
                )
            }
            return (
                (await Request.get('posts', {
                    params,
                })) || emptyProducts
            )
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            console.log(lastPage)
            const nextPage = lastPage.next?.split('page=')[1].split('&')[0]
            return nextPage
        },
        select: (data) => {
            console.log(data)

            setMinPrice(data.pages[0].min_price || 0)
            setMaxPrice(data.pages[0].max_price || 0)
            return data
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
    }
}

export const useGetUserProducts = (id: string, type: string) => {
    const {
        data,
        error,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        refetch,
        status,
    } = useInfiniteQuery<IProductResponse>({
        queryKey: ['users/posts', id, type],
        queryFn: async ({ pageParam }) => {
            const emptyProducts = {
                count: 0,
                next: '',
                previous: '',
                results: [],
                min_price: 0,
                max_price: 0,
            }
            const params = {
                id,
                page: String(pageParam).split('&')[0],
                status: type,
            }
            // console.log(params)

            return (
                (await Request.get(`users/posts/${id}`, {
                    params,
                })) || emptyProducts
            )
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.next?.split('page=')[1].split('&')[0]

            return nextPage
        },
    })
    return {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isError,
        isFetching,
        isFetchingNextPage,
        refetch,
        status,
    }
}
