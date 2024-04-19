import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Request } from '@/shared/api'

export const useGetAddress = (text: string) => {
    const { data, error, isLoading, isError, refetch } = useQuery({
        queryKey: ['address', text],
        queryFn: async () => {
            return axios.get(
                `https://suggest-maps.yandex.ru/v1/suggest?apikey=4608e0a2-e6dd-4045-9cc9-beac38186506&text=${text}&print_address=1`,
            )
        },
    })

    return { data, error, isLoading, isError, refetch }
}
