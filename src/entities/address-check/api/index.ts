import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetAddress = (text: string) => {
    const { data, error, isLoading, isError, refetch } = useQuery({
        queryKey: ['address', text],
        queryFn: async () => {
            if (!text) return Promise.resolve({ data: { results: [] } })

            const apiKey = import.meta.env.VITE_YANDEX_API_KEY
            return axios.get(
                `https://suggest-maps.yandex.ru/v1/suggest?text=${text}&highlight=0&apikey=${apiKey}&print_address=1&types=geo`,
            )
        },
        retry: 2,
        refetchOnWindowFocus: false,
    })

    return { data, error, isLoading, isError, refetch }
}
