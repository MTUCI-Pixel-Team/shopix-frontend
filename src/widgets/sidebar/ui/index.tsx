import { useEffect, useState } from 'react'
import { Filters } from '@/features/products/filters'
import { Price } from '@/features/products/price'
import { Search } from '@/features/products/search'
import { Sort } from '@/features/products/sort'
import { useProducts } from '@/entities/product-card'
import { Button } from '@/shared/ui/button'
import styles from './styles.module.scss'

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
        { value: 'first', label: 'Сначала новые' },
        { value: 'last', label: 'Сначала старые' },
    ]

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
