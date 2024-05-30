import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Request } from '@/shared/api'
import { paths } from '@/shared/config/router'
import { RegisterModel, RegisterResponse } from '../model'

export const useMutationRegister = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (data: RegisterModel) => {
            return Request.post(
                'users/create/',
                data,
            ) as unknown as Promise<RegisterResponse>
        },
        onSuccess: (data: RegisterResponse) => {
            console.log(data, '-----------')
            console.log('success')
            navigate(`${paths.auth}/${paths.verify}/${data.id}`)
            return data
        },
    })
}
