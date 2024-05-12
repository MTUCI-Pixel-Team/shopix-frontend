import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { IProduct } from '@/entities/product-card'
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

export const useMutationAddCard = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (data) => {
            return Request.postWithToken('posts/', data)
        },
        onSuccess: (data) => {
            console.log('Карточка успешно добавлена')
            const id = data?.post?.id || ''
            navigate(`/product/${id}`)
        },
    })
}
