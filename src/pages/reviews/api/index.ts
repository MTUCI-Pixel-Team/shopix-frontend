import { useQuery } from '@tanstack/react-query'
import { IUsers } from '@/entities/profile-card'
import { Request } from '@/shared/api'

export const useGetUserById = (id: string | undefined) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            const user = await Request.get<IUsers>(`users/${id}/`)
            return user
        },
        enabled: !!id,
    })

    return { data, isLoading, isError }
}
