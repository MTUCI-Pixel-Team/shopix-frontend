import { useQuery } from '@tanstack/react-query'
import { Request } from '@/shared/api'
import { getToken } from '@/shared/config/storage'
import { IUsers, useInfo } from '../model'

export const useGetMe = () => {
    const setImage = useInfo((state) => state.setImage)

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const token = getToken()
            if (!token) return null

            const result = await Request.getWithToken<IUsers>('users/me')

            if (result?.avatar) {
                setImage(result.avatar)
            }

            return {
                ...result,
                rating: parseFloat(result?.rating.toFixed(1) || '0'),
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

export const useGetUsers = (id: number) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users', id],
        queryFn: async () => {
            const result = await Request.get<IUsers>(`users/${id}`)
            return {
                ...result,
                rating: parseFloat(result?.rating.toFixed(1) || '0'),
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
