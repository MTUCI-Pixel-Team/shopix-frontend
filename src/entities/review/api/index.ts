import { useQuery } from '@tanstack/react-query'
import { Request } from '@/shared/api'
import { getToken } from '@/shared/config/storage'
import { IUsers } from '../model'

export const useGetUsers = (id: number) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users', id],
        queryFn: async () => {
            const token = getToken()
            if (token) {
                const result = await Request.getWithToken<IUsers>(`users/${id}`)
                return result
            } else {
                const result = await Request.get<IUsers>(`users/${id}`)
                return result
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
