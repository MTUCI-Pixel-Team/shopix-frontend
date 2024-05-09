import { useInfiniteQuery } from '@tanstack/react-query'
import { Request } from '@/shared/api'
import { getToken } from '@/shared/config/storage'
import { useProducts } from '..'

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
    } = useInfiniteQuery({
        queryKey: ['posts', queryParams],
        queryFn: async ({ pageParam }) => {
            const token = getToken()
            const params = {
                ...queryParams,
                page: String(pageParam).split('&')[0],
            }
            // console.log(params)
            if (token) {
                return await Request.getWithToken('posts', {
                    params,
                })
            } else {
                return await Request.get('posts', {
                    params,
                })
            }
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
<<<<<<< HEAD
            const nextPage = lastPage.next?.split('page=')[1].split('&')[0]

=======
            // http://147.45.40.23:8000/api/posts/?max_price=500000&min_price=0.16&page=2&search=&sort_by=created_at
            // const nextPage = lastPage.next?.split('?page=')[1]
            const nextPage = lastPage.next?.split('page=')[1].split('&')[0]
            console.log(lastPage, '-----------------------')
>>>>>>> d39a001 (fix)
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
