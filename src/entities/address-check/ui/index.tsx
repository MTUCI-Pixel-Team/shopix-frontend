import { useEffect, useState } from 'react'
import { Select } from '@/shared/ui/select'
import { useGetAddress } from '../api'
import { IAddressCheck, OptionType } from '../model'

export const AddressCheck = ({
    setAddress,
    height,
    ...props
}: {
    height: number
    setAddress: (value: string) => void
}) => {
    const [input, setInput] = useState('')
    const [visibleInput, setVisibleInput] = useState('')
    const { data, error, isLoading, isError, refetch } = useGetAddress(input)

    useEffect(() => {
        const timer = setTimeout(() => {
            setInput(visibleInput)
            refetch()
        }, 1000)

        return () => clearTimeout(timer)
    }, [input, visibleInput, refetch])

    const options = data?.data?.results?.map(
        (item: IAddressCheck, i: number) => ({
            value: i,
            label: item.address.formatted_address,
        }),
    )

    if (isError) {
        return <div>Ошибка: {error?.message}</div>
    }

    return (
        <Select
            placeholder="Введите адрес"
            height={height}
            maxMenuHeight={300}
            isLoading={isLoading}
            loadingMessage={() => 'Загрузка...'}
            noOptionsMessage={() => 'Нет результатов'}
            onChange={(option: OptionType | null) => {
                if (option) {
                    setVisibleInput(option?.label || '')
                    setAddress(option?.label || '')
                }
            }}
            onInputChange={(value) => setVisibleInput(value)}
            isSearchable={true}
            options={options}
            {...props}
        />
    )
}
