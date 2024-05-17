import { FormEvent, useEffect, useRef, useState } from 'react'
import { Filters } from '@/features/products/filters'
import { Price } from '@/features/products/price'
import { Search } from '@/features/products/search'
import { Sort } from '@/features/products/sort'
import { Button } from '@/shared/ui/button'
import styles from './styles.module.scss'

export const Sidebar = ({
    setQureyParams,
    maxPrice,
    minPrice,
}: {
    setQureyParams: (obj: { sort_by: string }) => void
    maxPrice: number
    minPrice: number
}) => {
    const ref = useRef<HTMLFormElement>(null)
    const [price, setPrice] = useState<number[]>([0, 0])
    const [sort, setSort] = useState<string>('')
    const [filters, setFilters] = useState<string[]>([])
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        setPrice([minPrice, maxPrice])
    }, [minPrice, maxPrice])

    const options = [
        { value: '-created_at', label: 'Сначала новые' },
        { value: 'created_at', label: 'Сначала старые' },
        { value: '-price', label: 'Сначала дороже' },
        { value: 'price', label: 'Сначала дешевле' },
        { value: 'views', label: 'Меньше просмотров' },
        { value: '-views', label: 'Больше просмотров' },
        { value: 'title', label: 'По алфавиту (А ➡️ Я)' },
        { value: '-title', label: 'По алфавиту (Я ➡️ А)' },
    ]

    const resetForm = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        ref?.current?.reset()
        setPrice([minPrice, maxPrice])
        setSearch('')
        setSort('created_at')
        setQureyParams({ sort_by: '-created_at' })
    }

    const installFilters = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const requestInformation = {
            search: search,
            sort_by: sort,
            category: [] as string[],
            min_price: price[0] || null,
            max_price: price[1] || null,
            page: 1,
        }

        const formData = new FormData(event.currentTarget)

        Array.from(formData.entries()).map(([key, value]) => {
            console.log(key, value)
            if (!key.includes('filter')) {
                // @ts-expect-error - не знаю как это исправить
                requestInformation[key] = value
            } else {
                requestInformation['category'].push(key.split('-')[1])
            }
        })
        setQureyParams(requestInformation)
        // GivePosts(requestInformation)
    }

    return (
        <form ref={ref} className={styles.sidebar} onSubmit={installFilters}>
            <Search
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className={styles.sort}>
                <h2>Сортировать:</h2>
                <Sort
                    onChange={(e: { value: string; label: string } | null) => {
                        if (e) {
                            setSort(e.value)
                        }
                    }}
                    value={options.find((option) => option.value === sort)}
                    options={options}
                />
            </div>
            <div className={styles.filters}>
                <h2>Фильтры: </h2>
                <Filters filters={filters} setFilters={setFilters} />
            </div>
            <div className={styles.price}>
                <h2>Цена: </h2>
                <Price
                    priceFromServer={[minPrice, maxPrice]}
                    price={price}
                    setPrice={setPrice}
                />
            </div>
            <div className={styles.buttons}>
                <Button type="submit" size="big" className={styles.button}>
                    ПРИМЕНИТЬ
                </Button>
                <Button
                    type="submit"
                    size="big"
                    className={styles.button}
                    onClick={resetForm}
                >
                    СБРОСИТЬ
                </Button>
            </div>
        </form>
    )
}
