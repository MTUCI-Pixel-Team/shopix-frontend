import { useQuery } from '@tanstack/react-query'
import { Request } from '@/shared/api'
import { getToken } from '@/shared/config/storage'
import { IProductOnce } from '../model'

export const useGetProduct = (id: string) => {
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['posts', id],
        queryFn: async () => {
            const token = getToken()
            if (token) {
                return Request.getWithToken<IProductOnce>(`posts/${id}`)
            }
            return Request.get<IProductOnce>(`posts/${id}`)
        },
    })

    return { data, error, isLoading, isError }
}
