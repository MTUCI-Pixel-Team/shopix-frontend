import { Checkbox } from '@/shared/ui/checkbox'
import styles from './styles.module.scss'

export const Filters = () => {
    const categories = [
        'Другое',
        'Одежда и обувь',
        'Мебель',
        'Строительство и ремонт',
        'Вещи для дома',
        'Электроника',
        'Компьютеры и комплектующие',
        'Бытовая техника',
        'Аксессуары',
        'Хобби и отдых',
        'Вещи для животных',
        'Продукты питания',
        'Детские товары',
        'Красота и уход',
        'Здоровье',
        'Товары для взрослых',
    ]

    return (
        <div className={styles.filters}>
            {new Array(16).fill(0).map((_, i) => (
                <div key={i} className={styles.filter}>
                    <Checkbox id={`filter-${i}`} name={`filter-${i}`} />
                    <label htmlFor={`filter-${i}`}>{categories[i]}</label>
                </div>
            ))}
        </div>
    )
}
