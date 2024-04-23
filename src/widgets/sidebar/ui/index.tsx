import axios from 'axios'
import { Filters } from '@/features/products/filters'
import { Price } from '@/features/products/price'
import { Search } from '@/features/products/search'
import { Sort } from '@/features/products/sort'
import { Button } from '@/shared/ui/button'
import { Request } from '@/shared/api'
import styles from './styles.module.scss'
import qs from 'qs'

interface RequestInformation {
    search: string
    sort_by: string
    category: string[]
    min_price: number | null
    max_price: number | null
    page: number
}

export const Sidebar = () => {
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
        console.log(Array.from(formData.entries()))
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
        <div className={styles.sidebar}>
            <form onSubmit={installFilters}>
                <Search />
                <div className={styles.sort}>
                    <h2>Сортировать:</h2>
                    <Sort options={options} />
                </div>
                <div className={styles.filters}>
                    <h2>Фильтры: </h2>
                    <Filters />
                </div>
                <div className={styles.price}>
                    <h2>Цена: </h2>
                    <Price />
                </div>
                <div className={styles.buttons}>
                    <Button size="big" className={styles.button}>
                        ПРИМЕНИТЬ
                    </Button>
                    <Button size="big" className={styles.button}>
                        СБРОСИТЬ
                    </Button>
                </div>
            </form>
        </div>
    )
}
