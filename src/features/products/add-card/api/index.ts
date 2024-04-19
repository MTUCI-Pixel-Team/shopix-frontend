import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Request } from '@/shared/api'
import { Categories, FormAddCard } from '../model'

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

    // const options = [
    //     { value: '1', label: 'Одежда' },
    //     { value: '2', label: 'Обувь' },
    //     { value: '3', label: 'Аксессуары' },
    //     { value: '4', label: 'Косметика' },
    //     { value: '5', label: 'Еда' },
    //     { value: '6', label: 'Техника' },
    //     { value: '7', label: 'Спорт' },
    //     { value: '8', label: 'Другое' },
    // ]

    return {
        data,
        isLoading,
        error,
        isError,
    }
}

export const useMutationAddCard = () => {
    const navigate = useNavigate()
    // return (data: LoginModel) => {
    //     return Request.post<LoginModel>('users/token/', data)ы
    // }
    return useMutation({
        mutationFn: (data) => {
            return Request.postWithToken('posts/', data)
        },
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error, '-----------')
            return error
        },
    })
}
