import cn from 'classnames'
import { ButtonHTMLAttributes, FC } from 'react'
import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'big'
}

export const Button: FC<ButtonProps> = ({
    className,
    children,
    size = 'small',
    ...props
}) => {
    const buttonSize = size === 'small' ? { height: 30 } : { height: 57 }
    return (
        <button
            className={cn(styles.button, className)}
            style={buttonSize}
            {...props}
        >
            {children}
        </button>
    )
}
