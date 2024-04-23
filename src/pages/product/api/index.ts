import { useQuery } from '@tanstack/react-query'
import { Request } from '@/shared/api'
import { IProductOnce } from '../model'

export const useGetProduct = (id: string) => {
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['posts', id],
        queryFn: async () => {
            return Request.get<IProductOnce>(`posts/${id}`)
        },
    })

    return { data, error, isLoading, isError }
}
