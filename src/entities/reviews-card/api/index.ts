import { useQuery } from '@tanstack/react-query'
import { Request } from '@/shared/api'

export const useGetMe = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const result = await Request.getWithToken('users/me')
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
