import { useQuery } from '@tanstack/react-query'
import { Request } from '@/shared/api'
import { Categories } from '../model'

export const useGetCategories = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts/categories'],
        queryFn: async () => {
            const result = await Request.get('posts/categories/')
            return result
        },
        select: (data) => {
            return data.map((item: Categories) => ({
                value: item.id,
                label: item.name,
            }))
        },
    })

    return {
        data,
        isLoading,
        error,
        isError,
    }
}
