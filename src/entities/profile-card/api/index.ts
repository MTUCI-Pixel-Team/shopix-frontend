import { useQuery } from '@tanstack/react-query'
import { Request } from '@/shared/api'
import { getToken } from '@/shared/config/storage'
import { IUsers } from '../model'

export const useGetMe = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const result = await Request.getWithToken<IUsers>('users/me')

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

export const useGetUsers = (id: number) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users', id],
        queryFn: async () => {
            const token = getToken()
            if (token) {
                const result = await Request.getWithToken<IUsers>(`users/${id}`)
                return {
                    ...result,
                    rating: parseFloat(result?.rating.toFixed(1) || '0'),
                }
            } else {
                const result = await Request.get<IUsers>(`users/${id}`)
                return {
                    ...result,
                    rating: parseFloat(result?.rating.toFixed(1) || '0'),
                }
            }
        },
    })
    return {
        data,
        isLoading,
        error,
        isError,
    }
}
