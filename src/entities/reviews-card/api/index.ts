import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Request } from '@/shared/api'
import { useInfo } from '../model'

export const useGetMe = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const result = await Request.get('users/me', {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            })
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
