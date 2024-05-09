import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Request } from '@/shared/api'
import { paths } from '@/shared/config/router'

export const useVerify = () => {
    const navigate = useNavigate()

    const verifyMutation = useMutation({
        mutationFn: async (data: { code: string; id: string }) => {
            return Request.post(`users/verify/${data.id}/`, {
                id: data.id,
                verification_code: data.code,
            })
        },
        onSuccess: () => {
            navigate(paths.auth)
        },
    })
    return verifyMutation
}
