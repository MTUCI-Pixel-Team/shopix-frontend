import { useMutation } from '@tanstack/react-query'
import { Request } from '@/shared/api'

export const useCreateReview = () => {
    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const result = await Request.postWithToken(`reviews/`, data)
            return result
        },
    })

    return mutation
}
