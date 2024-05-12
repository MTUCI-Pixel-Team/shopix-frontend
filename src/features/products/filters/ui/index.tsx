import { Checkbox } from '@/shared/ui/checkbox'
import { useGetCategories } from '../api'
import styles from './styles.module.scss'

export const Filters = ({
    filters,
    setCategoryForPrice,
    setFilters,
    ...props
}: {
    filters: string[]
    setFilters: (state: string[]) => void
    setCategoryForPrice: (state: boolean) => void
}) => {
    const { data, error, isLoading } = useGetCategories()
    console.log(data)
    return (
        <div className={styles.filters}>
            {isLoading && <p>Загрузка...</p>}
            {error && <p>Ошибка загрузки</p>}
            {data && (
                <>
                    {data.map(
                        (item: { value: number; label: string }, i: number) => (
                            <div key={i} className={styles.filter}>
                                <Checkbox
                                    onChange={() => {
                                        setFilters([
                                            ...filters,
                                            String(item.value),
                                        ])
                                        setCategoryForPrice(true)
                                    }}
                                    {...props}
                                    id={String(i)}
                                    name={`filter-${String(i + 1)}`}
                                />
                                <label
                                    htmlFor={String(i)}
                                    className={styles.filter__label}
                                >
                                    {item.label}
                                </label>
                            </div>
                        ),
                    )}
                </>
            )}
        </div>
    )
}
