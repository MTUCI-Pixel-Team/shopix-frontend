import { useQuery } from '@tanstack/react-query'
import { Request } from '@/shared/api'

export const useGetMyProducts = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['me/products'],
        queryFn: async () => {
            const result = await Request.getWithToken('users/me/posts/')
            return result
        },
    })
    return {
        data,
        isLoading,
        error,
        isError,
    }
}
