import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Request } from '@/shared/api'
// import { getToken } from '@/shared/config/local-storage'
import { useInfo } from '../model'

export const useGetMe = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            // const token = getToken()

            // if (!token) {
            //     return {
            //         data: null,
            //         isLoading: false,
            //         error: null,
            //         isError: false,
            //     }
            // }
            console.log('dfgdfgdfgdf')
            const result = await Request.getWithToken('users/me')
            console.log(result)
            return result
        },
        // throwOnError: false,
    })
    return {
        data,
        isLoading,
        error,
        isError,
    }
}
