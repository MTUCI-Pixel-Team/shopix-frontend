import { Filters } from '@/features/products/filters'
import { Price } from '@/features/products/price'
import { Search } from '@/features/products/search'
import { Sort } from '@/features/products/sort'
import { Button } from '@/shared/ui/button'
import styles from './styles.module.scss'

export const Sidebar = () => {
    const options = [
        { value: 'first', label: 'Сначала новые' },
        { value: 'last', label: 'Сначала старые' },
    ]

    return (
        <div className={styles.sidebar}>
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
        </div>
    )
}
