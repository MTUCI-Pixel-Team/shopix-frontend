import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Request } from '@/shared/api'
import { paths } from '@/shared/config/router'
import { RegisterModel } from '../model'

export const useMutationRegister = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (data: RegisterModel) => {
            return Request.post<RegisterModel>('users/create/', data)
        },
        onSuccess: () => {
            console.log('success')
            navigate(`${paths.auth}/${paths.login}`)
        },
    })
}
