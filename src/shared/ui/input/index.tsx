import cn from 'classnames'
import { FC, InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
    className,
    ...props
}) => {
    return (
        <>
            <input className={cn(styles.input, className)} {...props} />
        </>
    )
}
