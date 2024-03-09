import classNames from 'classnames'
import { ButtonHTMLAttributes, FC } from 'react'
import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'medium' | 'big'
}

export const Button: FC<ButtonProps> = ({
    children,
    size = 'small',
    ...props
}) => {
    const buttonSize =
        size === 'small'
            ? { minWidth: 129, height: 30, fontSize: '12px', fontWeight: 400 }
            : size === 'medium'
            ? { minWidth: 154, height: 57 }
            : { minWidth: 237, height: 57 }
    return (
        <button
            className={classNames(styles.button)}
            style={buttonSize}
            {...props}
        >
            {children}
        </button>
    )
}
