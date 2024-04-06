import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Request } from '@/shared/api'
import { LoginModel } from '../model'

export const useMutationLogin = () => {
    const navigate = useNavigate()
    // return (data: LoginModel) => {
    //     return Request.post<LoginModel>('users/token/', data)ы
    // }
    return useMutation({
        mutationFn: (data: LoginModel) => {
            return Request.post<LoginModel>('users/token/', data)
        },
        onSuccess: (data) => {
            console.log(data)
            localStorage.setItem('token', data?.token || '')
            navigate('/')
        },
    })
}
