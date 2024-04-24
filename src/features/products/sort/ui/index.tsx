import { FC } from 'react'
import { Select } from '@/shared/ui/select'
import styles from './styles.module.scss'

interface SortProps {
    options: { value: string; label: string }[]
    onChange: (e: { value: string }) => void
}

export const Sort: FC<SortProps> = ({ options, ...props }) => {
    return (
        <Select
            options={options}
            height={43}
            fontSize={16}
            className={styles.sort}
            {...props}
        />
    )
}
