import axios from 'axios'
import { Filters } from '@/features/products/filters'
import { Price } from '@/features/products/price'
import { Search } from '@/features/products/search'
import { Sort } from '@/features/products/sort'
import { Button } from '@/shared/ui/button'
import styles from './styles.module.scss'

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

    const GivePosts = async ([
        search,
        sort_by,
        categories,
        min_price,
        max_price,
        page,
    ]: [
        string | null,
        string,
        string | null,
        number | null,
        number | null,
        number,
    ]) => {
        const params = {
            page: page,
            sort_by: sort_by,
            category: categories, // категории - это массив
            search: search,
            min_price: min_price,
            max_price: max_price,
        }

        try {
            const response = await axios.get(
                'http://147.45.40.23:8000/api/posts/',
                {
                    params,
                },
            )
        } catch (error) {
            console.error(error)
        }
    }

    const installFilters = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const requestInformation = {
            search: '',
            sort_by: '',
            categories: [],
            min_price: null,
            max_price: null,
            page: 1,
        }
        const formData = new FormData(event.currentTarget)
        Array.from(formData.entries()).map(([key, value]) => {
            if (!key.includes('filter')) {
                // Преобразуйте значение как нужно
                requestInformation[key] = value
            } else {
                requestInformation['categories'].push(key.split('-')[1])
            }
        })
        console.log(requestInformation)
        GivePosts([
            requestInformation['search'],
            requestInformation['sort_by'],
            requestInformation['categories'],
            requestInformation['min_price'],
            requestInformation['max_price'],
            requestInformation['page'],
        ])
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
