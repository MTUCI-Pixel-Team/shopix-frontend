import { useEffect, useState } from 'react'
import { Filters } from '@/features/products/filters'
import { Price } from '@/features/products/price'
import { Search } from '@/features/products/search'
import { Sort } from '@/features/products/sort'
import { useProducts } from '@/entities/product-card'
import { Button } from '@/shared/ui/button'
import styles from './styles.module.scss'

interface RequestInformation {
    search: string
    sort_by: string
    category: string[]
    min_price: number | null
    max_price: number | null
    page: number
}

export const Sidebar = () => {
    const minPrice = useProducts((state) => state.minPrice)
    const maxPrice = useProducts((state) => state.maxPrice)
    const [price, setPrice] = useState<number[]>([0, 0])
    const [sort, setSort] = useState<string>('')
    const [filters, setFilters] = useState<string[]>([])
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        setPrice([minPrice, maxPrice])
    }, [minPrice, maxPrice])

    console.log(sort)

    const options = [
        { value: 'created_at', label: 'Сначала старые' },
        { value: '-created_at', label: 'Сначала новые' },
        { value: '-price', label: 'Сначала дешевле' },
        { value: 'price', label: 'Сначала дороже' },
        { value: 'views', label: 'Больше просмотров' },
        { value: '-views', label: 'Меньше просмотров' },
        { value: 'title', label: 'По алфавиту (А ➡️ Я)' },
        { value: '-title', label: 'По алфавиту (Я ➡️ А)' },
    ]

    const defaultState: RequestInformation = {
        search: '',
        sort_by: '',
        category: [] as string[],
        min_price: 0,
        max_price: 1000000,
        page: 1,
    }

    const [form, setForm] = useState<RequestInformation>(defaultState)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        if (
            'filter' === name.split('-')[0] &&
            !form.category.includes(name.split('-')[1])
        ) {
            setForm({
                ...form,
                category: [...form.category, name.split('-')[1]],
            })
        } else {
            setForm({
                ...form,
                [name]: value,
            })
        }
        console.log(form)
    }
    const resetForm = () => {
        setForm(defaultState)
    }

    const GivePosts = async (requestInformation: RequestInformation) => {
        Request.get('posts/', {
            params: { ...requestInformation },
            paramsSerializer: (params: RequestInformation) =>
                qs.stringify(params, { arrayFormat: 'repeat' }),
        })
    }

    const installFilters = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const requestInformation = {
            search: '',
            sort_by: '',
            category: [] as string[],
            min_price: null,
            max_price: null,
            page: 1,
        }

        const formData = new FormData(event.currentTarget)

        Array.from(formData.entries()).map(([key, value]) => {
            if (!key.includes('filter')) {
                // Преобразуйте значение как нужно
                // @ts-expect-error - не знаю как это исправить
                requestInformation[key] = value
            } else {
                requestInformation['category'].push(key.split('-')[1])
            }
        })
        GivePosts(requestInformation)
    }

    return (
        <form className={styles.sidebar}>
            <Search
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className={styles.sort}>
                <h2>Сортировать:</h2>
                <Sort
                    onChange={(e) => {
                        console.log(e)
                        setSort(e.value)
                    }}
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
                <Button size="big" className={styles.button}>
                    СБРОСИТЬ
                </Button>
            </div>
        </form>
    )
}
