import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Request } from '@/shared/api'
import { Categories, IAddCard } from '../model'

export const useGetCategories = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts/categories'],
        queryFn: async () => {
            const result = (await Request.get(
                'posts/categories/',
            )) as Categories[]
            return result.map((item) => ({
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

export const useMutationAddCard = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (data) => {
            console.log(data)
            const response = (await Request.postWithToken(
                'posts/',
                data,
            )) as unknown as IAddCard

            return response
        },
        onSuccess: (data: IAddCard) => {
            console.log('Карточка успешно добавлена', data)
            const id = data?.post?.id || ''
            navigate(`/product/${id}`)
        },
    })
}
