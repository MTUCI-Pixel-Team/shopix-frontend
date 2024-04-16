import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Request } from '@/shared/api'
// import { setRefreshToken, setToken } from '@/shared/config/local-storage'
import { setRefreshToken, setToken } from '@/shared/config/storage'
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
            if (data) {
                const { access, refresh } = data
                setToken(access || '')
                setRefreshToken(refresh || '')
                // localStorage.setItem('token', data?.token || '')
                navigate('/')
            }
        },
        onError: (error) => {
            console.log(error, '-----------')
            return error
        },
    })
}
