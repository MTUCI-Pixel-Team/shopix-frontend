import { useInfiniteQuery } from '@tanstack/react-query'
import { Request } from '@/shared/api'
import { getToken } from '@/shared/config/storage'
import { useProducts } from '../model'

export const useGetProducts = (params = '') => {
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
    } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: async ({ pageParam }) => {
            console.log(pageParam)
            const token = getToken()
            if (token) {
                return await Request.getWithToken('posts', {
                    params: {
                        params,
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
        select: (data) => {
            setMinPrice(data.pages[0].min_price)
            setMaxPrice(data.pages[0].max_price)
            // if (data.pages[0].min_price !== minPrice) {
            //     console.log('---------', data.pages[0].min_price, minPrice)
            // }
            // if (data.pages[0].max_price !== maxPrice) {
            // }
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
