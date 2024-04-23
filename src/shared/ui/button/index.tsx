import cn from 'classnames'
import { ButtonHTMLAttributes, FC } from 'react'
import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'medium' | 'big'
}

export const Button: FC<ButtonProps> = ({
    className,
    children,
    size = 'medium',
    ...props
}) => {
    return (
        <button
            className={cn(styles.button, styles[size], className)}
            {...props}
        >
            {children}
        </button>
    )
}
