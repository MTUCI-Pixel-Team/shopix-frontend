import { FC } from 'react'
import { Select } from '@/shared/ui/select'
import styles from './styles.module.scss'

interface SortProps {
    value: { value: string; label: string } | undefined
    options: { value: string; label: string }[]
    onChange: (value: { value: string; label: string } | null) => void
}

export const Sort: FC<SortProps> = ({ options, ...props }) => {
    return (
        <Select
            options={options}
            height={43}
            fontSize={16}
            className={styles.sort}
            // getOptionValue={(option) => console.log(option.value)}
            {...props}
        />
    )
}
