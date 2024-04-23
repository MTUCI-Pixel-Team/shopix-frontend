import { FC, InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox: FC<CheckboxProps> = ({ ...props }) => {
    return (
        <div className={styles.checkbox}>
            <input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                className={styles.checkbox__input}
                {...props}
            />
            <span className={styles.checkmark}></span>
        </div>
    )
}
