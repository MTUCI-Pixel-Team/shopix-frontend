import { FC } from 'react'
import { Select } from '@/shared/ui/select'
import styles from './styles.module.scss'

interface SortProps {
    options: {
        value: string
        label: string
    }[]
}
// Этот блок отвечает за характеристику, по которой сортируют товары. Расположен на главной странице справа под словом "Сортировать"
export const Sort: FC<SortProps> = ({ options }) => {
    return (
        <Select
            options={options}
            height={43}
            fontSize={16}
            className={styles.sort}
            name="sort_by"
        />
    )
}
