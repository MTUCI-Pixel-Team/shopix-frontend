import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form'
import { InputActionMeta } from 'react-select'
import { Select } from '@/shared/ui/select'

export const AddressCheck = ({ height, ...props }: { height: number }) => {
    const [input, setInput] = useState('')
    const [visibleInput, setVisibleInput] = useState('')
    const { data, error, isLoading, isError, refetch } = useQuery({
        queryKey: ['address', input],
        queryFn: async () => {
            return axios.get(
                `https://suggest-maps.yandex.ru/v1/suggest?apikey=4608e0a2-e6dd-4045-9cc9-beac38186506&text=${input}&print_address=1`,
            )
        },
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setInput(visibleInput)
            refetch()
        }, 1000)

        return () => clearTimeout(timer)
    }, [input, visibleInput, refetch])

    const options = data?.data?.results?.map((item, i) => ({
        value: i,
        label: item.address.formatted_address,
    }))

    if (isError) {
        return <div>Ошибка: {error.message}</div>
    }

    return (
        <Select
            height={height}
            maxMenuHeight={300}
            isLoading={isLoading}
            loadingMessage={() => 'Загрузка...'}
            noOptionsMessage={() => 'Нет результатов'}
            onChange={(option) => {
                console.log(option)
                setVisibleInput(option?.label || '')
            }}
            onInputChange={(value) => setVisibleInput(value)}
            isSearchable={true}
            options={options}
            {...props}
        />
    )
}
